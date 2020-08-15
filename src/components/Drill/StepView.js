import React, { useState } from 'react';
import { Grid, Typography, LinearProgress } from '@material-ui/core';
import CubeImage from '../CubeImage/CubeImage';
import { useEventListener } from '../../hooks/useEventListener';

function StepView({
  onNext,
  onRotation,
  finishedCount,
  totalCount,
  currentAlg,
  aufAndRotation,
  CubeImageProps,
}) {
  const [showAlg, setShowAlg] = useState(false);
  const progress = Math.round((finishedCount / totalCount) * 100);

  function handleNext() {
    setShowAlg(false);
    onNext();
  }

  useEventListener('keydown', (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      handleNext();
    }
  });

  useEventListener('touchend', (event) => {
    event.preventDefault();
    handleNext();
  });

  useEventListener('keydown', (event) => {
    if (event.key === 'h') {
      setShowAlg((show) => !show);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      onRotation("y'");
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onRotation('y');
    }
  });

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
          <CubeImage
            alg={currentAlg + aufAndRotation}
            size={300}
            {...CubeImageProps}
          />
        </Grid>
        <Grid item>
          {showAlg && <Typography variant="subtitle1">{currentAlg}</Typography>}
        </Grid>
      </Grid>
    </>
  );
}

export default StepView;
