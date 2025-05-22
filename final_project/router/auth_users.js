const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const secretKey = 'your_secret_key'; 

// Task 7: check if username is valid (exists)
const isValid = (username) => {
  return users.some(user => user.username === username);
}


// Task 7: check if username and password match
const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
}

// Task 7: Login route
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Create and sign JWT token with username payload
  const token = jwt.sign({ username: username }, secretKey, { expiresIn: '1h' });

  return res.status(200).json({ message: "Login successful", token: token });
});

// Task 8: Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const username = req.body.username; // Get username from request body
    const isbn = req.params.isbn;
    const review = req.query.review;
  
    if (!username) {
      return res.status(400).json({ message: "Username is required in request body" });
    }
  
    if (!review) {
      return res.status(400).json({ message: "Review query parameter is required" });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    if (!books[isbn].reviews) {
      books[isbn].reviews = {};
    }
  
    books[isbn].reviews[username] = review;
  
    return res.status(200).json({ message: "Review added/updated", reviews: books[isbn].reviews });
  });
  
// Task 9: Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.body.username; // Get username from request body
    const isbn = req.params.isbn;
  
    if (!username) {
      return res.status(400).json({ message: "Username is required in request body" });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    if (!books[isbn].reviews || !books[isbn].reviews[username]) {
      return res.status(404).json({ message: "Review by user not found" });
    }
  
    delete books[isbn].reviews[username];
  
    return res.status(200).json({ message: "Review deleted", reviews: books[isbn].reviews });
  });
  
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
