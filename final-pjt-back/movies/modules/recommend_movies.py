import pandas as pd
import numpy as np
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_genres(arr):
    if not arr: return ''
    new_arr = []
    for id in arr:
        for genre in genres:
            if genre['pk']==id:
                new_arr.append(genre['fields']['name'])
                break
    return ' '.join(new_arr)

def weighted_vote_average(record):
    v = record['vote_count']
    R = record['vote_average']

    return ((v/(v+m)) * R) + ((m / (v + m)) * C)

def find_sim_movie(df, sorted_ind, title_name, top_n=10):
    title_movie = df[df['title'] == title_name]
    title_index = title_movie.index.values

    similar_indexes = sorted_ind[title_index, : (top_n * 2)]
    similar_indexes = similar_indexes.reshape(-1)

    similar_indexes = similar_indexes[similar_indexes != title_index]

    return df.iloc[similar_indexes].sort_values('weighted_vote', ascending=False)[:top_n]

JSON_PATH = 'final-pjt-back/movies/fixtures'
with open(JSON_PATH+'/genres.json', 'rt', encoding = 'UTF8') as f:
    genres = json.load(f)

movies = pd.read_json(JSON_PATH + '/new_movies.json')
movies_df = movies[['movie_id', 'title', 'genre_ids', 'vote_average', 'vote_count', 'popularity', 'overview']]
movies_df['genres'] = movies_df['genre_ids'].apply(get_genres)

count_vect = CountVectorizer(min_df=0, ngram_range=(1, 2))
genre_mat = count_vect.fit_transform(movies_df['genres'])
genre_sim = cosine_similarity(genre_mat, genre_mat)
genre_sim_sorted_ind = genre_sim.argsort()[:, ::-1]

C = movies_df['vote_average'].mean()
m = movies_df['vote_count'].quantile(0.6)

movies_df['weighted_vote'] = movies_df.apply(weighted_vote_average, axis=1)

similar_movies = find_sim_movie(movies_df, genre_sim_sorted_ind, '슈퍼 마리오 브라더스', 10)

def get_recommend_movies(id, df=movies_df, index=genre_sim_sorted_ind, count=10):
    title = df['id'==id]['title']
    return find_sim_movie(df, index, title, count)