from sklearn.feature_extraction.text import CountVectorizer
import praw
import matplotlib.pyplot as plt
import pandas as pd

stop_words = set([x.strip() for x in open('stopwords-en.txt','r').read().split('\n')])
new_stopwords = ['ain', 'daren', 'hadn', 'herse', 'himse', 'itse', 'mayn', 'mightn', 'mon', 'mustn', 'myse', 'needn', 'oughtn', 'shan', 'nbsp', 'https', 'http', 'uj', 'savevideo']
for x in new_stopwords:
    stop_words.add(x)

class subredditScraper():
    def __init__(self):
        self.reddit = praw.Reddit(client_id='0_-Hxz4kdjAK8rJZTjyhxA',
                                  client_secret='qolqL57QTRfJ1Lm0oUgv7l5FF3c6ww',
                                  password='reddit_api',
                                  user_agent='cs361_scraper',
                                  username='TemporaryWillow7273')
        self.data = []
        self.json_data = None

    @staticmethod
    def term_freq(data):
        count_terms = CountVectorizer(
            lowercase=True, stop_words=stop_words, max_features=20)
        terms_data = count_terms.fit_transform(data).toarray()
        terms = count_terms.get_feature_names_out()
        frequency = terms_data.sum(axis=0).tolist()

        df = pd.DataFrame(
            {'Term': terms,
             'Frequency': frequency
             })
        df = df[df.columns[::-1]]
        df.sort_values('Frequency', axis=0, ascending=False, inplace=True)
        df.reset_index(drop=True, inplace=True)
        return df

    def displayGraph(self):
        ax = self.data.plot(x='Term', y='Frequency', kind='barh')
        ax.invert_yaxis()
        plt.show()

    def convertToJson(self):
        self.json_data = self.data.to_json(orient='records')

    def comment_collector(self, submission):
        self.data.append(submission.title)
        submission.comments.replace_more(limit=0)
        # Crawls the top level comments in these threads and appends to data array
        for top_level_comment in submission.comments:
            self.data.append(top_level_comment.body)
            # Crawls the second level comments and appends to data array
            for second_level_comment in top_level_comment.replies:
                self.data.append(second_level_comment.body)
        

    def crawlSubreddit(self, query, query_type):
        """
        Crawls the subreddit for comments and returns True. Returns False if unable to crawl or find subreddit.
        query: subreddit name
        query_type: Defaults to 'hot'. Can be 'hot', 'top', 'new', 'rising'.
        """
        subreddit = self.reddit.subreddit(query)
        try:
            title = subreddit.title
        except:
            return False

        # Crawl 30 subreddit threads and append the title to data array
        if query_type == 'hot':
            for submission in subreddit.hot(limit=30):
                self.comment_collector(submission)
        elif query_type == 'top':
            for submission in subreddit.top(limit=30):
                self.comment_collector(submission)
        elif query_type == 'new':
            for submission in subreddit.new(limit=30):
                self.comment_collector(submission)
        elif query_type == 'rising':
            for submission in subreddit.hot(limit=30):
                self.comment_collector(submission)
            

        self.data = self.term_freq(self.data)
        self.convertToJson()
        return True

if __name__ == '__main__':
    scraper = subredditScraper()
    scraper.crawlSubreddit('cryptocurrency')
    scraper.displayGraph()
    print(scraper.data)
