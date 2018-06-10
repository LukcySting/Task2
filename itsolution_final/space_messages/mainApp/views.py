from django.shortcuts import render

def main(request):
    return render(request, 'mainApp/wrapper.html')
# Create your views here.
