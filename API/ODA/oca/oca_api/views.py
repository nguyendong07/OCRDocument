# Create your views here.

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import OCR
from .serializer import ExtractImage
from .main_module import Main


class OCRView(APIView):
    @staticmethod
    def get(request):
        image = OCR.objects.all()
        serializer = ExtractImage(data=image, many=True)
        if serializer.is_valid():
            print('serializer.data')
        print(serializer.data)
        return Response({'message': 'ok', 'data': serializer.data}, status=status.HTTP_200_OK)

    @staticmethod
    def post(request):
        path = request.FILES.get('src')
        res = Main(path)
        return Response(res, status=status.HTTP_200_OK)
