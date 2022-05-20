from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index, name="index"),
    path('', views.index, name="index"),
    path('index/humidity', views.index_humidity, name="index/humidity"),
    path('locations/', views.locations, name="locations"),
    path('future/', views.future, name="future"),
]
