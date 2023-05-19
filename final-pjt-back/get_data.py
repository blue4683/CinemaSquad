import requests
import json

def fetch_data(page):
    api_key = '616fdab7e7973b6f3cb88fe4b99a8059'
    url = f'https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=ko-KR&page={page}'

    response = requests.get(url)
    data = response.json()
    newdata = []
    for d in data['results']:
        if not d['poster_path']:
            continue
        d.pop('backdrop_path')
        onedata = {}
        onedata['model'] = "movies.movie"
        d['movie_id'] = d.pop('id')
        onedata['fields'] = d
        newdata.append(onedata)
    return newdata

def fetch_all_data(num_pages):
    all_data = []  # 모든 데이터를 저장할 리스트

    for page in range(1, num_pages + 1):
        data = fetch_data(page)
        all_data.extend(data)

    return all_data

def save_data_to_json(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False)

num_pages = 100
file_path = 'movies.json'

# 모든 페이지의 데이터를 가져와서 리스트에 저장
all_data = fetch_all_data(num_pages)

# 리스트를 JSON 파일로 저장
save_data_to_json(all_data, file_path)