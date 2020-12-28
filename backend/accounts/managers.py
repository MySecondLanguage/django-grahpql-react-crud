from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    
    use_in_migrations = True

    def create_user(self,password=None, **kwargs):
        user = self.model(
            email=self.normalize_email(kwargs['email']),
        )
        user.set_password(password)
        user.first_name = kwargs['first_name']
        user.last_name = kwargs['last_name']
        user.save(using=self._db)
        return user

    def create_staffuser(self,password, **kwargs):
        user = self.create_user(
            password=password,
            **kwargs,
        )
        user.is_staff = True
        user.first_name = kwargs['first_name']
        user.last_name = kwargs['last_name']
        user.save(using=self._db)
        return user

    def create_superuser(self, password, **kwargs):
        user = self.create_user(
            password=password,
            **kwargs,
        )
        user.first_name = kwargs['first_name']
        user.last_name = kwargs['last_name']
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user