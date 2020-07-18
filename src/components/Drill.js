import React, { useState, useEffect } from 'react';
import { LinearProgress, Grid } from '@material-ui/core';
import { cubeImageUrl } from '../lib/url';
import { shuffle } from '../lib/utils';

function Drill({ algs }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const progress = Math.round(currentIndex / algs.length * 100);
  const currentAlg = algs[currentIndex];

  function handleKeyDown(event) {
    if (event.key === ' ') {
      setCurrentIndex(currentIndex => currentIndex + 1);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
      <Grid container justify="center">
        <Grid item>
          <img src={cubeImageUrl(currentAlg)} alt="Cube" height="300" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Drill;
