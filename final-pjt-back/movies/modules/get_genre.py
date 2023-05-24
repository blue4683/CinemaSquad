import requests
import json

def fetch_data():
    api_key = '616fdab7e7973b6f3cb88fe4b99a8059'
    url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=en'

    response = requests.get(url)
    data = response.json()

    return data


def save_data_to_json(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False)

file_path = 'genres.json'

# 모든 페이지의 데이터를 가져와서 리스트에 저장
all_data = fetch_data()

# 리스트를 JSON 파일로 저장
save_data_to_json(all_data, file_path)