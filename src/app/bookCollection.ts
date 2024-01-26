import * as service from './book.service';

export class BookCollection {
    private books: { [title: string]: { title: string; author: string; available: boolean; ratings: number[] } } = {};

    addBook(book: { title: string; author: string; available: boolean; ratings: number[] }): boolean {
        if (this.books[book.title]) {
            throw new Error('Un livre identique existe déjà dans la collection.');
        }
        this.books[book.title] = book;
        return true;
    }

    removeBookByTitle(title: string): boolean {
        if (!this.books[title]) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        delete this.books[title];
        return true;
    }

    findBookByTitle(title: string): { title: string; author: string; available: boolean; ratings: number[] } {
        const book = this.books[title];
        if (!book) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        return book;
    }

    findBooksByAuthor(author: string): { title: string; author: string; available: boolean; ratings: number[] }[] {
        const result: { title: string; author: string; available: boolean; ratings: number[] }[] = [];
        for (const title in this.books) {
            if (this.books[title].author === author) {
                result.push(this.books[title]);
            }
        }
        return result;
    }

    async getAveragePriceByCountry(title: string): Promise<{ country: string; averagePrice: number }> {
        try {
            return await service.fetchDataPrice(title);
        } catch (error) {
            throw new Error('Erreur lors de la récupération du prix moyen par pays.');
        }
    }

    borrowBookByTitle(title: string): boolean {
        const book = this.books[title];
        if (!book || !book.available) {
            throw new Error(`Le livre avec le titre "${title}" n'est pas disponible pour l'emprunt.`);
        }
        book.available = false;
        return true;
    }

    returnBookByTitle(title: string): boolean {
        const book = this.books[title];
        if (!book) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        book.available = true;
        return true;
    }

    rateBook(title: string, rating: number): void {
        const book = this.books[title];
        if (!book) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        // TODO Ajouter la logique
    }

    getAverageRating(title: string): number {
        const book = this.books[title];
        if (!book) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        // TODO Ajouter la logique
        return 0;
    }

    getMostPopularBook(): { title: string; author: string; available: boolean } {
        // TODO  Ajouter la logique
        return { title: '', author: '', available: true };
    }
}
