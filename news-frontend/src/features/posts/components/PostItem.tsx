import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import dayjs from 'dayjs';
import imageNotFound from '../../../assets/images/image-not-found.png'
import {NavLink} from 'react-router-dom';

interface Props {
  id:string;
  title:string;
  date:string;
  image:string|null;
}

const PostItem:React.FC<Props> = ({
  id,title,date,image
}) => {
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
  return (
    <Card variant="outlined" sx={{ display: 'flex' , mb:1 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={image?image:imageNotFound}
        alt="Live from space album cover"
      />
      <CardContent sx={{width:"100%"}}>
        <Typography variant="h6">
          {title}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography sx={{fontSize: 12}} color="text.secondary">
            {setDate(date)}
          </Typography>
          <Typography variant="body2" component="div">
           <NavLink to={`/posts/${id}`}><Button variant="text">Read full post</Button></NavLink>
            <Button variant="text">delete</Button>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostItem;