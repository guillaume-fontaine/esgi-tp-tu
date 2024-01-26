// BookCollection.ts
export class BookCollection {
    private books: { [title: string]: { title: string; author: string } } = {};

    addBook(book: { title: string; author: string }): boolean {
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

    findBookByTitle(title: string): { title: string; author: string } {
        const book = this.books[title];
        if (!book) {
            throw new Error(`Aucun livre avec le titre "${title}" n'a été trouvé dans la collection.`);
        }
        return book;
    }

    findBooksByAuthor(author: string): { title: string; author: string }[] {
        const result: { title: string; author: string }[] = [];
        for (const title in this.books) {
            if (this.books[title].author === author) {
                result.push(this.books[title]);
            }
        }
        return result;
    }
}
