import type { Grid, SubGrid } from "~/components/Grid/types";

const SUBGRID_SIZE = 9;

export const splitGridBySubgrid = (grid: Grid): SubGrid => {
  let result = [];

  for (let i = 0; i < grid.length; i += SUBGRID_SIZE) {
    result.push(grid.slice(i, i + SUBGRID_SIZE));
  }

  console.log(result);
  return result;
};

export const generateGrid = (grid: Grid) => {
  for (let i = 0; i < 81; i++) {
    grid.push({ index: i + 1, value: i + 1 });
  }
  // console.log(grid);
};