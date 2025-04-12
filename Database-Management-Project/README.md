# Library Management System

A comprehensive library management system that demonstrates the implementation of both MySQL and MongoDB databases. This project showcases how to work with different database systems while maintaining a consistent user interface.

## Features

- Dual database support (MySQL and MongoDB)
- Book catalog with search functionality
- Book details and reviews
- Responsive design
- Real-time database switching

## Project Structure

```
Database-Management-Project/
│
├── backend/
│   ├── mysql/
│   │   ├── schema.sql
│   │   ├── insert_data.sql
│   │   └── queries.sql
│   ├── mongodb/
│   │   ├── schema.js
│   │   ├── insert_data.js
│   │   └── queries.js
│   └── README.md
│
├── app/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── docs/
│   ├── ER_Diagram.png
│   ├── MongoDB_Model.png
│   └── Project_Report.pdf
│
├── README.md
└── .gitignore
```

## Prerequisites

- Python 3.8 or higher
- MySQL 8.0 or higher
- MongoDB 4.4 or higher
- Node.js 14.0 or higher (for MongoDB scripts)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Database-Management-Project.git
   cd Database-Management-Project
   ```

2. Set up MySQL:
   ```bash
   mysql -u root -p < backend/mysql/schema.sql
   mysql -u root -p < backend/mysql/insert_data.sql
   ```

3. Set up MongoDB:
   ```bash
   cd backend/mongodb
   npm install
   node insert_data.js
   ```

4. Install Python dependencies:
   ```bash
   cd app
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the app directory:
   ```
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=library_management
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_DATABASE=library_management
   ```

6. Start the Flask application:
   ```bash
   python app.py
   ```

7. Open the frontend/index.html file in your web browser or serve it using a local server.

## Usage

1. The application will load with MySQL as the default database.
2. Use the toggle buttons to switch between MySQL and MongoDB.
3. Search for books using the search bar.
4. Click on a book card to view its details and reviews.

## API Endpoints

### MySQL Endpoints
- GET /api/mysql/books - Get all available books
- GET /api/mysql/books/{id}/reviews - Get reviews for a specific book
- GET /api/search/mysql?q={query} - Search books in MySQL

### MongoDB Endpoints
- GET /api/mongodb/books - Get all available books
- GET /api/mongodb/books/{id}/reviews - Get reviews for a specific book
- GET /api/search/mongodb?q={query} - Search books in MongoDB

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Flask for the backend framework
- MySQL and MongoDB communities for their excellent documentation 