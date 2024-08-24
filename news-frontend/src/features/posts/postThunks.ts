import {createAsyncThunk} from '@reduxjs/toolkit';
import {CommentMutation, IComment, IFullNews, INews, NewsMutation} from '../../types.ts';
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

export const deleteComment = createAsyncThunk<void,string>(
  'posts/deleteComment',
  async (id)=>{
    await axiosApi.delete(`/comments/${id}`);
  }
)

export const deleteNews = createAsyncThunk<void,string>(
  'posts/deleteNews',
  async (id)=>{
    await axiosApi.delete(`/news/${id}`);
  }
)

export const createComment = createAsyncThunk<void,CommentMutation>(
  'posts/createComment',
  async (comment)=>{
    await axiosApi.post('/comments',comment);
  }
)

export const createNews = createAsyncThunk<void,NewsMutation>(
  'posts/createNews',
  async (news)=>{
    const formData = new FormData();
    formData.append('title', news.title);
    formData.append('text', news.text);
    if(news.image){
      formData.append('image', news.image);
    }
    await axiosApi.post('/news',formData)
  }
)