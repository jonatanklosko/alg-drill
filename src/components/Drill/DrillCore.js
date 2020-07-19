import React, { useReducer, useCallback } from 'react';
import { shuffle, millisecondsNow } from '../../lib/utils';
import FinishView from './FinishView';
import StartView from './StartView';
import StepView from './StepView';

function init(algs) {
  return {
    algs, // maybe unnecessary
    startMs: null,
    finishedAlgStats: [],
    remainingAlgs: shuffle(algs),
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
      };
    case 'reset':
      return init(action.algs);
    default:
      throw new Error();
  }
}

function DrillCore({ drill }) {
  const [state, dispatch] = useReducer(reducer, drill.algs, init);

  const started = state.startMs !== null;
  const finished = state.remainingAlgs.length === 0;

  const handleStart = useCallback(() => {
    dispatch({ type: 'start' });
  }, []);
  const handleNext = useCallback(() => {
    dispatch({ type: 'next' });
  }, []);
  const handleReset = useCallback(() => {
    dispatch({ type: 'reset', algs: drill.algs });
  }, [drill.algs]);

  return (
    <div style={{ padding: 16, position: 'relative' }}>
      {!started && <StartView onStart={handleStart} />}
      {started && !finished && (
        <StepView
          finishedCount={state.finishedAlgStats.length}
          totalCount={state.algs.length}
          currentAlg={state.remainingAlgs[0]}
          onNext={handleNext}
        />
      )}
      {finished && (
        <FinishView algStats={state.finishedAlgStats} onReset={handleReset} />
      )}
    </div>
  );
}

export default DrillCore;
