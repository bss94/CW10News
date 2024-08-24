import {IComment, IFullNews, INews} from '../../types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {
  createComment,
  createNews,
  deleteComment,
  deleteNews,
  fetchNews,
  fetchNewsComments,
  fetchOneNews
} from './postThunks.ts';


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
    builder.addCase(fetchNewsComments.pending, (state) => {
      state.fetchingComments = true;
    })
      .addCase(fetchNewsComments.fulfilled, (state, {payload: comments}) => {
        state.fetchingComments = false;
        state.comments = comments;
      })
      .addCase(fetchNewsComments.rejected, (state) => {
        state.fetchingComments = false;
      });
    builder.addCase(deleteComment.pending, (state,{ meta: { arg: commentId } }) => {
      state.deleteComment = commentId;
    })
      .addCase(deleteComment.fulfilled, (state) => {
        state.deleteComment = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteComment = false;
      });
    builder.addCase(deleteNews.pending, (state,{ meta: { arg: newsId } }) => {
      state.deleteNews = newsId;
    })
      .addCase(deleteNews.fulfilled, (state) => {
        state.deleteNews = false;
      })
      .addCase(deleteNews.rejected, (state) => {
        state.deleteNews = false;
      });
    builder.addCase(createComment.pending, (state) => {
      state.createComment = true;
    })
      .addCase(createComment.fulfilled, (state) => {
        state.createComment = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.createComment = false;
      });
    builder.addCase(createNews.pending, (state) => {
      state.createNews = true;
    })
      .addCase(createNews.fulfilled, (state) => {
        state.createNews = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.createNews = false;
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