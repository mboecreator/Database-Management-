// API endpoints
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mysqlButton = document.getElementById('mysqlButton');
const mongodbButton = document.getElementById('mongodbButton');
const booksList = document.getElementById('booksList');
const bookInfo = document.getElementById('bookInfo');
const reviewsList = document.getElementById('reviewsList');

// State
let currentDatabase = 'mysql';

// Event Listeners
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

mysqlButton.addEventListener('click', () => switchDatabase('mysql'));
mongodbButton.addEventListener('click', () => switchDatabase('mongodb'));

// Functions
async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        loadBooks();
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/search/${currentDatabase}?q=${encodeURIComponent(query)}`);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error searching books:', error);
        showError('Failed to search books');
    }
}

function switchDatabase(database) {
    currentDatabase = database;
    mysqlButton.classList.toggle('active', database === 'mysql');
    mongodbButton.classList.toggle('active', database === 'mongodb');
    loadBooks();
}

async function loadBooks() {
    try {
        const response = await fetch(`${API_BASE_URL}/${currentDatabase}/books`);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error loading books:', error);
        showError('Failed to load books');
    }
}

function displayBooks(books) {
    booksList.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Available Copies:</strong> ${book.availableCopies}</p>
        `;
        bookCard.addEventListener('click', () => showBookDetails(book));
        booksList.appendChild(bookCard);
    });
}

async function showBookDetails(book) {
    // Display book information
    bookInfo.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>ISBN:</strong> ${book.isbn}</p>
        <p><strong>Publication Year:</strong> ${book.publicationYear}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Available Copies:</strong> ${book.availableCopies}</p>
    `;

    // Load and display reviews
    try {
        const bookId = currentDatabase === 'mysql' ? book.book_id : book._id;
        const response = await fetch(`${API_BASE_URL}/${currentDatabase}/books/${bookId}/reviews`);
        const reviews = await response.json();
        displayReviews(reviews);
    } catch (error) {
        console.error('Error loading reviews:', error);
        showError('Failed to load reviews');
    }
}

function displayReviews(reviews) {
    reviewsList.innerHTML = '';
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p>No reviews yet</p>';
        return;
    }

    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="rating">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </div>
            <p>${review.comment}</p>
            <p class="username">By ${review.username}</p>
        `;
        reviewsList.appendChild(reviewCard);
    });
}

function showError(message) {
    // You can implement a more sophisticated error display
    alert(message);
}

// Initial load
loadBooks(); 