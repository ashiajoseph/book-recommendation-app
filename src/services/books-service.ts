import axios from 'axios';
import type { Books } from '../types/books/books';
import type { BookSearchParams } from '../types/books/book-search-params';
import type { GoogleBooksApiModel } from '../api-models/google-books-api-model';
import { mapToBook } from '../api-models/google-books-api-model-mapper';
import type { GoogleBookApiModel } from '../api-models/google-book-api-model';
import type { Book } from '../types/books/book';


export const getBooks = async (params: BookSearchParams): Promise<Books> => {
  try {
    const response = await axios.get<GoogleBooksApiModel>("/volumes", {
      params: {
        q: params.query,
        startIndex: params.startIndex,
        maxResults: 20,
      },
    });

    const books: Books = {
      items: response.data.items?.map(mapToBook) || [],
      totalItems: response.data.totalItems || 0,
    };

    return books;
  } catch (error) {
    console.error('Error occurred while fetching books:', error);
    throw error;
  }
};

export const getBookById = async (bookId: string): Promise<Book> => {
  try {
    const response = await axios.get<GoogleBookApiModel>(`volumes/${bookId}`
    );
    return mapToBook(response.data);
  } catch (error) {
    console.error('Error  occurred while fetching book details:', error);
    throw error;
  }
};
