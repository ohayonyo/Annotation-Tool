from django.shortcuts import render, HttpResponse


# Create your views here.


def home(request):
    return render(request, "home.html")


def upload_image_page(request):
    return render(request,"upload_image_page.html")
