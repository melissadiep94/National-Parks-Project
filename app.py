from flask import Flask, render_template, redirect,jsonify
from pymongo import MongoClient
import socket
import os

app = Flask(__name__)

db_name = "parks_db"

parks_collection = "parks"
visits_collection = "visits"
activities_collection = "activities"

#print(db.parks.find_one())

#check if we're running in heroku and my environment variable exist

if 'MONGO_URL' in os.environ:
    mongo_url = os.environ['MONGO_URL']
else:
    #if we're not running in heroku then try and get my local config pwd
    mongo_url = "mongodb://localhost:27017"



@app.route("/")
@app.route("/index.html")
def index():
    return render_template("index.html")


@app.route("/name.html")
def p_name():
    
    client = MongoClient(mongo_url)

    db = client[db_name]

    collection = db[parks_collection]

    results = collection.find()
    #results is a cursor object, when looping through it each result is a dictionary
    names_from_db = [result["fullName"] for result in results]

    return render_template("name.html", names = names_from_db)


@app.route("/parks/<pCode>")
def park_detail(pCode):
    client = MongoClient(mongo_url)

    db = client[db_name]

    collection = db[parks_collection]

    park_info_from_db = collection.find({"parkCode": pCode})[0]
        
    # string_to_list(park_info_from_db,"images_url") 
    
    return render_template("park_detail_v2.html", park = park_info_from_db)


@app.route("/api/v1/markers")
def markers_api():
    client = MongoClient(mongo_url)

    db = client[db_name]

    collection = db[parks_collection]

    results = collection.find()

  
    data = [ {"latitude": result["latitude"], "longitude": result["longitude"], "parkCode" :result["parkCode"], "fullName" :result["fullName"], "designation" :result["designation"] , "states" :result["states"] } for result in results]
    
    return jsonify(data)


def string_to_list(data, tag_name)  :
    data[tag_name]= data[tag_name].replace("[", "").replace("]","").replace("'","").split(", ")


@app.route("/team.html")
def team():
    return render_template("team.html")


@app.route("/visitation.html")
def visitation():
    client = MongoClient(mongo_url)

    db = client[db_name]

    collection = db[visits_collection]

    results = collection.find()

    return render_template("visitation.html")


@app.route("/api/v1/visits")
def visit_api():
    client = MongoClient(mongo_url)

    db = client[db_name]

    collection = db[visits_collection]

    results = collection.find()
  
   #data = [ {"park": result["ParkName"], "year": result["Year"], "visits" :result["Value"], "rank": result["Rank"]} for result in results]
    data = []
    for result in results:
        park=next((item for item in data if item["park"] == result["ParkName"]), None)
        if park == None :
            park = {"park": result["ParkName"]}
            data.append(park)

        park[f'y{result["Year"]}'] = result["Value"]      

    print(data)
    return jsonify(data)

@app.route("/api/v1/activities")
def activites_api():
    client = MongoClient(mongo_url)

    db = client[db_name]

    collection = db[activities_collection]

    results = collection.find()

  
    data = [ {"count": result["Value"], "type": result["Type"]} for result in results]

    print(data)
    return jsonify(data)




if __name__ == "__main__":
    app.run(debug=True)


