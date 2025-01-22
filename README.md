# library-mgmt-system

This is a library management system it manage books and their borrowers. This system allows adding, updating, and removing books and tracks who has borrowed which book.
It is a web server created in node.js and mongoDb for the database collections

# Mongo DB Collections
Collections:
1. Books:
    Fields: title, author, ISBN, genre, publishedYear, copiesAvailable, borrowedCount
2. Borrowers:
    Fields: name, email, phoneNumber, address, borrowedBooks (array of book IDs)
