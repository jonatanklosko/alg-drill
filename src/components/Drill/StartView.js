import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import startImg from './start.svg';

function StartView({ onStart }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === ' ') {
        event.preventDefault();
        onStart();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h5">{`Press space to start`}</Typography>
      </Grid>
      <Grid item>
        <img src={startImg} alt="start" height="300" />
      </Grid>
      <Grid item container spacing={2} justify="center">
        <Grid item>
          <Typography variant="caption">
            <span style={{ fontWeight: 500 }}>Space</span>
            {` - next`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            <span style={{ fontWeight: 500 }}>h</span>
            {` - show alg`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            <span style={{ fontWeight: 500 }}>Right/Left</span>
            {` - rotate`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StartView;
