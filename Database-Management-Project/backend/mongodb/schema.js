// MongoDB Schema for Library Management System

const mongoose = require('mongoose');

// Book Schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publicationYear: { type: Number },
    genre: { type: String },
    availableCopies: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Borrowing Schema
const borrowingSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: {
        type: String,
        enum: ['borrowed', 'returned', 'overdue'],
        default: 'borrowed'
    }
});

// Review Schema
const reviewSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Create models
const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);
const Borrowing = mongoose.model('Borrowing', borrowingSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = {
    Book,
    User,
    Borrowing,
    Review
}; 