import {promises as fs} from 'fs';
import crypto from 'crypto';
import {CommentWithoutId, IComment, IDataBase, INews, NewsWithoutId} from './types';


const filename = './db.json';
let data: IDataBase = {
  news: [],
  comments: []
};

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = {
        news: [],
        comments: [],
      };
    }
  },
  async getItems(target:'news'|'comments') {
      return data[target];
  },
  async addNews(item: NewsWithoutId) {
    const id = crypto.randomUUID();
    const newItem: INews = {id, ...item};
    data.news.push(newItem);
    await this.save();
    return newItem;
  },
  async addComment(item: CommentWithoutId) {
    const id = crypto.randomUUID();
    const newItem: IComment = {id, ...item};
    data.comments.push(newItem);
    await this.save();
    return newItem;
  },

  async removeItem(id:string,target:'news'|'comments') {
    let remove = false;
    if (target == 'comments') {
    const index = data.comments.findIndex(el=>el.id === id);
    if (index > -1) {
      data.comments.splice(index, 1);
      remove = true;
    }
    }else {
      const index = data.news.findIndex(el=>el.id === id);
      if (index > -1) {
        data.comments = data.comments.filter(el => el.newsId !== id);
        data.news.splice(index, 1);
        remove = true;
      }
    }
    if(remove){
      await this.save();
    }
    return remove;
  },

  async save() {
    return fs.writeFile(filename, JSON.stringify(data, null, 2));
  }
};

export default fileDb;