import { checkWin, findMaxRepeatsCount } from './utils'

test('mustWin', () => {
  expect(checkWin(
    [
      ['x', 'o', null],
      [null, 'x', 'o'],
      [null, null, 'x'],
    ],
    3,
    3,
    [0, 0]
  )).toBe(true);
  expect(checkWin(
    [
      [null, 'x', null, null],
      [null, 'x', 'o', 'o'],
      [null, 'x', 'o', 'o'],
      [null, 'x', 'x', 'o'],
    ],
    4,
    4,
    [1, 1]
  )).toBe(true);
  expect(checkWin(
    [
      [null, 'x', 'x', null, 'o'],
      [null, 'x', 'o', 'o', null],
      [null, 'x', 'o', 'o', null],
      [null, 'o', 'x', 'o', null],
      [null, 'x', 'x', 'x', null],
    ],
    5,
    4,
    [1, 3]
  )).toBe(true);
  expect(checkWin(
    [
      [null, 'x', null, null, 'o'],
      [null, 'x', 'o', null, null],
      [null, 'x', null, 'o', null],
      [null, null, null, 'o', null],
      [null, null, 'x', 'x', null],
    ],
    5,
    3,
    [0, 1]
  )).toBe(true);
  expect(checkWin(
    [
      [null, 'x', null, null, 'o'],
      [null, null, 'o', null, null],
      [null, 'x', null, 'o', null],
      [null, null, 'x', 'o', null],
      [null, null, 'x', 'x', null],
    ],
    5,
    3,
    [2, 1]
  )).toBe(true);
});

test('mustNotWin', () => {
  expect(checkWin(
    [
      [null, 'o', null],
      [null, 'x', 'o'],
      [null, null, 'x'],
    ],
    3,
    3,
    [1, 2]
  )).toBe(false);
  expect(checkWin(
    [
      [null, 'x', null, null, 'o'],
      [null, 'x', 'o', 'o', null],
      [null, 'x', 'o', 'o', null],
      [null, 'o', 'x', 'o', null],
      [null, 'x', 'x', 'o', null],
    ],
    5,
    5,
    [2, 2]
  )).toBe(false);
});

test('numbers count must be correct', () => {
  expect(findMaxRepeatsCount(
    [null, 'x', 'x', 'o', null]
  )).toBe(2);
  expect(findMaxRepeatsCount(
    [null, 'x', 'x', 'x', null]
  )).toBe(3);
  expect(findMaxRepeatsCount(
    ['o', 'x', null, 'o', 'o']
  )).toBe(2);
  expect(findMaxRepeatsCount(
    [null, 'x', 'o', 'x', null]
  )).toBe(1);
});