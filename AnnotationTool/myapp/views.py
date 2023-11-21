from django.http import JsonResponse
from django.shortcuts import render, HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

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


def save_image_tagger(request):
    if request.method == 'POST':
        # image_file = request.FILES.get('image')
        points_data = request.POST.get('points')
        points = json.loads(points_data)

        x1_coordinate = points['point1']['x']
        y1_coordinate = points['point1']['y']
        x2_coordinate = points['point2']['x']
        y2_coordinate = points['point2']['y']

        # if image_file:
        #     with open(f'media/{image_file.name}', 'wb') as destination:
        #         for chunk in image_file.chunks():
        #             destination.write(chunk)
        print("("+str(x1_coordinate)+","+str(y1_coordinate)+')')
        print("("+str(x2_coordinate)+","+str(y2_coordinate)+')')
        return JsonResponse({'status': 'Data received and processed successfully.'})

    return JsonResponse({'status': 'Invalid request method.'})
