import CommentItem from './CommentItem.tsx';
import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppSelector} from '../../../app/hooks.ts';
import {selectComments, selectFetchComments} from '../postsSlice.ts';
import CommentsForm from './CommentsForm.tsx';

const CommentsList = () => {
  const comments = useAppSelector(selectComments);
  const fetchingComments = useAppSelector(selectFetchComments);
  return (
    <>
      <Grid container direction="column" sx={{px: 8}}>
        <Typography variant="h4" sx={{my: 1}}>
          Comments
        </Typography>
        {fetchingComments ?
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress sx={{m: 2, textAlign: 'center'}}/>
          </Box> :
          comments.length === 0
            ?
            <Typography variant="subtitle2" sx={{my: 1}}>
              Not comments yet
            </Typography>
            :
            comments.map((comment) => (
              <CommentItem id={comment.id} newsId={comment.newsId} author={comment.author} text={comment.text}
                           key={comment.id}/>
            ))
        }
        <CommentsForm/>
      </Grid>
    </>
  );
};

export default CommentsList;