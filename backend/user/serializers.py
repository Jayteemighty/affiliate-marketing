from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers, status
from rest_framework.authtoken.models import Token
from .util import Util
from .models import OTP

User = get_user_model()

from django.core.mail import send_mail
from django.conf import settings

from django.core.validators import validate_email
from django.core.exceptions import ValidationError as DjangoValidationError

class CreatedAccountSerializer(serializers.ModelSerializer):
    ''' Serializer to create new user '''

    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'first_name', 'last_name', 'phone_number']
        read_only_fields = ['id']        
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        '''Account creation validation function'''

        # Validate email format
        try:
            validate_email(data['email'])
        except DjangoValidationError:
            raise serializers.ValidationError({'error': 'Please enter a valid email address.'}, code=status.HTTP_400_BAD_REQUEST)

        # Validate password match
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'error': 'Your passwords do not match.'}, code=status.HTTP_400_BAD_REQUEST)

        # Check if email already exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'error': 'Email already exists.'}, code=status.HTTP_400_BAD_REQUEST)

        # Validate password strength
        try:
            validate_password(data['password'])
        except DjangoValidationError as e:
            raise serializers.ValidationError({'error': e.messages[0]}, code=status.HTTP_400_BAD_REQUEST)

        # Validate phone number (basic validation)
        if not data['phone_number'].isdigit() or len(data['phone_number']) < 10 or len(data['phone_number']) > 15:
            raise serializers.ValidationError({'error': 'Please enter a valid phone number.'}, code=status.HTTP_400_BAD_REQUEST)

        return data

    def create(self, validated_data):
        '''Account creation function'''
        
        password = validated_data.pop('password2')
        account = User.objects.create(**validated_data)
        account.set_password(password)
        account.save()

        # Create authentication token
        Token.objects.create(user=account)
        
        return account



class UserSerializer(serializers.ModelSerializer):
    '''Serializer to get and update a user's details.'''

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'phone_number']
        

class CreateAccountSerializer(serializers.ModelSerializer):
    ''' Serializer to create new user '''

    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'first_name', 'last_name', 'phone_number']
        read_only_fields = ['id']        
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        '''Account creation validation function'''

        # validate password
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'error': 'Your passwords do not match'}, code=status.HTTP_400_BAD_REQUEST)
        
        # check if email exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'error': 'Email already exists'}, code=status.HTTP_400_BAD_REQUEST)
        
        # validate password
        validate_password(data['password'])
        
        return data
    
    def create(self, validated_data):
        '''Account creation function'''
        
        password = validated_data.get('password')
        # Remove data that is not useful
        validated_data.pop('password2')

        account = User.objects.create(**validated_data)
        account.set_password(raw_password=password)
        account.save()
        
        # Create token for user although not necessary
        Token.objects.create(user=account)
        
        # TODO: Create wallet for user

        return account
    

class SendOTPSerializer(serializers.Serializer):
    '''Serializer to resend OTP verifiaction'''
    
    email = serializers.EmailField(required=True)
        
    def validate(self, data):
        if not User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'error': 'This user does not exist'}, code=status.HTTP_404_NOT_FOUND)
        
        return data
    

class VerifyAccountSerializer(serializers.Serializer):
    '''Serializer for a user to veirfy their account'''
    
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(required=True)
    
    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError({'error': 'User not found. Unknown email entered'}, code=status.HTTP_404_NOT_FOUND)

        all_otps = OTP.objects.filter(email=data['email'], otp=data['otp'], otp_type='signup')
        
        # Check if there is an instance of the OTP available
        if not all_otps.exists():
            raise serializers.ValidationError({'error': 'Invalid OTP entered'}, code=status.HTTP_400_BAD_REQUEST)
        
        # Loop through all OTP instances and break when a valid OTP is found 
        valid_otp = None
        for otp in all_otps:
            if not otp.is_expired():
                valid_otp = otp
                break
        
        if valid_otp is None:
            raise serializers.ValidationError({'error': 'OTP is expired'}, code=status.HTTP_400_BAD_REQUEST)
        
        return data
         
    
class LoginSerializer(serializers.Serializer):
    '''Serializer to log in a user.'''

    # Declare fields to use for the serializer
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    
    def validate(self, data):
        '''Authentication validation function'''

        # authenticate user with email and password
        user = authenticate(email=data['email'], password=data['password'])

        # check for existence of user
        if user is None:
            raise serializers.ValidationError({'error': 'Invalid credentials'}, code=status.HTTP_400_BAD_REQUEST)
        
        # check if user is verified
        # elif not user.is_verified:
        #     raise serializers.ValidationError({'error': 'Email is not verified'}, code=status.HTTP_400_BAD_REQUEST)
        
        elif not user.is_active:
            raise serializers.ValidationError({'error': 'This user is not active'}, code=status.HTTP_400_BAD_REQUEST)
        
        # remove fields from dictionary that you don't want to see in JSON response
        email = data.pop('email')
        data.pop('password')

        token = Token.objects.get_or_create(user=user)
        
        data['message'] = f'Welcome {email}'
        data['token'] = token[0].key

        return data

    
class UserDetailsSerializer(serializers.ModelSerializer):
    '''Serializer to get and update a user's details.'''

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number']
        read_only_fields = ['id', 'email']        
    
    def update(self, instance, validated_data):
        '''Update details function'''

        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()

        return instance
    

class ChangePasswordSerializer(serializers.Serializer):
    '''Serializer to change user password.'''

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)
    
    def update(self, instance, validated_data):
        email = validated_data.get('email')
        old_password = validated_data.get('password')
        new_password = validated_data.get('new_password')
        confirm_password = validated_data.get('confirm_password')

        user = authenticate(email=email, password=old_password)
        current_user = self.context['request'].user

        if user is None:
            raise serializers.ValidationError({'error': 'User credentials incorrect. Check your email and password and try again.'}, code=status.HTTP_400_BAD_REQUEST)
        if user.email != current_user.email:
            raise serializers.ValidationError({'error': 'User credentials incorrect. Check your email and password and try again.'}, code=status.HTTP_400_BAD_REQUEST)
        elif old_password == new_password:
            raise serializers.ValidationError({'error': 'New password cannot be the same as old password.'}, code=status.HTTP_400_BAD_REQUEST)
        elif new_password != confirm_password:
            raise serializers.ValidationError({'error': 'New password and confirm password field has to be the same.'}, code=status.HTTP_400_BAD_REQUEST)
        
        validate_password(new_password)
        instance.set_password(new_password)

        instance.save()

        return instance
    

class RequestPasswordResetSerializer(serializers.Serializer):
    '''Serializer to reset user password'''
    
    email = serializers.EmailField(required=True)
    
    def validate(self, data):
        if not User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'error': 'This email does not exist'}, code=status.HTTP_404_NOT_FOUND)
        
        return data
    

class VerifyOTPForPasswordResetSerializer(serializers.Serializer):
    '''Serializer for a user to veirfy their account'''
    
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(required=True)
    
    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError({'error': 'User not found. Unknown email entered'}, code=status.HTTP_404_NOT_FOUND)

        all_otps = OTP.objects.filter(email=data['email'], otp=data['otp'], otp_type='passwordreset')
        
        # Check if there is an instance of the OTP available
        if not all_otps.exists():
            raise serializers.ValidationError({'error': 'Invalid OTP entered'}, code=status.HTTP_400_BAD_REQUEST)
        
        # Loop through all OTP instances and break when a valid unexpired OTP is found 
        valid_otp = None
        for otp in all_otps:
            if not otp.is_expired():
                valid_otp = otp
                break
        
        if valid_otp is None:
            raise serializers.ValidationError({'error': 'OTP is expired'}, code=status.HTTP_400_BAD_REQUEST)
        
        return data
    

class PasswordResetSerializer(serializers.Serializer):
    '''Serializer to reset password'''
    
    email = serializers.EmailField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)
    
    def update(self, instance, validated_data):
        if validated_data['new_password'] != validated_data['confirm_password']:
            raise serializers.ValidationError({'error': 'New password and confirm password field has to be the same.'}, code=status.HTTP_400_BAD_REQUEST)
        
        validate_password(validated_data['new_password'])
        instance.set_password(validated_data['new_password'])

        instance.save()

        return instance

    
class ChangeEmailSerializer(serializers.Serializer):
    '''Serializer to change user email'''
    
    email = serializers.EmailField(required=True)
    
    def validate(self, data):
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'error': 'This email already exists'}, code=status.HTTP_400_BAD_REQUEST)
        
        return data
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
            
        instance.save()
        return instance
