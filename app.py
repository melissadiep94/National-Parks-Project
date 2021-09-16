# import dependences
from flask import Flask, render_template, redirect
import pymongo
from natlparks import NatlParks
import json
# Create an instance of Flask
app = Flask(__name__)

# Use PyMOngo to establish Mongo connection
conn = "mongodb://localhost:27017"

#Pass connection to the pymongo instance
client = pymongo.MongoClient(conn)

#connect to a database.
db = client.parks_db
collection = db.parks

# Route to render index.html template using data from Mongo
@app.route("/index")
def index():
    parks = collection.find_one()
    return render_template("index.html", parks=parks)

# route to find parks by name
@app.route('/parks')
def parks():
    
 results = list(client.parks_db.find())
 for parks in park:
  return render_template("parks.html", names=names)

# route to find visitation 
@app.route("/visitation")
def visitation(): 

 results = list(client.parks_db.find())
 for visits in visitation:
  return render_template("visitation.html", visit= visits)

# route to find nearby hotels
#@app.route("/hotel")
#def hotel():

 #results = list(client.parks_db.find())
 #for parks in park:
 #return render_template("hotel.html", names=names)


if __name__ == "__main__":
 app.run(debug=True)