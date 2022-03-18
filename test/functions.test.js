// const sum = require("../src/jest/functions");

import fun from './demo/functions'

test("sum(2 + 2) 等于 4", () => {
  expect(fun.sum(2, 2)).toBe(4);
});
