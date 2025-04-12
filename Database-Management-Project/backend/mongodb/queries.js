const { Book, User, Borrowing, Review } = require('./schema');

// Common queries for Library Management System

// Get all available books
async function getAvailableBooks() {
    return await Book.find({ availableCopies: { $gt: 0 } });
}

// Get user's borrowed books
async function getUserBorrowedBooks(userId) {
    return await Borrowing.find({ user: userId, status: 'borrowed' })
        .populate('book')
        .populate('user', 'username');
}

// Get book reviews with user information
async function getBookReviews(bookId) {
    return await Review.find({ book: bookId })
        .populate('user', 'username')
        .sort({ createdAt: -1 });
}

// Get overdue books
async function getOverdueBooks() {
    return await Borrowing.find({
        status: 'borrowed',
        dueDate: { $lt: new Date() }
    })
    .populate('book')
    .populate('user', 'username');
}

// Search books by title or author
async function searchBooks(query) {
    return await Book.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } }
        ]
    });
}

// Get user's reading history
async function getUserReadingHistory(userId) {
    return await Borrowing.find({ user: userId })
        .populate('book')
        .sort({ borrowDate: -1 });
}

// Get most popular books
async function getMostPopularBooks(limit = 10) {
    return await Borrowing.aggregate([
        {
            $group: {
                _id: '$book',
                borrowCount: { $sum: 1 }
            }
        },
        {
            $sort: { borrowCount: -1 }
        },
        {
            $limit: limit
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'book'
            }
        },
        {
            $unwind: '$book'
        }
    ]);
}

// Get average rating for each book
async function getBookRatings() {
    return await Review.aggregate([
        {
            $group: {
                _id: '$book',
                avgRating: { $avg: '$rating' },
                reviewCount: { $sum: 1 }
            }
        },
        {
            $sort: { avgRating: -1 }
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'book'
            }
        },
        {
            $unwind: '$book'
        }
    ]);
}

module.exports = {
    getAvailableBooks,
    getUserBorrowedBooks,
    getBookReviews,
    getOverdueBooks,
    searchBooks,
    getUserReadingHistory,
    getMostPopularBooks,
    getBookRatings
}; 