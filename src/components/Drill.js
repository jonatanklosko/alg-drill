import React, { useEffect, useReducer } from 'react';
import { LinearProgress, Grid, Tooltip, Typography, Button } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { cubeImageUrl } from '../lib/url';
import { shuffle, millisecondsNow } from '../lib/utils';
import AlgStats from './AlgStats';
import startImg from './start.svg';

function init(algs) {
  return {
    algs, // maybe unnecessary
    startMs: null,
    finishedAlgStats: [],
    remainingAlgs: shuffle(algs)
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, startMs: millisecondsNow() };
    case 'step':
      const timeMs = millisecondsNow() - state.startMs;
      const [alg, ...remainingAlgs] = state.remainingAlgs;
      return {
        ...state,
        finishedAlgStats: [...state.finishedAlgStats, { alg, timeMs }],
        startMs: millisecondsNow(),
        remainingAlgs
      };
    case 'reset':
      return init(action.algs);
    default:
      throw new Error();
  }
}

function Drill({ algs }) {
  const [state, dispatch] = useReducer(reducer, algs, init);

  const progress = Math.round(state.finishedAlgStats.length / state.algs.length * 100);
  const [currentAlg] = state.remainingAlgs;
  const started = state.startMs !== null;
  const finished = state.remainingAlgs.length === 0;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === ' ') {
        event.preventDefault();
        if (!started) {
          dispatch({ type: 'start' });
        } else if (!finished) {
          dispatch({ type: 'step' });
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [started, finished]);

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
      <div style={{ padding: 16 }}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          {!started && (
            <>
              <Grid item>
                <Typography variant="h5">
                  {`Press space to start`}
                </Typography>
              </Grid>
              <Grid item>
                <img src={startImg} alt="start" height="300" />
              </Grid>
            </>
          )}
          {started && !finished && (
            <>
              <Grid item>
                <Typography>
                  {state.finishedAlgStats.length} of {state.algs.length}
                </Typography>
              </Grid>
              <Grid item>
                <img src={cubeImageUrl(currentAlg)} alt="Cube" height="300" />
              </Grid>
              <Grid item>
                <Tooltip
                  title={
                    <Typography variant="subtitle1">{currentAlg}</Typography>
                  }
                >
                  <HelpIcon fontSize="large" />
                </Tooltip>
              </Grid>
            </>
          )}
          {finished && (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  onClick={() => dispatch({ type: 'reset', algs })}
                >
                  Repeat
                </Button>
              </Grid>
              <Grid item>
                <AlgStats algStats={state.finishedAlgStats} />
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default Drill;
