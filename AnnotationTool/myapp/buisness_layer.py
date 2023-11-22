from django.http import JsonResponse

from .data_access_layer import create_db
from .data_access_layer import save_image as save_image_db
from .data_access_layer import save_image_tag as save_image_tag_db
from .data_access_layer import is_username_exists as is_username_exists_db
from .data_access_layer import save_new_user as save_new_user_db
from .data_access_layer import login as login_db
import json
from passlib.hash import bcrypt
import bcrypt

create_db()


def save_image_tags(username, image_file, tags_with_coordinates):
    image_index_row_db = save_image_db(username, image_file)
    if image_index_row_db is None:
        return JsonResponse({'status': "couldn't save the image."})
    tags_with_coordinates_value = json.loads(tags_with_coordinates)

    for i in range(len(tags_with_coordinates_value)):
        tag_with_coordinates = tags_with_coordinates_value[i]
        list_element_id = i + 1
        save_image_tag_db(tag_with_coordinates, image_index_row_db, list_element_id)
    return JsonResponse({'status': 'Data received and processed successfully.'})


def register(username, password):
    if is_username_exists_db(username):
        return JsonResponse({'status': 'Error, username already exists'})
    # hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    has_been_saved = save_new_user_db(username, password)
    if has_been_saved:
        return JsonResponse({'status': 'User registered successfully'})
    return JsonResponse({'status': 'An error occurred in the registration process'})


def login(username, password):
    # hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    is_logged_in = login_db(username, password)
    if is_logged_in:
        return JsonResponse({'status': 'User logged in successfully'})
    return JsonResponse({'status': 'Wrong username or password'})
