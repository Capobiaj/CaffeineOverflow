Start the application by CDing into frontend folder and running 'npm start' in the terminal.

Application displays results from two microservices through REST API.

First microservice is a WikiTravel scraper which takes a user inputted location and searches the 
WikiTravel site to find a page with that term. If successful, it returns the scraped results in JSON. 
Otherwise, it will return JSON stating that the exact page wasn't found and will also send related pages
that the user could input instead. 

Second microservice is a Reddit Scraper which takes a user inputted term for and searches if there is a 
subreddit with that name. If successful, it returns the most frequent terms on that subreddit. If the 
subreddit does not exist, it will return a message stating that the subreddit does not exist. 