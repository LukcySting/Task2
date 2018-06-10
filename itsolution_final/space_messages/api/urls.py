from django.contrib import admin
from django.urls import path

from . import views
urlpatterns = [
    path('get_messages', views.get_messages),
    path('mark_read', views.read_message),
    path('add_payment', views.add_payment)
]