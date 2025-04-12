-- Common queries for Library Management System

-- Get all available books
SELECT book_id, title, author, genre, available_copies
FROM books
WHERE available_copies > 0;

-- Get user's borrowed books
SELECT b.title, b.author, br.borrow_date, br.due_date, br.status
FROM borrowings br
JOIN books b ON br.book_id = b.book_id
WHERE br.user_id = ? AND br.status = 'borrowed';

-- Get book reviews with user information
SELECT r.rating, r.comment, r.created_at, u.username
FROM reviews r
JOIN users u ON r.user_id = u.user_id
WHERE r.book_id = ?
ORDER BY r.created_at DESC;

-- Get overdue books
SELECT b.title, u.username, br.borrow_date, br.due_date
FROM borrowings br
JOIN books b ON br.book_id = b.book_id
JOIN users u ON br.user_id = u.user_id
WHERE br.status = 'borrowed' AND br.due_date < CURRENT_TIMESTAMP;

-- Search books by title or author
SELECT book_id, title, author, genre, available_copies
FROM books
WHERE title LIKE ? OR author LIKE ?;

-- Get user's reading history
SELECT b.title, br.borrow_date, br.return_date, br.status
FROM borrowings br
JOIN books b ON br.book_id = b.book_id
WHERE br.user_id = ?
ORDER BY br.borrow_date DESC;

-- Get most popular books
SELECT b.title, b.author, COUNT(br.borrowing_id) as borrow_count
FROM books b
LEFT JOIN borrowings br ON b.book_id = br.book_id
GROUP BY b.book_id
ORDER BY borrow_count DESC
LIMIT 10;

-- Get average rating for each book
SELECT b.title, b.author, AVG(r.rating) as avg_rating, COUNT(r.review_id) as review_count
FROM books b
LEFT JOIN reviews r ON b.book_id = r.book_id
GROUP BY b.book_id
ORDER BY avg_rating DESC; 