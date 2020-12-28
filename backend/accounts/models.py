from uuid import uuid4

from django.db import models

from accounts.managers import UserManager

from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser

class User(AbstractBaseUser, PermissionsMixin):
    alias = models.UUIDField(
        primary_key=True,
        default=uuid4,
        editable=False
    )
    email = models.EmailField(unique=True)
    phone = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )
    avatar = models.ImageField(null=True, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)           
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']