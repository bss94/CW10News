export interface INews {
  id: string;
  title: string;
  text: string;
  image: string | null;
  date: string;
}

export interface IComment {
  id: string;
  newsId: string;
  author: string;
  text: string;
}

export type CommentWithoutId = Omit<IComment, 'id'>;
export type NewsWithoutId = Omit<INews, 'id'>;

export interface IDataBase {
  news: INews[],
  comments: IComment[],
}