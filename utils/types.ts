export type Cell = {
  index: number,
  value: number | null,
  subgrid: number,
  row: number,
  column: number,
  correctValue: number,
  isVariable: boolean,
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