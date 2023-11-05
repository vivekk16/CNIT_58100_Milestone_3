from django.db import models
from django.contrib.auth.models import AbstractUser
from backend.manager import UserManager

class User(AbstractUser):
    email = models.EmailField(unique=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

class Video(models.Model):
    video_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    channel_name = models.CharField(max_length=100)
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    description = models.TextField()
    comments = models.JSONField(default=list, null=True,blank=True )
    video_category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    link = models.URLField(max_length=200, null=True, blank=True)
