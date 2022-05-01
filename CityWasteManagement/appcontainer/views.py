from django.shortcuts import render
import folium

def index(request):
    #create map
    figure = folium.Figure(width=1000, height=500)
    map = folium.Map(location= [52.3507849, 5.2647016], zoom_start=10).add_to(figure)
    folium.Marker([52.374078, 5.220690], tooltip="Status tonen", popup="Afval aanwezig: Ja").add_to(map)
    folium.Marker([52.371730, 5.220046], tooltip="Status tonen", popup="Afval aanwezig: Nee").add_to(map)
    #html representation of map
    map = map._repr_html_()
    context={
        'm': map,
    }
    return render(request, 'index.html', context)

