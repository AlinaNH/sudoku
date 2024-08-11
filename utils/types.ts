import type { Store } from 'pinia';

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
  errors: number,
  isWin: boolean,
  isLose: boolean,
  isRetry: boolean,
};

export enum GridSegments {
  row = 'row',
  column = 'column',
  subgrid = 'subgrid',
};

export type SudokuPiniaStore = Store<"sudoku", SudokuStore, {}, {
  startGame(): void;
  setActiveCell(index: number): void;
  setCellValue(value: number): void;
  incrementErrors(): void;
  tryAgain(): void;
}>