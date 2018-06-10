from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from api.models import Messages
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from api.models import Payment
import re

def get_messages(request):
    #return HttpResponse(request.GET['last_id']);
    msg = Messages.objects.filter(id__gt = int(request.GET['last_id'])).values()  # or simply .values() to get all fields
    msg_list = list(msg)  # important: convert the QuerySet to a list object
    return JsonResponse(msg_list, safe=False)
    
def read_message(request):
    return HttpResponse (Messages.objects.filter(id=int(request.GET['id'])).update(readed=True))
    
def add_payment(request):
    payment = Payment(
        
        date = request.GET['date'],
        pay_out = request.GET['pay_out'],
        pay_in = request.GET['pay_in'],
        );
    payment.save();    
    return HttpResponse("OK");
    
    
# Create your views here.
