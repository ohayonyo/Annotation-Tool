import json

from django.http import JsonResponse

from .buisness_layer import save_image_tagger as save_image_tagger_back


def save_image_tagger(request):
    if request.method == 'POST':
        image_file = request.FILES.get('image')
        points_data = request.POST.get('points')
        points = json.loads(points_data)
        point1 = points['point1']
        point2 = points['point2']
        tag_name = request.POST.get('tagged')
        return save_image_tagger_back(image=image_file, point1=point1, point2=point2,tag_name=tag_name)
    return JsonResponse({'status': 'Invalid request method.'})
