export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  SPACE: 32,
  Q: 81,
};

export const COLORS = [
  "cyan",
  "blue",
  "orange",
  "yellow",
  "green",
  "purple",
  "red",
];

export const SHAPES = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  [
    [4, 4],
    [4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
];

export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};

export const LINES_PER_LEVEL = 10;
export const LEVEL = {
  1: 1000,
  2: 900,
  3: 790,
  4: 670,
  5: 540,
  6: 400,
  7: 250,
  8: 100,
  9: 50,
  10: 10,
};

export const NUM_OF_HIGH_SCORES = 10;
export const HIGH_SCORES = "highScores";

Object.freeze(LEVEL);
Object.freeze(KEYS);
Object.freeze(COLORS);
Object.freeze(SHAPES);
Object.freeze(POINTS);
