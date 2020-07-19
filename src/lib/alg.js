import { sample } from './utils';

const MOVES_REGEXP = /([RLUDFB]w?|[rludfbMSExyz])2?'?/g;

export function stringToMoves(string) {
  return (string && string.replace(/\s+/g, '').match(MOVES_REGEXP)) || [];
}

export function shrink(string) {
  return stringToMoves(string).join('');
}

export function prettify(string) {
  return stringToMoves(string).join(' ');
}

export function parseAlgsText(text) {
  const lines = text.split('\n');
  return lines.map(prettify).filter((alg) => alg);
}

export function randomRotationAndAUF() {
  const rotation = sample(['', 'y', 'y2', "y'"]);
  const auf = sample(['', 'U', 'U2', "U'"]);
  return `${rotation} ${auf}`;
}
