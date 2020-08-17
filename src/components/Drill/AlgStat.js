import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { millisecondsToClockFormat } from '../../lib/utils';
import CubeImage from '../CubeImage/CubeImage';
import { invert } from '../../lib/alg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
  },
}));

function AlgStat({ algStat, CubeImageProps }) {
  const classes = useStyles();
  const { alg, timeMs } = algStat;

  return (
    <Card className={classes.root}>
      <CubeImage apply={invert(alg)} size={150} {...CubeImageProps} />
      <div className={classes.contentWrapper}>
        <CardContent className={classes.content}>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <Typography variant="subtitle2">
                {millisecondsToClockFormat(timeMs)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{alg}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
}

export default AlgStat;
