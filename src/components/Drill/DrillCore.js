import React, { useReducer, useCallback } from 'react';
import { shuffle, millisecondsNow } from '../../lib/utils';
import FinishView from './FinishView';
import StartView from './StartView';
import StepView from './StepView';
import { randomAufAndRotation } from '../../lib/alg';

function init({ algs, colorNeutral }) {
  return {
    startMs: null,
    finishedAlgStats: [],
    remainingAlgs: shuffle(algs),
    aufAndRotation: randomAufAndRotation(colorNeutral),
    colorNeutral,
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
        aufAndRotation: randomAufAndRotation(state.colorNeutral),
      };
    case 'reset':
      return init({ algs: action.algs, colorNeutral: state.colorNeutral });
    default:
      throw new Error();
  }
}

function DrillCore({ drill }) {
  const [state, dispatch] = useReducer(
    reducer,
    { algs: drill.algs, colorNeutral: drill.colorNeutral },
    init
  );
  const CubeImageProps = { planView: drill.planView, mask: drill.mask };

  const started = state.startMs !== null;
  const finished = state.remainingAlgs.length === 0;

  const handleStart = useCallback(() => {
    dispatch({ type: 'start' });
  }, []);

  const handleNext = useCallback(() => {
    dispatch({ type: 'next' });
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
          currentAlg={state.remainingAlgs[0]}
          aufAndRotation={state.aufAndRotation}
          CubeImageProps={CubeImageProps}
          onNext={handleNext}
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
