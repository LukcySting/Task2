from django.db import models
from datetime import datetime

class Messages(models.Model):
    date = models.DateTimeField()
    text = models.TextField()
    readed = models.BooleanField()
    
    def __str__(self):
        return self.text
        
class Payment(models.Model):
    date = models.DateField()
    pay_out = models.IntegerField()
    pay_in = models.IntegerField()
    def __str__(self):
        return str(self.id)+' '+ str(self.pay_out)+' '+ str(self.pay_in);

# Create your models here.
