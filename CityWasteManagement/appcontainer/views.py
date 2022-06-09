import datetime
import re
import urllib,json
from django.shortcuts import render
import folium
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import seaborn as sn
import pandas as pd

#url='http://localhost:3000/api/sensor/628763310955ba3d21e943fb/data'
url='https://139-162-139-209.ip.linodeusercontent.com/api/sensor/629e0b52a9f7583eb8f99f18/data'
res=urllib.request.urlopen(url)
data=json.loads(res.read())

giventimeValues=[]
for readings in data["readings"]:
    split = readings["createdAt"].split(".")
    removeT = [item.replace('T', ' ') for item in split]
    formatDate = re.sub(r'(\d{4})-(\d{1,2})-(\d{1,2})', '\\3-\\2-\\1', str(removeT[0]))
    giventimeValues.append(formatDate[0:16])

def index(request):

    tempValues=[]
    for readings in data["readings"]:
            tempValues.append(readings["sensors"]["tempSensor"])
    
    return render(request, 'index.html', {'labels': giventimeValues, 'chartdata': tempValues})

def index_humidity(request):

    humidityValues=[]
    for readings in data["readings"]:
        humidityValues.append(readings["sensors"]["humiSensor"])

    return render(request, 'index-humidity.html', {'labels': giventimeValues, 'chartdata': humidityValues})

def index_PM(request):

    pmValues=[]
    for readings in data["readings"]:
        pmValues.append(readings["sensors"]["dustSensor"])

    return render(request, 'index-PM.html', {'labels': giventimeValues, 'chartdata': pmValues})

def index_CO2(request):

    co2Values=[]
    for readings in data["readings"]:
        co2Values.append(readings["sensors"]["eCO2Sensor"])

    return render(request, 'index-CO2.html', {'labels': giventimeValues, 'chartdata': co2Values})

def index_VOC(request):

    vocValues=[]
    for readings in data["readings"]:
        vocValues.append(readings["sensors"]["TVOCSensor"])

    return render(request, 'index-VOC.html', {'labels': giventimeValues, 'chartdata': vocValues})

def index_CO2E(request):

    co2eValues=[]
    for readings in data["readings"]:
        co2eValues.append(readings["sensors"]["CO2eqSensor"])

    return render(request, 'index-CO2E.html', {'labels': giventimeValues, 'chartdata': co2eValues})

def index_pressure(request):

    pressureValues=[]
    for readings in data["readings"]:
        pressureValues.append(readings["sensors"]["pressureSensor"])

    return render(request, 'index-pressure.html', {'labels': giventimeValues, 'chartdata': pressureValues})

def locations(request):
    
    #get API data for sensor info
    #url='http://localhost:3000/api/sensor/map/data'
    url = 'https://139-162-139-209.ip.linodeusercontent.com/api/sensor/map/data'
    res=urllib.request.urlopen(url)
    data=json.loads(res.read())

    figure = folium.Figure(width=1200, height=550)
    map = folium.Map(location= [52.09061, 5.12143], zoom_start=7).add_to(figure)

    for sensor in data:
        for sensor in data:
            for data in sensor["sensors"]:
                trash = data["trash"]
                temperature = (data["sensors"]["tempSensor"])
                humidity = (data["sensors"]["humiSensor"])
                dust = (data["sensors"]["dustSensor"])
                eco2 = (data["sensors"]["eCO2Sensor"])
                tvoc = (data["sensors"]["TVOCSensor"])
                co2eq = (data["sensors"]["CO2eqSensor"])
                pressure = (data["sensors"]["pressureSensor"])
                if trash == False:
                    trashValue = "Nee"
                else:
                    trashValue = "Ja"
                folium.Marker([sensor["location"]["lat"], sensor["location"]["lon"]], tooltip=sensor["location"]["locationName"], popup="Afval: " + trashValue + " <br> Temperatuur: " + str(temperature) + "°C <br> Luchtvochtigheid: " + str(humidity) + "% <br> Fijnstof: " + str(dust) + " PM <br> CO2: " + str(eco2) + "<br> TVOC: " + str(tvoc) + "<br> CO2-Equivalent: " + str(co2eq) + " <br> Druk: " + str(pressure) + " hPa").add_to(map)

        #create map
        #figure = folium.Figure(width=1200, height=550)
        #map = folium.Map(location= [52.3507849, 5.2647016], zoom_start=10).add_to(figure)
        #folium.Marker([52.3717774, 5.2200557], tooltip="Stadhuisplein Almere", popup="Afval: " + trashValue + " <br> Temperatuur: " + str(temperature) + "°C <br> Luchtvochtigheid: " + 
        #str(humidity) + "% <br> Fijnstof: " + str(dust) + " PM <br> CO2: " + str(eco2) + "<br> TVOC: " + str(tvoc) + "<br> CO2-Equivalent: " + str(co2eq) + " <br> Druk: " + str(pressure) + " hPa").add_to(map)
        
        #html representation of map
        map = map._repr_html_()
        context={
            'm': map,
        }
        return render(request, 'locations.html', context)

#futureprediction page
def future(request):
    
    date = datetime.datetime.now().date()
    date += datetime.timedelta(days=1)
    dateConvert = re.sub(r'(\d{4})-(\d{1,2})-(\d{1,2})', '\\3-\\2-\\1', str(date))

    #algorithm for predicting future waste

    df = pd.read_excel('appcontainer/algorithmData/test_data.xlsx')
    #print(df)

    data = pd.DataFrame(df,columns= ['tijdstip', 'label'])

    X = data[['tijdstip']]
    y = data['label']

    X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.25,random_state=0)

    logistic_regression= LogisticRegression()
    logistic_regression.fit(X_train,y_train)
    y_pred=logistic_regression.predict(X_test)

    confusion_matrix = pd.crosstab(y_test, y_pred, rownames=['Actual'], colnames=['Predicted'])
    sn.heatmap(confusion_matrix, annot=True)

    #prediction
    new_candidates = {'tijdstip': [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
    timevalues = ["9u", "10u", "11u", "12u", "13u", "14u", "15u", "16u", "17u", "18u"]

    data2 = pd.DataFrame(new_candidates,columns= ['tijdstip'])
    y_pred=logistic_regression.predict(data2)

    print(y_pred)

    return render(request, 'futureprediction.html', {'chartdata': list(y_pred), 'timevalues': timevalues, 'date': dateConvert})