import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { cubeImageUrl } from '../lib/url';
import { millisecondsToClockFormat } from '../lib/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  cubeImage: {
    minHeight: 150,
    minWidth: 150,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
  },
}));

function AlgStat({ algStat }) {
  const classes = useStyles();
  const { alg, timeMs } = algStat;
  const imageUrl = cubeImageUrl(alg);

  return (
    <Card className={classes.root}>
      {imageUrl && <CardMedia className={classes.cubeImage} image={imageUrl} />}
      <div className={classes.contentWrapper}>
        <CardContent className={classes.content}>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <Typography variant="subtitle2">
                {millisecondsToClockFormat(timeMs)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {alg}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
}

export default AlgStat;
