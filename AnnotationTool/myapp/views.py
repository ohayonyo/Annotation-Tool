from django.http import JsonResponse
from django.shortcuts import render, HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view


def home(request):
    return render(request, "home.html")


def upload_image_page(request, username):
    return render(request, "upload_image_page.html")


def login_page(request):
    return render(request, "login_page.html")


def register_page(request):
    return render(request, "register_page.html")


def user_home(request, username):
    return render(request, "user_menu.html")


def user_tags_page(request, username):
    return render(request, "user_tags.html")
