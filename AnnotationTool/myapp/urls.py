from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("upload_image/", views.upload_image_page, name="upload_image_page"),
    path("test/", views.get_data, name="test")
]
