import {createAsyncThunk} from '@reduxjs/toolkit';
import {IComment, IFullNews, INews} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';


export const fetchNews = createAsyncThunk<INews[]>(
  'posts/fetchNews',
  async ()=>{
    const {data: posts} = await axiosApi.get<INews[]>('/news');
    return posts;
  }
);
export const fetchOneNews = createAsyncThunk<IFullNews,string>(
  'posts/fetchOneNews',
  async (id)=>{
    const {data: post} = await axiosApi.get<IFullNews>(`/news/${id}`);
    return post;
  }
);
export const fetchNewsComments = createAsyncThunk<IComment[],string>(
  'posts/fetchNewsComments',
  async (newsId)=>{
    const {data: comments} = await axiosApi.get<IComment[]>(`/comments?news_id=${newsId}`);
    return comments;
  }
);