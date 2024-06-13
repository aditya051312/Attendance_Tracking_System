import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch the list of books from the backend server
        axios.get('/api/books')
            .then(response => {
                // Update the state with the list of books
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;