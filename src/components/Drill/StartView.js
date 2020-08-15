import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import startImg from './start.svg';
import { useEventListener } from '../../hooks/useEventListener';

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '100%',
  },
  keybinding: {
    fontWeight: 500,
  },
}));

function StartView({ onStart }) {
  const classes = useStyles();

  useEventListener('keydown', (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      onStart();
    }
  });

  useEventListener('touchend', (event) => {
    event.preventDefault();
    onStart();
  });

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h5">{`Press space to start`}</Typography>
      </Grid>
      <Grid item>
        <img
          src={startImg}
          alt="start"
          height="300"
          className={classes.image}
        />
      </Grid>
      <Grid item container spacing={2} justify="center">
        <Grid item>
          <Typography variant="caption">
            <span className={classes.keybinding}>Space</span>
            {` - next`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            <span className={classes.keybinding}>h</span>
            {` - show alg`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            <span className={classes.keybinding}>Right/Left</span>
            {` - rotate`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StartView;
