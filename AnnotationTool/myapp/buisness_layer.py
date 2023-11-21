from django.http import JsonResponse


def save_image_tagger(point1, point2, image):
    x1_coordinate = point1['x']
    y1_coordinate = point1['y']
    x2_coordinate = point2['x']
    y2_coordinate = point2['y']

    print("image:")
    print(image)
    print("(" + str(x1_coordinate) + "," + str(y1_coordinate) + ')')
    print("(" + str(x2_coordinate) + "," + str(y2_coordinate) + ')')
    return JsonResponse({'status': 'Data received and processed successfully.'})

