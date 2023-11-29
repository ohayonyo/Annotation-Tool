from django.urls import path
from . import views
from .service import save_image_tags
from .service import register
from .service import login
from .service import get_images_of_user_service, get_image_tags_service

urlpatterns = [
    path("", views.home, name="home"),
    # path("upload_image/", views.upload_image_page, name="upload_image_page"),
    path("login/", views.login_page, name="login_page"),
    path("register/", views.register_page, name="register_page"),
    path("save_image_tagger/", save_image_tags, name="save_image_tagger"),
    path("register_user/", register, name="register_user"),
    path("login_user/", login, name="login_user"),
    path("<str:username>/home/", views.user_home, name="user_home"),
    path("<str:username>/upload_image/", views.upload_image_page, name="upload_image_page"),
    path("<str:username>/my_tags/", views.user_tags_page, name="user_tags_page"),
    path("get_images_of_user_service/", get_images_of_user_service, name="get_images_of_user_service"),
    path("get_image_tags_service/", get_image_tags_service, name="get_image_tags_service"),

]
