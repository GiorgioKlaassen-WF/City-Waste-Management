import datetime
import urllib,json
from django.shortcuts import render
import folium
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import metrics
import seaborn as sn
import pandas as pd

def index(request):

    url='http://localhost:3000/api/sensor/map/data'
    res=urllib.request.urlopen(url)
    data=json.loads(res.read())

    id=[]
    sensorName=[]
    for sensor in data:
        for data in sensor["sensors"]:
            print(data["sensors"]["tempSensor"])

    return render(request, 'index.html', {'labels': sensorName, 'chartdata': id})

def index_humidity(request):

    url='https://data.covid19india.org/data.json'
    res=urllib.request.urlopen(url)
    data=json.loads(res.read())

    labels=[]
    chartdata=[]
    for state in data['statewise']:
        labels.append(state['state'])
        chartdata.append(state['confirmed'])

    return render(request, 'index-humidity.html', {'labels': labels, 'chartdata': chartdata})

def locations(request):
    
    #get API data for sensor info
    url='http://localhost:3000/api/sensor/map/data'
    res=urllib.request.urlopen(url)
    data=json.loads(res.read())

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

        #create map
        figure = folium.Figure(width=1200, height=550)
        map = folium.Map(location= [52.3507849, 5.2647016], zoom_start=10).add_to(figure)
        folium.Marker([52.3717774, 5.2200557], tooltip="Stadhuisplein Almere", popup="Afval: " + trashValue + " <br> Temperatuur: " + str(temperature) + "°C <br> Luchtvochtigheid: " + 
        str(humidity) + "% <br> Fijnstof: " + str(dust) + " PM <br> CO2: " + str(eco2) + "<br> TVOC: " + str(tvoc) + "<br> CO2-Equivalent: " + str(co2eq) + " <br> Druk: " + str(pressure) + " hPa").add_to(map)
        
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

    print('Accuracy: ',metrics.accuracy_score(y_test, y_pred))

    #prediction
    new_candidates = {'tijdstip': [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
    timevalues = ["9u", "10u", "11u", "12u", "13u", "14u", "15u", "16u", "17u", "18u"]

    data2 = pd.DataFrame(new_candidates,columns= ['tijdstip'])
    y_pred=logistic_regression.predict(data2)

    return render(request, 'futureprediction.html', {'chartdata': list(y_pred), 'timevalues': timevalues, 'date': date})

