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

    url='https://data.covid19india.org/data.json'
    res=urllib.request.urlopen(url)
    data=json.loads(res.read())

    labels=[]
    chartdata=[]
    for state in data['statewise']:
        labels.append(state['state'])
        chartdata.append(state['confirmed'])

    return render(request, 'index.html', {'labels': labels, 'chartdata': chartdata})

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
    #create map
    figure = folium.Figure(width=1200, height=550)
    map = folium.Map(location= [52.3507849, 5.2647016], zoom_start=10).add_to(figure)
    folium.Marker([52.370594643885994, 5.222163998100933], tooltip="Sensor 1", popup="Afval: Ja Temperatuur: 24°C Luchtvochtigheid: Fijnstof: <br> CO2: <br> VOC: <br> CO2-Equivalent: Druk:").add_to(map)
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

    df = pd.read_excel('C:\\Users\\giorg\\Desktop\\test_data2.xlsx')
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

    #chartdata=[]
    #for value in y_pred:
                #chartdata.append(value)

    return render(request, 'futureprediction.html', {'chartdata': list(y_pred), 'timevalues': timevalues, 'date': date})

