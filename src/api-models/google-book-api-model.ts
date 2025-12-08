export interface GoogleBookApiModel {
  id: string;
  volumeInfo: {
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
    previewLink: string;
    infoLink: string;
  };
  kind: string;
  etag: string;
}
