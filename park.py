import pymongo
from splinter import Browser
from bs4 import BeautifulSoup
import time
import pandas as pd

# Use PyMOngo to establish Mongo connection
conn = "mongodb://localhost:27017"

#Pass connection to the pymongo instance
client = pymongo.MongoClient(conn)

#connect to a database.
db = client.parks_db
collection = db.parks

def init_browser():

 #executable_path = {'executable_path': ChromeDriverManager().install()}
  browser = Browser('chrome', executable_path="chromedriver", headless=False)
  return browser

 def scrape():
 browser = init_browser()
 collection.drop()

  #parks
  url = 'https://developer.nps.gov/api/v1/parks'
  browser.visit(url)
  news_html = browser.html
  news_soup = BeautifulSoup(news_html, 'html.parser')
  title = news_soup.find("div", class_="").get_text()
  paragraph= news_soup.find("div", class_="").get_text()


