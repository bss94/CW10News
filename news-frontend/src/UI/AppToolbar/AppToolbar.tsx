import {AppBar, Button, styled, Toolbar, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <StyledLink to="/">NewsPapers</StyledLink>
        </Typography>
        <Typography variant="subtitle1" component="div" >
          <StyledLink to="/posts/new"><Button color="inherit">New post</Button></StyledLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
