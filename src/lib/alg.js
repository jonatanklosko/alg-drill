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

export function invert(string) {
  return stringToMoves(string).map(invertMove).reverse().join(' ');
}

function invertMove(move) {
  if (move.match(/(2|')$/)) {
    return move.replace("'", '');
  } else {
    return move + "'";
  }
}

const HORIZONTAL_ROTATIONS = ['', 'y', 'y2', "y'"];
const AUFS = ['', 'U', 'U2', "U'"];

export function randomRotationAndAuf(allowedOrientations) {
  const rotation = sample(allowedOrientations) + sample(HORIZONTAL_ROTATIONS);
  const auf = sample(AUFS);
  return `${rotation} ${auf}`;
}

export function addPreRotation(alg, rotation) {
  const [firstMove, ...moves] = stringToMoves(alg);
  const newFirstMove = combineMoves(rotation, firstMove);
  if (newFirstMove) {
    return [newFirstMove, ...moves].join(' ');
  } else {
    return moves.join(' ');
  }
}

export function combineMoves(move1, move2) {
  if (!move1) return move2;
  if (!move2) return move1;
  const [baseMove1, offset1] = decodeMove(move1);
  const [baseMove2, offset2] = decodeMove(move2);
  if (baseMove1 === baseMove2) {
    const offset = (offset1 + offset2) % 4;
    if (offset === 0) {
      return '';
    }
    return encodeMove([baseMove1, offset]);
  } else {
    return `${move1} ${move2}`;
  }
}

function decodeMove(move) {
  const [, baseMove, modifier] = move.match(
    /^([RLUDFB]w?|[rludfbMSExyz])(2?'?)$/
  );
  return [baseMove, moveModifierToOffset(modifier)];
}

function encodeMove([baseMove, offset]) {
  return baseMove + offsetToMoveModifier(offset);
}

function moveModifierToOffset(modifier) {
  switch (modifier) {
    case '':
      return 1;
    case '2':
    case "2'":
      return 2;
    case "'":
      return 3;
    default:
      throw new Error('Invalid move modifier.');
  }
}

function offsetToMoveModifier(offset) {
  switch (offset) {
    case 1:
      return '';
    case 2:
      return '2';
    case 3:
      return "'";
    default:
      throw new Error('Invalid move offset.');
  }
}
