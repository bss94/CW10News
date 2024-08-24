import express from 'express';
import fileDb from '../fileDb';
import {CommentWithoutId} from '../types';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
  const queryNewsId = req.query.news_id as string;
  const comments = await fileDb.getComments();
  if(!queryNewsId){
    return res.send(comments);
  }else{
    return res.send(comments.filter(comment => comment.newsId === queryNewsId));
  }
});

commentsRouter.post('/', async (req, res) => {
  if (!req.body.newsId || !req.body.text) {
    return res.status(400).send('NewsId and text are required');
  }
  const news = await fileDb.getNews();
  const resNews = news.find(el => el.id === req.body.newsId);
  if(!resNews){
    return res.status(404).send('News with current newsId not found!');
  }else {
    const comment: CommentWithoutId = {
      newsId: req.body.newsId,
      author: req.body.author ? req.body.author : "Anonymous",
      text: req.body.text,

    };
    const savedComment = await fileDb.addComment(comment);
    return res.send(savedComment);
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  const removeResponse = await fileDb.removeItem(req.params.id, 'comments');
  if (!removeResponse) {
    return res.status(404).send('Comment not found.');
  }
  return res.status(200).send('Comment delete successfully.');
});

export default commentsRouter;