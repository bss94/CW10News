import React from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectDeleteComments} from '../postsSlice.ts';
import {deleteComment, fetchNewsComments} from '../postThunks.ts';
import {LoadingButton} from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from 'react-toastify';

interface Props {
  author: string;
  text: string;
  id: string;
  newsId: string;
}

const CommentItem: React.FC<Props> = ({newsId, author, text, id}) => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectDeleteComments);

  const removeComment = async (id: string) => {
    try {
      await dispatch(deleteComment(id));
      await dispatch(fetchNewsComments(newsId));
      toast.success('delete comment successfully.');
    } catch (e) {
      toast.error('error cant delete comment');
    }

  };

  return (
    <Card variant="outlined" sx={{mb: 1}}>
      <CardContent sx={{width: '100%'}}>
        <Typography variant="h6">
          {author}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography sx={{fontSize: 12}} color="text.secondary">
            {text}
          </Typography>
          <Typography variant="body2" component="div">
            <LoadingButton
              loading={fetching === id}
              loadingPosition="center"
              variant="outlined"
              color="error"
              onClick={() => removeComment(id)}
            >
              <DeleteIcon/>
            </LoadingButton>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommentItem;