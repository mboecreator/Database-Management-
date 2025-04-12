-- Insert sample books
INSERT INTO books (title, author, isbn, publication_year, genre, available_copies) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 1925, 'Fiction', 3),
('To Kill a Mockingbird', 'Harper Lee', '9780446310789', 1960, 'Fiction', 2),
('1984', 'George Orwell', '9780451524935', 1949, 'Science Fiction', 4),
('Pride and Prejudice', 'Jane Austen', '9780141439518', 1813, 'Romance', 2),
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 1937, 'Fantasy', 3);

-- Insert sample users
INSERT INTO users (username, email, password_hash, full_name) VALUES
('john_doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJGwjti', 'John Doe'),
('jane_smith', 'jane@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJGwjti', 'Jane Smith'),
('bob_wilson', 'bob@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJGwjti', 'Bob Wilson');

-- Insert sample borrowings
INSERT INTO borrowings (book_id, user_id, borrow_date, due_date, status) VALUES
(1, 1, '2024-03-01 10:00:00', '2024-03-15 10:00:00', 'borrowed'),
(2, 2, '2024-03-05 14:30:00', '2024-03-19 14:30:00', 'borrowed'),
(3, 1, '2024-02-20 09:15:00', '2024-03-05 09:15:00', 'returned');

-- Insert sample reviews
INSERT INTO reviews (book_id, user_id, rating, comment) VALUES
(1, 1, 5, 'A masterpiece of American literature'),
(2, 2, 4, 'Powerful and moving story'),
(3, 1, 5, 'A timeless classic that remains relevant today'); 