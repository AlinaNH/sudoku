export type Cell = {
  index: number,
  value: number,
  subgrid: number,
  row: number,
  column: number,
};

export type SudokuStore = {
  grid: Cell[],
  activeCell: Cell | null,
};

export enum GridSegments {
  row = 'row',
  column = 'column',
  subgrid = 'subgrid',
};