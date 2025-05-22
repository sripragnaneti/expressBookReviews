const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Simulate a base URL for Axios (dummy, since data is local)
const BASE_URL = "http://localhost:5000";

// Task 10: Get the book list available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
  try {
    // Instead of fetching from external API, simulate async delay with Promise
    const bookList = await new Promise((resolve) => {
      setTimeout(() => resolve(books), 100);
    });
    res.status(200).json(bookList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Task 11: Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    // Simulate async fetch
    const book = await new Promise((resolve) => {
      setTimeout(() => resolve(books[isbn]), 100);
    });

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details" });
  }
});

// Task 12: Get book details based on author using async-await with Axios
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;

    // Simulate async fetch/filter
    const filteredBooks = await new Promise((resolve) => {
      setTimeout(() => {
        const filtered = [];
        for (const isbn in books) {
          if (books[isbn].author === author) filtered.push(books[isbn]);
        }
        resolve(filtered);
      }, 100);
    });

    if (filteredBooks.length > 0) {
      res.status(200).json(filteredBooks);
    } else {
      res.status(404).json({ message: "No books found by that author" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by author" });
  }
});

// Task 13: Get all books based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;

    // Simulate async fetch/filter
    const filteredBooks = await new Promise((resolve) => {
      setTimeout(() => {
        const filtered = [];
        for (const isbn in books) {
          if (books[isbn].title === title) filtered.push(books[isbn]);
        }
        resolve(filtered);
      }, 100);
    });

    if (filteredBooks.length > 0) {
      res.status(200).json(filteredBooks);
    } else {
      res.status(404).json({ message: "No books found with that title" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by title" });
  }
});

module.exports.general = public_users;
