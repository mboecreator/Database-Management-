from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MySQL connection
mysql_config = {
    'host': os.getenv('MYSQL_HOST', 'localhost'),
    'user': os.getenv('MYSQL_USER', 'root'),
    'password': os.getenv('MYSQL_PASSWORD', ''),
    'database': os.getenv('MYSQL_DATABASE', 'library_management')
}

# MongoDB connection
mongo_client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
mongo_db = mongo_client[os.getenv('MONGODB_DATABASE', 'library_management')]

# MySQL Routes
@app.route('/api/mysql/books', methods=['GET'])
def get_mysql_books():
    try:
        conn = mysql.connector.connect(**mysql_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM books WHERE available_copies > 0")
        books = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(books)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/mysql/books/<int:book_id>/reviews', methods=['GET'])
def get_mysql_book_reviews(book_id):
    try:
        conn = mysql.connector.connect(**mysql_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT r.*, u.username 
            FROM reviews r 
            JOIN users u ON r.user_id = u.user_id 
            WHERE r.book_id = %s 
            ORDER BY r.created_at DESC
        """, (book_id,))
        reviews = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(reviews)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# MongoDB Routes
@app.route('/api/mongodb/books', methods=['GET'])
def get_mongodb_books():
    try:
        books = list(mongo_db.books.find({'availableCopies': {'$gt': 0}}))
        # Convert ObjectId to string for JSON serialization
        for book in books:
            book['_id'] = str(book['_id'])
        return jsonify(books)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/mongodb/books/<book_id>/reviews', methods=['GET'])
def get_mongodb_book_reviews(book_id):
    try:
        from bson import ObjectId
        reviews = list(mongo_db.reviews.find({'book': ObjectId(book_id)})
                      .sort('createdAt', -1))
        # Convert ObjectId to string for JSON serialization
        for review in reviews:
            review['_id'] = str(review['_id'])
            review['book'] = str(review['book'])
            review['user'] = str(review['user'])
        return jsonify(reviews)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Search Routes
@app.route('/api/search/mysql', methods=['GET'])
def search_mysql():
    query = request.args.get('q', '')
    try:
        conn = mysql.connector.connect(**mysql_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT * FROM books 
            WHERE title LIKE %s OR author LIKE %s
        """, (f'%{query}%', f'%{query}%'))
        books = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(books)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/search/mongodb', methods=['GET'])
def search_mongodb():
    query = request.args.get('q', '')
    try:
        books = list(mongo_db.books.find({
            '$or': [
                {'title': {'$regex': query, '$options': 'i'}},
                {'author': {'$regex': query, '$options': 'i'}}
            ]
        }))
        # Convert ObjectId to string for JSON serialization
        for book in books:
            book['_id'] = str(book['_id'])
        return jsonify(books)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 