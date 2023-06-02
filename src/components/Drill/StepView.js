import React, { useRef, useState } from 'react';
import {
  Grid,
  Typography,
  LinearProgress,
  IconButton,
  Box,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import RotateLeftIcon from '@material-ui/icons//RotateLeft';
import RotateRightIcon from '@material-ui/icons//RotateRight';
import CubeImage from '../CubeImage/CubeImage';
import { useEventListener } from '../../hooks/useEventListener';
import { invert } from '../../lib/alg';

function StepView({
  onNext,
  onRotation,
  finishedCount,
  totalCount,
  currentAlg,
  rotationAndAuf,
  CubeImageProps,
}) {
  const touchAreaRef = useRef();
  const [showAlg, setShowAlg] = useState(false);
  const progress = Math.round((finishedCount / totalCount) * 100);

  function handleNext() {
    setShowAlg(false);
    onNext();
  }

  function toggleShowAlg() {
    setShowAlg((show) => !show);
  }

  function rotateRight() {
    onRotation("y'");
  }

  function rotateLeft() {
    onRotation('y');
  }

  useEventListener('keydown', (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      handleNext();
    }
  });

  useEventListener(
    'touchend',
    (event) => {
      event.preventDefault();
      handleNext();
    },
    touchAreaRef.current
  );

  useEventListener('keydown', (event) => {
    if (event.key === 'h') {
      toggleShowAlg();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      rotateRight();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      rotateLeft();
    }
  });

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={progress}
        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        style={{ flexGrow: 1 }}
      >
        <Grid item>
          <Typography>
            {finishedCount + 1} of {totalCount}
          </Typography>
        </Grid>
        <Box display={{ xs: 'flex', md: 'none' }} component={Grid} item>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <IconButton onClick={rotateLeft}>
                <RotateLeftIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={toggleShowAlg}>
                <HelpIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={rotateRight}>
                <RotateRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          spacing={2}
          style={{ flexGrow: 1 }}
          ref={touchAreaRef}
        >
          <Grid item>
            <CubeImage
              apply={rotationAndAuf + invert(currentAlg)}
              size={300}
              {...CubeImageProps}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              style={{ visibility: showAlg ? 'visible' : 'hidden' }}
            >
              {currentAlg}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default StepView;
