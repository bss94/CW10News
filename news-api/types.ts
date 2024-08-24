export interface INews{
    id:string;
    title:string;
    text:string;
    image:string|null;
    date:string;
}
export interface IComment{
    id:string;
    newsId:string;
    author:string;
    text:string;
}
export type CommentWithoutId = Omit<IComment, 'id'>;
export type NewsWithId = Omit<INews, 'id'>;
