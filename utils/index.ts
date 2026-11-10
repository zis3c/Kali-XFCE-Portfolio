const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const range = (start: number, end?: number, step = 1): number[] => {
  const output: number[] = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export { random, range };
