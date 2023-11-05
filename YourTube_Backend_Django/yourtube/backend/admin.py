from django.contrib import admin
from .models import User, Video

admin.site.register(User)

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('video_id', 'title', 'channel_name', 'likes', 'views', 'video_category')