from flask import Flask
from flask_restful import Resource, Api
from cs361_scraper import subredditScraper
from pymongo import MongoClient
from pprint import pprint
from datetime import datetime, timedelta

# Flask initialization
app = Flask(__name__)
api = Api(app)

# MongoDB connection (MongoDB installation required!)
client = MongoClient('localhost', 27017)

# Timeframe where the data is retrieved from database if it exists rather than scraping the subreddit again.
delta = timedelta(days=1)

class GetSubreddit(Resource):
    def get(self, subreddit_name, query_type='hot'):
        # Initialize the Scraper and connect to MongoDB database
        scraper = subredditScraper()
        db = client.redditscrapy
        subreddit_collection = db.subreddit_collection

        # Checks if data exists and is still within the timeframe limits - set at 24 hours here
        subreddit_result = subreddit_collection.find_one({'subreddit': subreddit_name, 'query_type': query_type})
        
        # If data exists and within limits, returns JSON and status code 200
        if subreddit_result is not None and datetime.utcnow() - subreddit_result['time'] < delta:
            return subreddit_result['json'], 200
        else:
            # Else check if subreddit exists and returns error if not
            if scraper.crawlSubreddit(subreddit_name, query_type) is False:
                return {'error': 'Subreddit does not exist'}, 404
            else:
                # Updates the data entry in MongoDB if exists or inserts new document if not. Then returns JSON and status code 200
                subreddit_collection.update_one({'subreddit': subreddit_name, 'query_type': query_type},{'$set': {'json': scraper.json_data, 'time': datetime.utcnow()}}, upsert=True)
                return scraper.json_data, 200


api.add_resource(GetSubreddit, '/<string:subreddit_name>','/<string:subreddit_name>/','/<string:subreddit_name>/<string:query_type>')

# Run file to start Flask server
if __name__ == '__main__':
    app.run(debug=True, port=5001)