// Source: https://www.30secondsofcode.org/js/s/shuffle
export function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

export function millisecondsNow() {
  return Math.round(performance.now());
}

export function millisecondsToClockFormat(milliseconds) {
  return new Date(milliseconds)
    .toISOString()
    .substr(11, 11)
    .replace(/^[0:]*(?!\.)/g, '');
}

export function sum(xs) {
  return xs.reduce((x, y) => x + y, 0);
}

export function mean(xs) {
  return sum(xs) / xs.length;
}
