"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookCollection = void 0;
// BookCollection.ts
class BookCollection {
    constructor() {
        this.books = {};
    }
    addBook(book) {
        if (this.books[book.title]) {
            throw new Error('Un livre identique existe déjà dans la collection.');
        }
        this.books[book.title] = book;
        return true;
    }
    removeBookByTitle(title) {
        if (!this.books[title]) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        delete this.books[title];
        return true;
    }
    findBookByTitle(title) {
        const book = this.books[title];
        if (!book) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        return book;
    }
    findBooksByAuthor(author) {
        const result = [];
        for (const title in this.books) {
            if (this.books[title].author === author) {
                result.push(this.books[title]);
            }
        }
        return result;
    }
}
exports.BookCollection = BookCollection;
