from django.http import JsonResponse
from .buisness_layer import save_image_tags as save_image_tags_back


def save_image_tags(request):
    if request.method == 'POST':
        image_file = request.FILES.get('image')
        tags_with_coordinates = request.POST.get('tagsWithCoordinates')
        return save_image_tags_back(image_file, tags_with_coordinates)
    return JsonResponse({'status': 'Invalid request method.'})
