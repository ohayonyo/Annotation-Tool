from django.urls import path
from . import views
from .service import save_image_tags

urlpatterns = [
    path("", views.home, name="home"),
    path("upload_image/", views.upload_image_page, name="upload_image_page"),
    path("save_image_tagger/", save_image_tags, name="save_image_tagger"),
]
