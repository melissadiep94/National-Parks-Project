from flask import Flask, render_template, redirect,jsonify
import pymongo

app=Flask(__name__)

# Use PyMongo to establish Mongo connection
conn = "mongodb://localhost:27017"

# #Pass connection to the pymongo instance
client = pymongo.MongoClient(conn)

# #connect to a database.
db = client.parks_db
collection = db.parks

#print(db.parks.find_one())


@app.route("/")
@app.route("/index.html")
def index():
    return render_template("index.html")


@app.route("/name.html")
def p_name():
    
    results = collection.find()
    #results is a cursor object, when looping through it each result is a dictionary
    names_from_db = [result["fullName"] for result in results]

    return render_template("name.html", names = names_from_db)


@app.route("/parks/<pCode>")
def park_detail(pCode):
   
    park_info_from_db = collection.find({"parkCode": pCode})[0]
        
    # string_to_list(park_info_from_db,"images_url") 
    
    return render_template("park_detail.html", park = park_info_from_db)


@app.route("/api/v1/markers")
def markers_api():
   
    results = db.parks.find()
  
    data = [ {"latitude": result["latitude"], "longitude": result["longitude"], "parkCode" :result["parkCode"], "fullName" :result["fullName"], "designation" :result["designation"] , "states" :result["states"] } for result in results]
    return jsonify(data)


def string_to_list(data, tag_name)  :
    data[tag_name]= data[tag_name].replace("[", "").replace("]","").replace("'","").split(", ")


@app.route("/park_detail.html")
def park_detail():
    return render_template("park_detail.html")


@app.route("/visitation.html")
def visitation():
    results = collection.find()
    return render_template("visitation.html")


@app.route("/api/v1/visits")
def visit_api():
   
    results = db.visits_2020.find().limit(50)
  
    data = [ {"park": result["Park"], "rank": result["Rank"], "visits" :result["Recreation Visits"] } for result in results]
    return jsonify(data)





if __name__ =="__main__":
 app.run(debug=True)
   


