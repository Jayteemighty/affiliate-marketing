import os, random
from dotenv import load_dotenv
from pathlib import Path

from django.shortcuts import redirect, render
from django.contrib.auth import get_user_model
from django.conf import settings

import requests
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser
from rest_framework.authtoken.models import Token


from . import serializers
from .models import OTP
from .util import Util

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(os.path.join(BASE_DIR, ".env"))

User = get_user_model()


def send_verification_email(email):
    '''Function to send verification email'''
    
    user = User.objects.get(email=email)
    
    otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    OTP.objects.create(email=user.email, otp=otp, otp_type='signup')
    
    subject = 'Welcome! Verify your email address'
    body = f'Hi, {user.first_name}.\n\nThanks for signing up on Vendorhive360.\nThis is your OTP to verify your account:\n{otp}.\n\nThe OTP expires after 10 minutes.\n\nIf you did not request for this OTP, kindly ignore.\nThank you.'
    
    Util.send_email(user.email, subject, body)
        

def send_password_reset_email(email):
    '''Function to send password reset email'''
    
    user = User.objects.get(email=email)
    
    otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    OTP.objects.create(email=user.email, otp=otp, otp_type='passwordreset')
    
    subject = 'Password reset'
    body = f'Hi, {user.first_name}.\n\nThanks for choosing Vendorhive360.\nThis is your OTP to reset your password:\n{otp}\n\nThe OTP expires after 10 minutes..\n\nIf you did not request for this OTP, kindly ignore.\nThank you.'
    
    Util.send_email(user.email, subject, body)



# --------------------------------------------------------------------------
# --------------------------------------------------------------------------
    
class RegisterView(generics.GenericAPIView):
    '''View to register users'''

    serializer_class = serializers.CreateAccountSerializer
    parser_classes = [MultiPartParser]
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        try:
            send_verification_email(email=serializer.data['email'])
            
        except Exception as e:
            return Response({
                'exception': f'{e}',
                'error': 'An error occured. Try again later',
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
 

class VerifyAccountView(generics.GenericAPIView):
    '''View to verify account'''
    
    authentication_classes = []
    permission_classes = []
    serializer_class = serializers.VerifyAccountSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = User.objects.get(email=serializer.data['email'])
        
        user.is_verified = True
        user.save()
        
        return Response({'message': 'Account verified successfully'}, status=status.HTTP_200_OK)
            

class ResendVerificationEmailView(generics.GenericAPIView):
    '''View to resend verification email'''
    
    serializer_class = serializers.SendOTPSerializer
    permission_classes = []
    authentication_classes = []
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            user = User.objects.get(email=serializer.data['email'])
            if user.is_verified:
                return Response({'error': 'You have been verified already'}, status=status.HTTP_400_BAD_REQUEST)
            
            send_verification_email(email=serializer.data['email'])
            
        except Exception as e:
            return Response({
                'exception': f'{e}',
                'error': 'An error occured. Try again later',
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({
            'message': f"Verification email sent successfully. Check {serializer.data['email']} for an OTP"},
            status=status.HTTP_201_CREATED
        )
    

class LoginView(generics.GenericAPIView):
    '''View to login users'''
    
    serializer_class = serializers.LoginSerializer
    permission_classes = []
    authentication_classes = []
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
        

class UserDetailsView(generics.RetrieveUpdateAPIView):
    '''View to get, and update user account'''
    
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserDetailsSerializer
    
    def get_object(self):
        return self.request.user
    

class ChangeEmailView(generics.UpdateAPIView):
    ''' View to change user email address'''
    
    serializer_class = serializers.ChangeEmailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            super().update(request, *args, **kwargs)
            # send email verification to new email
            send_verification_email(email=serializer.data['email'])
            
            # Get user details
            user = User.objects.get(id=self.request.user.id)
                        
            # Make user unverifed because of change in email
            user.is_verified = False
            user.save()            
            
        except Exception as e:
            return Response({
                'exception': f'{e}',
                'error': 'An error occured. Try again later',
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({
            'message': f"Email changed successfully. Check {serializer.data['email']} for a new email verification link"},
            status=status.HTTP_201_CREATED
        )


class ChangePasswordView(generics.UpdateAPIView):
    '''View to change user password'''

    serializer_class = serializers.ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        super().update(request, *args, **kwargs)
        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
    

class RequestPasswordResetView(generics.GenericAPIView):
    '''View for a user to request for a password reset'''
    
    permission_classes = []
    authentication_classes = []
    serializer_class = serializers.SendOTPSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Send password reset email that should send an OTP to allow resetting the password
        send_password_reset_email(serializer.data['email'])
        
        return Response({'message': f"Check {serializer.data['email']} for a password reset link"}, status=status.HTTP_200_OK)


class VerifyPasswordResetView(generics.GenericAPIView):
    '''View for a user to verify password reset OTP'''
    
    permission_classes = []
    authentication_classes = []
    serializer_class = serializers.VerifyOTPForPasswordResetSerializer   
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        return Response({'message': 'Proceed to change your password'}, status=status.HTTP_200_OK)
     
     
# TODO: Fix bug with this view
class PasswordResetView(generics.UpdateAPIView):
    '''View for a user to request for a password reset'''
    
    permission_classes = []
    authentication_classes = []
    serializer_class = serializers.PasswordResetSerializer
    
    def get_queryset(self):
        serializer = self.serializer_class(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        
        return User.objects.get(email=serializer.data['email'])
    
    def update(self, request, *args, **kwargs):
        super().update(request, *args, **kwargs)
        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
    

class LogoutView(APIView):
    ''' View to logout users'''
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # get current user
        current_user = request.user

        # get token based on current user
        current_user_token = Token.objects.get(user=current_user)
        # delete token
        current_user_token.delete()
        
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    

class DeleteAccountView(APIView):
    '''View to delete a user's sccount. This will just make the user's account inactive.'''
    
    permission_classes = [IsAuthenticated]
    
    def delete(self, request):
        user = request.user
        user.is_active = False
        
        user.save()
        return Response({'message': 'Account deleted successfully'}, status=status.HTTP_200_OK)
