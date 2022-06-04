from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index, name="index"),
    path('', views.index, name="index"),
    path('index/humidity', views.index_humidity, name="index/humidity"),
    path('index/pm', views.index_PM, name="index/pm"),
    path('index/co2', views.index_CO2, name="index/co2"),
    path('index/voc', views.index_VOC, name="index/voc"),
    path('index/co2e', views.index_CO2E, name="index/co2e"),
    path('index/pressure', views.index_pressure, name="index/pressure"),
    path('locations/', views.locations, name="locations"),
    path('future/', views.future, name="future"),
]
