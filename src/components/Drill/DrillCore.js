import React, { useReducer, useCallback } from 'react';
import { shuffle, millisecondsNow, sample } from '../../lib/utils';
import FinishView from './FinishView';
import StartView from './StartView';
import StepView from './StepView';
import {
  randomRotationAndAuf,
  addPreRotation,
  combineMoves,
} from '../../lib/alg';

function init({ drill, algs }) {
  return {
    drill,
    startMs: null,
    finishedAlgStats: [],
    remainingAlgs: shuffle(algs),
    angle: sample(drill.angles),
    rotationAndAuf: randomRotationAndAuf(drill.allowedOrientations),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, startMs: millisecondsNow() };
    case 'next':
      const timeMs = millisecondsNow() - state.startMs;
      const [alg, ...remainingAlgs] = state.remainingAlgs;
      return {
        ...state,
        finishedAlgStats: [...state.finishedAlgStats, { alg, timeMs }],
        startMs: millisecondsNow(),
        remainingAlgs,
        angle: sample(state.drill.angles),
        rotationAndAuf: randomRotationAndAuf(state.drill.allowedOrientations),
      };
    case 'reset':
      return init({ algs: action.algs, drill: state.drill });
    case 'rotation':
      const angle = combineMoves(state.angle, action.rotation);
      return { ...state, angle };
    default:
      throw new Error();
  }
}

function DrillCore({ drill }) {
  const [state, dispatch] = useReducer(
    reducer,
    { drill, algs: drill.algs },
    init
  );
  const CubeImageProps = {
    planView: drill.planView,
    mask: drill.mask,
    lefty: drill.lefty,
  };

  const started = state.startMs !== null;
  const finished = state.remainingAlgs.length === 0;

  const handleStart = useCallback(() => {
    dispatch({ type: 'start' });
  }, []);

  const handleNext = useCallback(() => {
    dispatch({ type: 'next' });
  }, []);

  const handleRotation = useCallback((rotation) => {
    dispatch({ type: 'rotation', rotation });
  }, []);

  const handleRepeatAlgs = useCallback((algs) => {
    dispatch({ type: 'reset', algs });
  }, []);

  return (
    <div style={{ padding: 16, position: 'relative' }}>
      {!started && <StartView onStart={handleStart} />}
      {started && !finished && (
        <StepView
          finishedCount={state.finishedAlgStats.length}
          totalCount={
            state.finishedAlgStats.length + state.remainingAlgs.length
          }
          currentAlg={addPreRotation(state.remainingAlgs[0], state.angle)}
          rotationAndAuf={state.rotationAndAuf}
          CubeImageProps={CubeImageProps}
          onNext={handleNext}
          onRotation={handleRotation}
        />
      )}
      {finished && (
        <FinishView
          algStats={state.finishedAlgStats}
          onRepeatAlgs={handleRepeatAlgs}
          CubeImageProps={CubeImageProps}
        />
      )}
    </div>
  );
}

export default DrillCore;
