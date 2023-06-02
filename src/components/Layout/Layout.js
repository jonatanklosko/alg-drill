import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography, Grid, Hidden } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    padding: theme.spacing(2),
  },
  heartIcon: {
    verticalAlign: 'middle',
    color: red[700],
  },
  grow: {
    flexGrow: 1,
  },
}));

function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
      <div className={classes.footer}>
        <Grid container spacing={2}>
          <Hidden xsDown>
            <Grid item>
              <Typography variant="body2">
                Made with <FavoriteIcon className={classes.heartIcon} /> by{' '}
                <Link
                  className={classes.link}
                  href="https://github.com/jonatanklosko"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jonatan Kłosko
                </Link>
              </Typography>
            </Grid>
          </Hidden>
          <Grid item className={classes.grow} />
          <Grid item>
            <Link component={RouterLink} to="/">
              Home
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/about">
              What?
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Layout;
