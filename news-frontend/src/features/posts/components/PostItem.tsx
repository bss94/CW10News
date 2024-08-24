import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import dayjs from 'dayjs';
import imageNotFound from '../../../assets/images/image-not-found.png';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {deleteNews, fetchNews} from '../postThunks.ts';
import {selectDeleteNews} from '../postsSlice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import {LoadingButton} from '@mui/lab';
import {API_URL} from '../../../constants.ts';
import {toast} from 'react-toastify';

interface Props {
  id: string;
  title: string;
  date: string;
  image: string | null;
}

const PostItem: React.FC<Props> = ({
  id, title, date, image
}) => {

  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectDeleteNews);

  const setDate = (date: string) => {
    const currentDate = new Date().toISOString();
    if (dayjs(date).format('DD.MM.YYYY') === dayjs(currentDate).format('DD.MM.YYYY')) {
      return 'Today ' + dayjs(date).format('HH:mm');
    } else if (dayjs(date).format('MM.YYYY') === dayjs(currentDate).format('MM.YYYY')
      && (parseFloat(dayjs(currentDate).format('DD')) - parseFloat(dayjs(date).format('DD'))) === 1) {
      return 'Yesterday ' + dayjs(date).format('HH:mm');
    } else if (dayjs(date).format('YYYY') === dayjs(currentDate).format('YYYY')) {
      return dayjs(date).format('DD.MM HH:mm');
    } else return dayjs(date).format('DD.MM.YYYY HH:mm');
  };

  const removeNews = async (id: string) => {
    try {
      await dispatch(deleteNews(id));
      await dispatch(fetchNews());
      toast.success('delete news successfully.');
    } catch (e) {
      toast.error('error cant delete news');
    }
  };

  return (
    <Card variant="outlined" sx={{display: 'flex', mb: 1}}>
      <CardMedia
        component="img"
        sx={{width: 151}}
        image={image ? `${API_URL}/${image}` : imageNotFound}
        alt="News image"
      />
      <CardContent sx={{width: '100%'}}>
        <Typography variant="h6">
          {title}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography sx={{fontSize: 12}} color="text.secondary">
            {setDate(date)}
          </Typography>
          <Typography variant="body2" component="div">
            <NavLink to={`/posts/${id}`}><Button variant="text">Read full post</Button></NavLink>
            <LoadingButton
              loading={fetching === id}
              loadingPosition="center"
              variant="text"
              color="error"
              onClick={() => removeNews(id)}
            >
              <DeleteIcon/>
            </LoadingButton>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostItem;