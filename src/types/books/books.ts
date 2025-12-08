import type { Book } from "./book";

export interface Books {
  items?: Book[];
  totalItems: number;
}
