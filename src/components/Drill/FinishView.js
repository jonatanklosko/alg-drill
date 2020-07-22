import React from 'react';
import { Grid, Button, Tooltip } from '@material-ui/core';
import AlgStats from './AlgStats';
import { mean } from '../../lib/utils';

function FinishView({ onRepeatAlgs, algStats, CubeImageProps }) {
  const algs = algStats.map(({ alg }) => alg);

  const timesMs = algStats.map(({ timeMs }) => timeMs);
  const meanTimeMs = mean(timesMs);
  const slowestAlgs = algStats
    .filter(({ timeMs }) => timeMs > meanTimeMs)
    .map(({ alg }) => alg);

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item container spacing={1} justify="center">
        <Grid item>
          <Tooltip title="Repeat cases slower than the mean time.">
            <Button
              onClick={() => onRepeatAlgs(slowestAlgs)}
              disabled={slowestAlgs.length === 0}
            >
              Repeat slowest
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onRepeatAlgs(algs)}
          >
            Repeat
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <AlgStats algStats={algStats} CubeImageProps={CubeImageProps} />
      </Grid>
    </Grid>
  );
}

export default FinishView;
