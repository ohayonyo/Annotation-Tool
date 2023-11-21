from django.http import JsonResponse

from .data_access_layer import create_db
from .data_access_layer import save_image_tagger as save_image_tagger_db

create_db()


def save_image_tagger(image, point1, point2):
    x1_coordinate = point1['x']
    y1_coordinate = point1['y']
    x2_coordinate = point2['x']
    y2_coordinate = point2['y']

    print("image:")
    print(image)
    print("(" + str(x1_coordinate) + "," + str(y1_coordinate) + ')')
    print("(" + str(x2_coordinate) + "," + str(y2_coordinate) + ')')
    save_image_tagger_db(image, x1_coordinate, y1_coordinate, x2_coordinate, y2_coordinate)
    return JsonResponse({'status': 'Data received and processed successfully.'})
