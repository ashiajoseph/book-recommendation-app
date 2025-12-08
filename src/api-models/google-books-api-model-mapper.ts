import type { Book } from "../types/books/book";
import type { GoogleBookApiModel } from "./google-book-api-model";

export const mapToBook = (apiModel: GoogleBookApiModel): Book => {
  return {
    id: apiModel.id,
    title : apiModel.volumeInfo.title,
    categories: apiModel.volumeInfo.categories,
    averageRating: apiModel.volumeInfo.averageRating,
    authors: apiModel.volumeInfo.authors,
    description: apiModel.volumeInfo.description,
    imageLinks: apiModel.volumeInfo.imageLinks,
    publishedDate: apiModel.volumeInfo.publishedDate,
    pageCount: apiModel.volumeInfo.pageCount,
    publisher: apiModel.volumeInfo.publisher,
  };
};
