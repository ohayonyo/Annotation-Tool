from django.shortcuts import render, HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.


def home(request):
    return render(request, "home.html")


def upload_image_page(request):
    print(request)
    return render(request, "upload_image_page.html")


@api_view(['GET'])
def get_data(request):
    person = {'name': 'Yoad', 'age': 22, }
    return Response(person)
