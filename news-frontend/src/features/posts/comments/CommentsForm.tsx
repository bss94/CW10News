import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectCreateComments, selectOneNews} from '../postsSlice.ts';
import React, {useState} from 'react';
import {CommentMutation} from '../../../types.ts';
import {Grid, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {createComment, fetchNewsComments} from '../postThunks.ts';
import {toast} from 'react-toastify';

const initialState: CommentMutation = {
  author: '',
  text: '',
  newsId: '',
};

const CommentsForm = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectOneNews);
  const newsId = news?.id;
  const sending = useAppSelector(selectCreateComments);
  const [state, setState] = useState<CommentMutation>(initialState);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(newsId);
    if (newsId) {
      try {
        const newComment: CommentMutation = {
          ...state,
          newsId: newsId
        };
        await dispatch(createComment(newComment));
        await dispatch(fetchNewsComments(newsId));
        setState(initialState);
        toast.success('Comment successfully created!');
      } catch (e) {
        toast.error('Error creating comment');
      }
    }
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid item>
        <TextField
          label="Author"
          id="author"
          name="author"
          fullWidth
          value={state.author}
          onChange={inputChangeHandler}/>
      </Grid>
      <Grid item>
        <TextField
          required
          multiline
          minRows={3}
          label="Text"
          id="text"
          name="text"
          fullWidth
          value={state.text}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          loading={sending}
          loadingPosition="center"
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CommentsForm;