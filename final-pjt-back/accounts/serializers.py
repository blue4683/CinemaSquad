from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import Movie
# from .models import Comment
from movies.serializers.movie import MovieSerializer
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class MovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movie
            fields = '__all__'

    like_movies = MovieSerializer(many=True)

    class Meta:
        model = User
        fields = ('id','username','email', 'followings', 'followers', 'like_movies')