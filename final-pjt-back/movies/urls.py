from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_list),
    path('genres/', views.genre_list),
    path('<int:movie_pk>/', views.movie_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('<int:movie_pk>/comments/', views.create_comment),
    path('<int:comment_pk>/comments/likes/', views.like_comment),
    path('<int:movie_pk>/likes/', views.like_movie),
    path('recommend/<int:movie_pk>/<int:movie_count>/', views.recommend_movie),
]