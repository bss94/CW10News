import {IComment, IFullNews, INews} from '../../types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchNews, fetchOneNews} from './postThunks.ts';


export interface PostState {
  news: INews[];
  fetchingNews: boolean;
  createNews: boolean;
  deleteNews: string | false;
  oneNews: IFullNews | null;
  fetchOneNews: boolean;
  comments: IComment[];
  fetchingComments: boolean;
  createComment: boolean;
  deleteComment: string | false;
}

const initialState: PostState = {
  news: [],
  fetchingNews: false,
  createNews: false,
  deleteNews: false,
  oneNews: null,
  fetchOneNews: false,
  comments: [],
  fetchingComments: false,
  createComment: false,
  deleteComment: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetOneNews: (state) => {
      state.oneNews = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.fetchingNews = true;
    })
      .addCase(fetchNews.fulfilled, (state, {payload: news}) => {
        state.fetchingNews = false;
        state.news = news;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.fetchingNews = false;
      });
    builder.addCase(fetchOneNews.pending, (state) => {
      state.fetchOneNews = true;
    })
      .addCase(fetchOneNews.fulfilled, (state, {payload: news}) => {
        state.fetchOneNews = false;
        state.oneNews = news;
      })
      .addCase(fetchOneNews.rejected, (state) => {
        state.fetchOneNews = false;
      });
  },
  selectors: {
    selectNews: (state) => state.news,
    selectNewsFetching: (state) => state.fetchingNews,
    selectCreateNews: (state) => state.createNews,
    selectDeleteNews: (state) => state.deleteNews,
    selectOneNews: (state) => state.oneNews,
    selectFetchOne: (state) => state.fetchOneNews,
    selectComments: (state) => state.comments,
    selectFetchComments: (state) => state.fetchingComments,
    selectCreateComments: (state) => state.createComment,
    selectDeleteComments: (state) => state.deleteComment,
  }
});
export const postsReducers = postsSlice.reducer;

export const {resetOneNews} = postsSlice.actions;

export const {
  selectNews,
  selectNewsFetching,
  selectCreateNews,
  selectDeleteNews,
  selectOneNews,
  selectFetchOne,
  selectComments,
  selectFetchComments,
  selectCreateComments,
  selectDeleteComments,
} = postsSlice.selectors;