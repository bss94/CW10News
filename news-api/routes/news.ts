import express from 'express';
import fileDb from '../fileDb';
import {NewsWithoutId} from '../types';
import {imagesUpload} from '../multer';

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
  const news = await fileDb.getNews();
  const resNews = news.map(el => ({id: el.id, title: el.title}));
  return res.send(resNews);
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.text) {
    return res.status(400).send('Title and text are required');
  }
  const news: NewsWithoutId = {
    title: req.body.title,
    text: req.body.text,
    image: req.file ? req.file.filename : null,
    date: new Date().toISOString(),
  };
  const savedNews = await fileDb.addNews(news);
  return res.send(savedNews);
});

newsRouter.get('/:id', async (req, res) => {
  const news = await fileDb.getNews();
  const resNews = news.find(el => el.id === req.params.id);
  if (!resNews) {
    return res.status(404).send('News not found.');
  } else {
    return res.status(200).send(resNews);
  }
});

newsRouter.delete('/:id', async (req, res) => {
  const removeResponse = await fileDb.removeItem(req.params.id, 'news');
  if (!removeResponse) {
    return res.status(404).send('News not found.');
  }
  return res.status(200).send('News delete successfully.');
});


export default newsRouter;