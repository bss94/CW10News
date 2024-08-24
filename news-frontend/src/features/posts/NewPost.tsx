import {Grid, Typography} from '@mui/material';
import PostForm from './components/PostForm.tsx';

const NewPost = () => {
  return (

    <Grid container spacing={2} direction="column">
      <Typography variant="h4" sx={{my: 3}}>
        Add new post
      </Typography>

      <PostForm/>

    </Grid>

  );
};

export default NewPost;