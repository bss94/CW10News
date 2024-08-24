import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {resetOneNews, selectFetchOne, selectOneNews} from './postsSlice.ts';
import {useEffect} from 'react';
import {fetchNewsComments, fetchOneNews} from './postThunks.ts';
import {useParams} from 'react-router-dom';
import FullPost from './components/FullPost.tsx';
import CommentsList from './comments/CommentsList.tsx';


const OnePost = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const fetching = useAppSelector(selectFetchOne);
  const news = useAppSelector(selectOneNews);

  useEffect(() => {
    dispatch(resetOneNews());
    if (id) {
      dispatch(fetchOneNews(id));
      dispatch(fetchNewsComments(id));
    }
  }, [dispatch]);
  return (
    <>
      <Grid container spacing={2} direction="column">
        {fetching &&
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress sx={{m: 2, textAlign: 'center'}}/>
          </Box>}
        {news && <>
          <FullPost news={news}/>
          <CommentsList/>
        </>}
        {!news && !fetching &&
          <Typography variant="h4" sx={{my: 3}}>
            News not found!
          </Typography>
        }
      </Grid>
    </>
  );
};

export default OnePost;