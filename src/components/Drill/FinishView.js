import React from 'react';
import { Grid, Button } from '@material-ui/core';
import AlgStats from './AlgStats';

function FinishView({ onReset, algStats }) {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          onClick={onReset}
        >
          Repeat
        </Button>
      </Grid>
      <Grid item>
        <AlgStats algStats={algStats} />
      </Grid>
    </Grid>
  );
}

export default FinishView;
