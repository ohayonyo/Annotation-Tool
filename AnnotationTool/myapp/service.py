from django.http import JsonResponse
from .buisness_layer import save_image_tags as save_image_tags_back
from .buisness_layer import register as register_back
from .buisness_layer import login as login_back
from .buisness_layer import get_images_of_user as get_images_of_user_business

def save_image_tags(request):
    if request.method == 'POST':
        image_file = request.FILES.get('image')
        tags_with_coordinates = request.POST.get('tagsWithCoordinates')
        username = request.POST.get('username')
        return save_image_tags_back(username, image_file, tags_with_coordinates)
    return JsonResponse({'status': 'Invalid request method.'})


def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        return register_back(username, password)
    return JsonResponse({'status': 'Invalid request method.'})


def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print('username', username)
        print('password', password)
        return login_back(username, password)
    return JsonResponse({'status': 'Invalid request method.'})


def get_images_of_user_service(request):
    if request.method == 'GET':
        username = request.GET.get('username')
        print('username='+username)
        return get_images_of_user_business(username)
    return JsonResponse({'status': 'Invalid request method.'})
