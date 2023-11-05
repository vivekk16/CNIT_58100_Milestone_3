from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from backend.serializer import UserLoginSerializer, UserSerializer
from backend.models import User

from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed

class CustomTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = Token.objects.select_related('user').get(key=key)
            if not token.user.is_active:
                raise AuthenticationFailed('User is inactive or has been deleted.')
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token.')
        return (token.user, token)

class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginUserView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.validated_data["email"])
                if user.password == serializer.validated_data["password"]:
                    token, created = Token.objects.get_or_create(user=user)
                    return Response({"success": True, "token": token.key})
                else:
                    return Response({"success": False, "message": "incorrect password"})
            except ObjectDoesNotExist:
                return Response({"success": False, "message": "user does not exist"})

class RetrieveUser(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response(self.get_serializer(instance).data)

class UpdateUser(APIView):
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success": True, "message": "user updated"})
            else:
                return Response({"success": False, "message": "error updating user"})
        except ObjectDoesNotExist:
            return Response({"success": False, "message": "user does not exist"})

class DestroyUser(generics.DestroyAPIView):
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def destroy(self, request, pk):
        try:
            user_to_delete = User.objects.get(id=pk)
            if pk == request.user.id:
                # Delete the associated token if it exists
                try:
                    token = Token.objects.get(user=user_to_delete)
                    token.delete()
                except Token.DoesNotExist:
                    pass

                self.perform_destroy(user_to_delete)
                return Response({"success": True, "message": "user deleted"})
            else:
                return Response({"success": False, "message": "not enough permissions"})
        except ObjectDoesNotExist:
            return Response({"success": False, "message": "user does not exist"})
