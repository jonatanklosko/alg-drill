import React, { useEffect, useState } from 'react';
import { Grid, Typography, LinearProgress } from '@material-ui/core';
import CubeImage from '../CubeImage/CubeImage';

function StepView({
  onNext,
  finishedCount,
  totalCount,
  currentAlg,
  aufAndRotation,
  CubeImageProps,
}) {
  const [showAlg, setShowAlg] = useState(false);
  const progress = Math.round((finishedCount / totalCount) * 100);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === ' ') {
        event.preventDefault();
        onNext();
        setShowAlg(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNext]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'h') {
        setShowAlg((show) => !show);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
