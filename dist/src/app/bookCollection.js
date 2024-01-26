"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookCollection = void 0;
const service = __importStar(require("./book.service"));
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
    getAveragePriceByCountry(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield service.fetchDataPrice(title);
            }
            catch (error) {
                throw new Error('Erreur lors de la récupération du prix moyen par pays.');
            }
        });
    }
    borrowBookByTitle(title) {
        const book = this.books[title];
        if (!book || !book.available) {
            throw new Error(`Le livre avec le titre "${title}" n'est pas disponible pour l'emprunt.`);
        }
        book.available = false;
        return true;
    }
    returnBookByTitle(title) {
        const book = this.books[title];
        if (!book) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        book.available = true;
        return true;
    }
    rateBook(title, rating) {
        const book = this.books[title];
        if (!book) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        // TODO Ajouter la logique
    }
    getAverageRating(title) {
        const book = this.books[title];
        if (!book) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        // TODO Ajouter la logique
        return 0;
    }
    getMostPopularBook() {
        // TODO  Ajouter la logique
        return { title: '', author: '', available: true };
    }
}
exports.BookCollection = BookCollection;
