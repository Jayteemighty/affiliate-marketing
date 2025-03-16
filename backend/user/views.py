import os, random
from dotenv import load_dotenv
from pathlib import Path
from django.shortcuts import redirect, render
from django.contrib.auth import get_user_model
from django.conf import settings
# import requests
import datetime
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
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
    
    otp = ''.join([str(random.randint(0, 9)) for _ in range(4)])
    OTP.objects.create(email=user.email, otp=otp, otp_type='signup')
    
    subject = 'Welcome! Verify your email address'
    body = f'Hi, {user.first_name}.\n\nThanks for signing up on Profit Plus.\nThis is your OTP to verify your account:\n{otp}.\n\nThe OTP expires after 10 minutes.\n\nIf you did not request for this OTP, kindly ignore.\nThank you.'
    
    Util.send_email(user.email, subject, body, is_html=False)
    

def send_password_reset_email(email):
    '''Function to send password reset email'''
    
    user = User.objects.get(email=email)
    
    otp = ''.join([str(random.randint(0, 9)) for _ in range(4)])
    OTP.objects.create(email=user.email, otp=otp, otp_type='passwordreset')
    
    subject = 'Password reset'
    body = f'Hi, {user.first_name}.\n\nThanks for choosing Profit Plus.\nThis is your OTP to reset your password:\n{otp}\n\nThe OTP expires after 10 minutes..\n\nIf you did not request for this OTP, kindly ignore.\nThank you.'
    
    Util.send_email(user.email, subject, body, is_html=False)

def send_welcome_email(email):
        '''Send a welcome email after account creation'''
        
        user = User.objects.get(email=email)
        
        subject = "Welcome to PROFIT PLUS!"
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to PROFIT PLUS</title>
          <style>
            body {{
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }}
            .container {{
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }}
            h1 {{
              color: #333333;
            }}
            p {{
              color: #555555;
              line-height: 1.6;
            }}
            .cta-button {{
              display: inline-block;
              padding: 10px 20px;
              background-color: #0066cc;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin: 20px 0;
            }}
            .cta-button:hover {{
              background-color: #004c99;
            }}
            .footer {{
              font-size: 0.9em;
              color: #888888;
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #eeeeee;
            }}
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to PROFIT PLUS!</h1>
            <p>Hi {user.first_name},</p>
            <p>We’re thrilled to have you join us! As a new affiliate with <a href="https://www.theprofitplus.com.ng/">Profit Plus</a>, you’re now part of a community dedicated to success and growth. We're here to support you in maximizing your earnings and achieving your goals.</p>
            <p>Start exploring our platform and discover the tools and resources available to help you get the most out of your affiliate journey.</p>
            <a href="https://www.theprofitplus.com.ng/" class="cta-button">Get Started Now</a>
            <p>If you have any questions or need assistance, our support team is just an email away. We look forward to working with you!</p>
            <p>Welcome aboard, and here’s to your success!</p>
            <p>Best regards,<br>The Profit Plus Team</p>
            <div class="footer">
              © {datetime.datetime.now().year} Profit Plus. All rights reserved.<br>
              <a href="https://www.theprofitplus.com.ng/" style="color: #0066cc;">Privacy Policy</a> | <a href="https://www.theprofitplus.com.ng/" style="color: #0066cc;">Terms of Service</a>
            </div>
          </div>
        </body>
        </html>
        """
        
        Util.send_email(user.email, subject, html_content, is_html=True)



# --------------------------------------------------------------------------
# --------------------------------------------------------------------------

class RegisteredView(generics.GenericAPIView):
    '''View to register users'''

    serializer_class = serializers.CreatedAccountSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        # Send welcome email
        try:
            send_welcome_email(email=serializer.data['email'])
            
        except Exception as e:
            return Response({
                'exception': f'{e}',
                'error': 'could not send emailAn error occured. Try again later',
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Account created successfully. Check your email for a welcome message.'}, status=status.HTTP_201_CREATED)
    

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
            # user.is_verified = False
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
     
     
class PasswordResetView(generics.UpdateAPIView):
    '''View for a user to request a password reset'''

    permission_classes = []
    authentication_classes = []
    serializer_class = serializers.PasswordResetSerializer

    def get_object(self):
        email = self.request.data.get('email')
        if not email:
            raise ValidationError({'error': 'Email field is required.'}, code=status.HTTP_400_BAD_REQUEST)
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise ValidationError({'error': 'User with this email does not exist.'}, code=status.HTTP_404_NOT_FOUND)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
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
