import React, { useEffect } from 'react';
import { Grid, Typography, Tooltip, LinearProgress } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { cubeImageUrl } from '../../lib/url';

function StepView({
  onNext,
  finishedCount,
  totalCount,
  currentAlg,
  rotationAndAUF,
  cubeOptions,
}) {
  const progress = Math.round((finishedCount / totalCount) * 100);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === ' ') {
        event.preventDefault();
        onNext();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNext]);

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={progress}
        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
      />
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography>
            {finishedCount + 1} of {totalCount}
          </Typography>
        </Grid>
        <Grid item>
          <img
            src={cubeImageUrl(currentAlg + rotationAndAUF, cubeOptions)}
            alt="Cube"
            height="300"
          />
        </Grid>
        <Grid item>
          <Tooltip
            title={<Typography variant="subtitle1">{currentAlg}</Typography>}
          >
            <HelpIcon fontSize="large" />
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}

export default StepView;
