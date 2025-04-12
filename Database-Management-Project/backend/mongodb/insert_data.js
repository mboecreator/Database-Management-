const mongoose = require('mongoose');
const { Book, User, Borrowing, Review } = require('./schema');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Sample data insertion
async function insertSampleData() {
    try {
        // Clear existing data
        await Promise.all([
            Book.deleteMany({}),
            User.deleteMany({}),
            Borrowing.deleteMany({}),
            Review.deleteMany({})
        ]);

        // Insert books
        const books = await Book.insertMany([
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                isbn: '9780743273565',
                publicationYear: 1925,
                genre: 'Fiction',
                availableCopies: 3
            },
            {
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                isbn: '9780446310789',
                publicationYear: 1960,
                genre: 'Fiction',
                availableCopies: 2
            },
            {
                title: '1984',
                author: 'George Orwell',
                isbn: '9780451524935',
                publicationYear: 1949,
                genre: 'Science Fiction',
                availableCopies: 4
            }
        ]);

        // Insert users
        const users = await User.insertMany([
            {
                username: 'john_doe',
                email: 'john@example.com',
                passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJGwjti',
                fullName: 'John Doe'
            },
            {
                username: 'jane_smith',
                email: 'jane@example.com',
                passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJGwjti',
                fullName: 'Jane Smith'
            }
        ]);

        // Insert borrowings
        await Borrowing.insertMany([
            {
                book: books[0]._id,
                user: users[0]._id,
                borrowDate: new Date('2024-03-01'),
                dueDate: new Date('2024-03-15'),
                status: 'borrowed'
            },
            {
                book: books[1]._id,
                user: users[1]._id,
                borrowDate: new Date('2024-03-05'),
                dueDate: new Date('2024-03-19'),
                status: 'borrowed'
            }
        ]);

        // Insert reviews
        await Review.insertMany([
            {
                book: books[0]._id,
                user: users[0]._id,
                rating: 5,
                comment: 'A masterpiece of American literature'
            },
            {
                book: books[1]._id,
                user: users[1]._id,
                rating: 4,
                comment: 'Powerful and moving story'
            }
        ]);

        console.log('Sample data inserted successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting sample data:', error);
        mongoose.connection.close();
    }
}

insertSampleData(); 