# import dependences
from flask import Flask, render_template, redirect
from natlparks import NatlParks
import pymongo
import park_scraper
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
@app.route("/")
def home():
    parks = collection.find_one()
    return render_template("index.html", parks=parks)

# scrape route to scrape
@app.route('/parks')
def parks():
    parks.scrape()
    return redirect("/")

@app.route("/hotels")
def hotels():

if __name__ == "__main__":
    app.run(debug=True)