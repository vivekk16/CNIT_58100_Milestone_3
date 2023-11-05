from django.contrib import admin
from django.urls import path
from backend.views.user import CreateUser, DestroyUser, LoginUserView, RetrieveUser, UpdateUser
from backend.views.video import ListVideos, RetrieveVideo, CreateVideo


urlpatterns = [
     path('user/create', CreateUser.as_view()),
    path('user/login', LoginUserView.as_view()),
    path('user/<int:pk>', RetrieveUser.as_view()),
    path('user/update', UpdateUser.as_view()),
    path('user/delete/<int:pk>', DestroyUser.as_view()),
    path('videos', ListVideos.as_view()),
    path('video/<int:pk>', RetrieveVideo.as_view()),
    path('video/create', CreateVideo.as_view()),
]