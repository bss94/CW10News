import React, {useState} from 'react';
import {NewsMutation} from '../../../types.ts';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {Grid, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import FileInput from '../../../UI/FileInput/FileInput.tsx';
import {selectCreateNews} from '../postsSlice.ts';
import {createNews} from '../postThunks.ts';
import {toast} from 'react-toastify';

const PostForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sending = useAppSelector(selectCreateNews);
  const [state, setState] = useState<NewsMutation>({
    title: '',
    text: '',
    image: null,
  });
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createNews({...state}));
      navigate('/');
      toast.success('News successfully created!');
    } catch (e) {
      toast.error('Error creating news');
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid item>
        <TextField
          required
          fullWidth
          label="Title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}/>
      </Grid>
      <Grid item>
        <TextField
          required
          fullWidth
          multiline
          minRows={3}
          label="Text"
          id="text"
          name="text"
          value={state.text}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler}/>
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

export default PostForm;