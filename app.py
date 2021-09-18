from flask import Flask, render_template, redirect
import pymongo

app = Flask(__name__)

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
   
    
    #park_info = mongo.db.travel_info.find(parkCode=pCode) 
    park_info = {
                "fullName": "Abraham Lincoln Birthplace National Historical Park",
                "parkCode": "abli",
                "description": "For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln. His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War. The country's first memorial to Lincoln, built with donations from young and old, enshrines the symbolic birthplace cabin.",
                "activities": [ "Astronomy", "Stargazing", "Food",  "Picnicking", "Junior Ranger Program"],               
                "states": "KY",
                "contacts": {
                    "phoneNumbers": [
                        {
                            "phoneNumber": "2703583137",
                            "type": "Voice"
                        },
                        {
                            "phoneNumber": "2703583874",
                            "type": "Fax"
                        }
                    ],
                    "emailAddresses": [
                        {
                            "emailAddress": "ABLI_Administration@nps.gov"
                        }
                    ]
                }, 
                "entranceFees": [
                    {
                        "cost": "0.00",
                        "description": "There is no fee associated with visiting either unit of the park.",
                        "title": "Fee Free Park"
                    }
                ],
                "images": [
                    {
                        "credit": "NPS Photo",
                        "title": "The Memorial Building with fall colors",
                        "altText": "The Memorial Building surrounded by fall colors",
                        "caption": "Over 200,000 people a year come to walk up the steps of the Memorial Building to visit the site where Abraham Lincoln was born",
                        "url": "https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg"
                    },
                    {
                        "credit": "NPS Photo",
                        "title": "The Memorial Building",
                        "altText": "The first memorial erected to honor Abraham Lincoln",
                        "caption": "The Memorial Building constructed on the traditional site of the birth of Abraham Lincoln.",
                        "url": "https://www.nps.gov/common/uploads/structured_data/3C861263-1DD8-B71B-0B71EF9B95F9644F.jpg"
                    }]
                            
                
                    }
    return render_template("park_detail.html", park = park_info)


@app.route("/hotels.html")
def hotels():
    return render_template("hotels.html")

@app.route("/visitation.html")
def visitation():
    return render_template("visitation.html")



if __name__ == "__main__":
    app.run(debug=True)
