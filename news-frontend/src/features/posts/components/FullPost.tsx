import React from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import imageNotFound from '../../../assets/images/image-not-found.png';
import dayjs from 'dayjs';
import {IFullNews} from '../../../types.ts';

interface Props {
  news: IFullNews;
}

const FullPost: React.FC<Props> = ({news}) => {
  return (
    <Card variant="outlined" sx={{m: 2, p: 2}}>
      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid item sm={6} xs={12}>
          <CardMedia
            component="img"
            sx={{width: 300}}
            image={news.image ? news.image : imageNotFound}
            alt="Live from space album cover"
          />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h4">
            {news.title}
          </Typography>
          <Typography sx={{fontSize: 12}} color="text.secondary">
            {dayjs(news.date).format('DD.MM.YYYY HH:mm')}
          </Typography>
        </Grid>
      </Grid>
      <CardContent sx={{width: '100%'}}>
        <Typography sx={{fontSize: 16}} color="text.secondary">
          {news.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FullPost;