export interface Book {
  id: string;
  title: string;
  authors?: string[];
  categories?: string[];
  averageRating?: number;
  description?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
    };
  publishedDate?: string;
  pageCount?: number;
  publisher?: string;
}
