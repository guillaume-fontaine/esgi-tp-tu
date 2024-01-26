"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookCollection_1 = require("./bookCollection");
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
describe('BookCollection', () => {
    test('Ajouter un livre dans la collection', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
        // Act
        const result = collection.addBook(book);
        // Assert
        expect(result).toBe(true);
    });
    test('Ajouter un livre identique doit lancer une erreur', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
        // Act
        collection.addBook(book);
        // Assert
        expect(() => collection.addBook(book)).toThrow();
    });
    test('Retirer un livre par son titre', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
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
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
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
        const book1 = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
        const book2 = { title: 'The Hobbit', author: 'J.R.R. Tolkien', available: true, ratings: [] };
        // Act
        collection.addBook(book1);
        collection.addBook(book2);
        const result = collection.findBooksByAuthor('J.K. Rowling');
        // Assert
        expect(result).toEqual([book1]);
    });
    test('Obtenir le prix moyen d\'un livre par pays', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
        collection.addBook(book);
        // Mock de l'API externe
        axios_1.default.get = jest.fn().mockResolvedValue({
            data: {
                country: 'USA',
                averagePrice: 15.99,
            }
        });
        // Act
        const result = yield collection.getAveragePriceByCountry('Harry Potter');
        // Assert
        expect(result).toEqual({
            country: 'USA',
            averagePrice: 15.99,
        });
    }));
    test('Obtenir le prix moyen d\'un livre par pays - Échec', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
        collection.addBook(book);
        // Mock de l'API externe
        axios_1.default.get = jest.fn().mockRejectedValue(new Error('Erreur API'));
        // Act et Assert
        yield expect(collection.getAveragePriceByCountry('Harry Potter')).rejects.toThrow('Erreur lors de la récupération du prix moyen par pays.');
    }));
    test('Emprunter un livre par son titre', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
        // Act
        collection.addBook(book);
        const result = collection.borrowBookByTitle('Harry Potter');
        // Assert
        expect(result).toBe(true);
        expect(collection.findBookByTitle('Harry Potter').available).toBe(false);
    });
    test('Emprunter un livre non disponible doit lancer une erreur', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', ratings: [], available: false };
        // Act
        collection.addBook(book);
        // Assert
        expect(() => collection.borrowBookByTitle('Harry Potter')).toThrow();
    });
    test('Rendre un livre après l\'avoir emprunté le rend disponible', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', ratings: [], available: false };
        // Act
        collection.addBook(book);
        collection.returnBookByTitle('Harry Potter');
        // Assert
        expect(collection.findBookByTitle('Harry Potter')).toBe(true);
    });
    test('Donner plusieurs évaluations à un livre et obtenir la moyenne', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
        // Act
        collection.addBook(book);
        collection.borrowBookByTitle('Harry Potter');
        collection.rateBook('Harry Potter', 5);
        collection.rateBook('Harry Potter', 4);
        // Assert
        const averageRating = collection.getAverageRating('Harry Potter');
        expect(averageRating).toBe(4.5);
    });
    test('Obtenir le livre le plus populaire parmi la collection', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        const book1 = { title: 'Harry Potter', author: 'J.K. Rowling', available: true, ratings: [] };
        const book2 = { title: 'The Hobbit', author: 'J.R.R. Tolkien', available: true, ratings: [] };
        // Act
        collection.addBook(book1);
        collection.addBook(book2);
        collection.rateBook('Harry Potter', 5);
        collection.rateBook('The Hobbit', 4);
        // Assert
        const mostPopularBook = collection.getMostPopularBook();
        expect(mostPopularBook).toEqual({ title: 'Harry Potter', author: 'J.K. Rowling', available: true });
    });
    test('Donner une évaluation à un livre - Livre introuvable', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        // Assert
        expect(() => collection.rateBook('Harry Potter', 4)).toThrow('Aucun livre avec le titre "Harry Potter" n\'a été trouvé dans la collection.');
    });
    test('Obtenir la moyenne des évaluations d\'un livre - Livre introuvable', () => {
        // Arrange
        const collection = new bookCollection_1.BookCollection();
        // Assert
        expect(() => collection.getAverageRating('Harry Potter')).toThrow('Aucun livre avec le titre "Harry Potter" n\'a été trouvé dans la collection.');
    });
});
