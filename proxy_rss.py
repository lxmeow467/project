from flask import Flask, request, jsonify
import feedparser
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/proxy_rss')
def proxy_rss():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'No url provided'}), 400
    # Парсинг FIDE Chess News по HTML, если запрошен этот url
    if url.startswith('https://www.fide.com/category/chess-news'):
        resp = requests.get(url)
        soup = BeautifulSoup(resp.text, 'html.parser')
        news_list = []
        # Новая структура: .post-list .post-item
        for item in soup.select('.post-list .post-item'):
            title_tag = item.select_one('.post-title')
            link_tag = title_tag.find('a') if title_tag else None
            title = link_tag.text.strip() if link_tag else ''
            link = link_tag['href'] if link_tag else ''
            desc = item.select_one('.post-excerpt')
            description = desc.text.strip() if desc else ''
            date_tag = item.select_one('.post-date')
            pubDate = date_tag.text.strip() if date_tag else ''
            img_tag = item.select_one('img')
            img_url = img_tag['src'] if img_tag else ''
            news_list.append({
                'title': title,
                'link': link,
                'description': description,
                'pubDate': pubDate,
                'media_content': [{'url': img_url}] if img_url else [],
                'source': 'FIDE (chess-news)'
            })
        # Если ничего не найдено, пробуем старую структуру
        if not news_list:
            for item in soup.select('.news-list .news-item'):
                title_tag = item.select_one('.news-title')
                link_tag = title_tag.find('a') if title_tag else None
                title = link_tag.text.strip() if link_tag else ''
                link = link_tag['href'] if link_tag else ''
                desc = item.select_one('.news-excerpt')
                description = desc.text.strip() if desc else ''
                date_tag = item.select_one('.news-date')
                pubDate = date_tag.text.strip() if date_tag else ''
                img_tag = item.select_one('img')
                img_url = img_tag['src'] if img_tag else ''
                news_list.append({
                    'title': title,
                    'link': link,
                    'description': description,
                    'pubDate': pubDate,
                    'media_content': [{'url': img_url}] if img_url else [],
                    'source': 'FIDE (chess-news)'
                })
        return jsonify({'entries': news_list})
    # Обычный RSS
    feed = feedparser.parse(url)
    return jsonify({'entries': feed.entries})

if __name__ == '__main__':
    app.run(port=5000) 