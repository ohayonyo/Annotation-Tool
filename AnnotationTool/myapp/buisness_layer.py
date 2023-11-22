from django.http import JsonResponse

from .data_access_layer import create_db
from .data_access_layer import save_image as save_image_db
from .data_access_layer import save_image_tag as save_image_tag_db

import json

create_db()


def save_image_tags(image_file, tags_with_coordinates):
    image_index_row_db = save_image_db(image_file)
    if image_index_row_db is None:
        return JsonResponse({'status': "couldn't save the image."})
    tags_with_coordinates_value = json.loads(tags_with_coordinates)

    for i in range(len(tags_with_coordinates_value)):
        tag_with_coordinates = tags_with_coordinates_value[i]
        list_element_id = i + 1
        save_image_tag_db(tag_with_coordinates, image_index_row_db, list_element_id)
    return JsonResponse({'status': 'Data received and processed successfully.'})
