export interface IFullNews {
  id: string;
  title: string;
  text: string;
  image: string | null;
  date: string;
}
export type INews = Omit<IFullNews, 'text'>;

export interface IComment {
  id: string;
  newsId: string;
  author: string;
  text: string;
}

