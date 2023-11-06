from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from backend.views.user import CustomTokenAuthentication


from backend.models import Video
from backend.serializer import VideoSerializer


class ListVideos(generics.ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class RetrieveVideo(generics.RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response(self.get_serializer(instance).data)

class CreateVideo(generics.CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
