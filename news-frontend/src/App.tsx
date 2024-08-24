import Layout from './UI/Layout/Layout.tsx';
import {Route, Routes} from 'react-router-dom';
import {Typography} from '@mui/material';
import Posts from './features/posts/Posts.tsx';
import NewPost from './features/posts/NewPost.tsx';
import OnePost from './features/posts/OnePost.tsx';


const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Posts/>} />
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="/posts/:id" element={<OnePost />} />
        <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
      </Routes>
    </Layout>
  )
};

export default App
