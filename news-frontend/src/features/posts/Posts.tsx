import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import PostItem from './components/PostItem.tsx';
import {selectNews, selectNewsFetching} from './postsSlice.ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useEffect} from 'react';
import {fetchNews} from './postThunks.ts';


const Posts = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectNewsFetching);
  const news = useAppSelector(selectNews);

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" sx={{my: 3}}>
        All posts
      </Typography>
      <Grid container spacing={2} direction="column">
        {fetching ?
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress sx={{m: 2, textAlign: 'center'}}/>
          </Box>
          : news.map(el=>(
            <PostItem title={el.title} image={el.image} date={el.date} id={el.id} key={el.id}/>
          ))}
      </Grid>
    </>
  );
};

export default Posts;