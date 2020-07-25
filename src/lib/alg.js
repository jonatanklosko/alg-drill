import { sample } from './utils';

const MOVES_REGEXP = /([RLUDFB]w?|[rludfbMSExyz])2?'?/g;

export function stringToMoves(string) {
  if (!string) return [];
  const preformatted = string
    .replace(/\s+/g, '')
    .replace(/`/g, "'")
    .replace(/[XYZ]/g, (rotation) => rotation.toLowerCase());
  return preformatted.match(MOVES_REGEXP) || [];
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

const ALL_ROTATIONS = [
  '',
  'y',
  'y2',
  "y'",
  'z2',
  'z2 y',
  'z2 y2',
  "z2 y'",
  'z',
  'z y',
  'z y2',
  "z y'",
  "z'",
  "z' y",
  "z' y2",
  "z' y'",
  'x',
  'x y',
  'x y2',
  "x y'",
  "x'",
  "x' y",
  "x' y2",
  "x' y'",
];

const YELLOW_ROTATIONS = ['', 'y', 'y2', "y'"];

export function randomAufAndRotation(colorNeutral) {
  const rotation = sample(colorNeutral ? ALL_ROTATIONS : YELLOW_ROTATIONS);
  const auf = sample(['', 'U', 'U2', "U'"]);
  return `${auf} ${rotation}`;
}
