"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// BookCollection.test.ts
const bookCollection_1 = require("./bookCollection");
describe('BookCollection', () => {
    test('Ajouter un livre dans la collection', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling' };
        // Act
        const result = collection.addBook(book);
        // Assert
        expect(result).toBe(true);
    });
    test('Ajouter un livre identique doit lancer une erreur', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling' };
        // Act
        collection.addBook(book);
        // Assert
        expect(() => collection.addBook(book)).toThrow();
    });
    test('Retirer un livre par son titre', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling' };
        // Act
        collection.addBook(book);
        const result = collection.removeBookByTitle('Harry Potter');
        // Assert
        expect(result).toBe(true);
    });
    test('Retirer un livre par titre inexistant doit lancer une erreur', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        // Assert
        expect(() => collection.removeBookByTitle('Harry Potter')).toThrow();
    });
    test('Trouver un livre par son titre', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling' };
        // Act
        collection.addBook(book);
        const result = collection.findBookByTitle('Harry Potter');
        // Assert
        expect(result).toEqual(book);
    });
    test('Trouver un livre par titre inexistant doit lancer une erreur', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        // Assert
        expect(() => collection.findBookByTitle('Harry Potter')).toThrow();
    });
    test('Trouver des livres par auteur', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book1 = { title: 'Harry Potter', author: 'J.K. Rowling' };
        const book2 = { title: 'The Hobbit', author: 'J.R.R. Tolkien' };
        // Act
        collection.addBook(book1);
        collection.addBook(book2);
        const result = collection.findBooksByAuthor('J.K. Rowling');
        // Assert
        expect(result).toEqual([book1]);
    });
});
