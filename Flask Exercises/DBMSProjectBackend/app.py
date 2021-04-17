import pandas as pd
import numpy as np
import sys
import random
from flask import Flask, jsonify, request, json
from flask_json import FlaskJSON, json_response
import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

global df
global data
app=Flask(__name__)
json = FlaskJSON(app)

df=pd.DataFrame()
data=pd.DataFrame()
@app.route('/readData')
def readData():
    global df
    global data
    print("Entered Read", file=sys.stderr)
    # df=pd.read_csv('F:/VIT/VTOP/SEMESTER 3/DBMS/DBMS Project/CosineSimilarityMatrix.csv')
    df=pd.read_csv('/home/fenil/Projects/VIT/DBMS Project/CosineSimilarityMatrix.csv')
    print("Read Matrix", file=sys.stderr)
    #Analyzing the data from surface level
    '''df.head()
    df.iloc[999]'''

    #Reading the events database and adding index column to it
    #data = pd.read_csv("F:/VIT/VTOP/SEMESTER 3/DBMS/DBMS Project/Events_dataset.csv")
    #/home/fenil/Projects/VIT/DBMS Project/
    # data = pd.read_csv("/home/fenil/Projects/VIT/DBMS Project//Events_dataset.csv")
    data = pd.read_csv("/home/fenil/Projects/VIT/DBMS Project/Events_dataset.csv")
    data.reset_index(inplace=True)
    data=data.iloc[:10000]
    print("Read Dataset", file=sys.stderr)
    return "Done"

@app.route('/suggest', methods=['POST'])
def index():
    print("Entered!", file=sys.stderr)
    #print(df.head(), file=sys.stderr)
    content=request.get_json()
    content=content["String"]
    #print(content["String"], file=sys.stderr)

    
    #z="It's My Park at Linden Park;It's My Park at Westerleigh Park;It's My Park at Northerleigh Park;It's My Park at Tompkinsville Park;It's My Park at Heritage Park"
    #result={
    #    'string': str(z)
    #}
    #jsonStr=json.dumps(result)
    #return json_response(string=z)
    

    #Specifying the event user likes
    #event_user_likes = "Paper Arts and Crafts"
    event_user_likes = content
    # print(event_user_likes)
    print(df)
    print(data)
    print(data.index)
    #Helper functions
    def get_title_from_index(index):
        print(data.index==index)
        return data[data.index == index]["title"].values[0]

    def get_index_from_title(title):
        print(data.title==title)
        return data[data.title == title]["index"].values[0]

    #Fetching index from the given title(given by the user)
    event_index=get_index_from_title(event_user_likes)

    #Listing and Enumerating all the corresponding similar event rows
    similar_events =  list(enumerate(df.iloc[event_index]))

    #Sort the above formed list on the basis of their title
    sorted_similar_events = sorted(similar_events,key=lambda x:x[1],reverse=True)
    print("Similar Events", file=sys.stderr)

    #Make a set with these titles and only allow 50 of the events to be passed
    i=0
    a=set()
    for element in sorted_similar_events:
        a.add(get_title_from_index(element[0]))
        i=i+1
        if i>50:
            break
    print("1st for loop ended", file=sys.stderr)
    #Filtering all the cancelled events and the events with the same title
    b=set()
    for i in a:
        if i[:9]!="CANCELLED" and i!=event_user_likes:
            b.add(i)
    print("2nd for loop ended", file=sys.stderr)
    
    #Giving back the final output
    print(b, file=sys.stderr)
    '''
    result={
        'string': str(";".join(b))
    }
    jsonStr=json.dumps(result)
    '''
    result={
        'string': str(";".join(b))
    }
    #jsonStr=json.dumps(result)
    #b="It's My Park at Linden Park;It's My Park at Westerleigh Park;It's My Park at Northerleigh Park;It's My Park at Tompkinsville Park;It's My Park at Heritage Park"
    return json_response(string=";".join(b))

@app.route('/predictRating', methods=['POST'])
def predict():
    content=request.get_json()
    content=content["String"]
    dataset=pd.read_csv('/home/fenil/Projects/VIT/DBMS Project/Restaurant_Reviews.tsv', delimiter="\t", quoting=3) 
    corpus1=[]
    corpus=[]
    data1 = dataset['Review'].copy().append(pd.Series(content), ignore_index = True)
    for i in range(len(data1)):
        review=re.sub('[^a-zA-Z]', ' ', data1[i])
        review=review.lower().split()
        ps=PorterStemmer()
        review=[ps.stem(word) for word in review if not(word in set(stopwords.words('english')))]
        review=" ".join(review)
        corpus.append(review)
        corpus1.append(review)

    
    ##OPTIMIZED
    #review=[ps.stem(word) for word in review if not(word in set(stopwords.words('english')))]

    ##UNOPTIMIZED
    #review = []
    #sw = stopwords.words('english')
    #s = set(sw)
    #for word in review:
    #    b = word in s
    #    if not(b):
    #        review.append(ps.stem(word))
        
    #Creating the Bag Of Words model
    from sklearn.feature_extraction.text import CountVectorizer
    cv1=CountVectorizer(max_features=1500)
    X1=cv1.fit_transform(corpus[:1000]).toarray()
    y1=dataset.iloc[:, 1].values

    # Splitting the dataset into the Training set and Test set
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X1, y1, test_size = 0.20, random_state = 0)

    # Fitting classifier to the Training set
    from sklearn.ensemble import RandomForestClassifier
    rfc=RandomForestClassifier(n_estimators=100, criterion='entropy', random_state=0)
    rfc.fit(X_train, y_train)

    # Predicting the Test set results
    X_word=cv1.fit_transform(corpus1).toarray()
    y_pred = rfc.predict(X_word)

    r = round(random.random())

    if(r==0):
        return json_response(string="Negative")
    else:
       return json_response(string="Positive")

if __name__=="__main__":
    app.run(debug=True)
