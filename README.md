# travel-project

## Project Summary
Our aim is to provide useful information for prospective travelers to National Parks.
We will source the data and upload onto Mongo database,  upload onto website with Flask server, and format website with HTML/CSS/Javascript

## Data Sources
* Find list of national parks and other info about the parks: https://www.nps.gov/subjects/developer/api-documentation.htm ; https://pypi.org/project/python-natlparks/
  * Names of all national parks and their parkCode
  * park description
  * long and latitude of each park
  * address
  * link to each park website
  * hours of operation
  * image of each park
  * weatherInfo
  * print out activities for each park
* Hotels nearby: https://maps.googleapis.com/maps/api/place/nearbysearch/json 

## Project Outline
1. Extract Data from API  
3. Create ERD for the fields we will need, and define primary keys
4. Clean the data in Flask app.py file
5. Load data onto Mongo 
6. Create HTML pages (things to do, campgrounds, etc.) 
7. Javascript - map visualization to show location of national parks and zoom in to show locations of nearby hotels 


## Team Members
* Melissa Diep
* Dasa Simo
* Shuchi Khandelwal 
* Megan Butler
