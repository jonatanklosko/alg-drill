import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import AlgStat from './AlgStat';
import { mean, millisecondsToClockFormat, sum } from '../lib/utils';

function AlgStats({ algStats }) {
  const sortedAlgStats = algStats.sort((x, y) => y.timeMs - x.timeMs);
  const timesMs = algStats.map(({ timeMs }) => timeMs);
  const meanTimeMs = mean(timesMs);
  const totalTimeMs = sum(timesMs);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2}>
        <Grid item>
          <Typography>
            Mean: {millisecondsToClockFormat(meanTimeMs)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            Total: {millisecondsToClockFormat(totalTimeMs)}
          </Typography>
        </Grid>
      </Grid>
      {sortedAlgStats.map(algStat => (
        <Grid item>
          <AlgStat algStat={algStat} />
        </Grid>
      ))}
    </Grid>
  );
}

export default AlgStats;
