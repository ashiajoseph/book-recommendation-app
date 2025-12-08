import type { GoogleBookApiModel } from "./google-book-api-model";

export interface GoogleBooksApiModel {
  items?: GoogleBookApiModel[];
  kind: string;
  totalItems: number;
}
