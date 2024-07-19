export type Cell = {
  index: number,
  value: number,
  isActive: boolean,
  isHighlighted: boolean,
};

export type Subgrid = Cell[][];

export type Grid = Cell[];

export type SudokuStore = {
  grid: Grid,
  gridBySubgrids: Subgrid,
  gridByRows: Subgrid,
  gridByColumns: Subgrid,
  activeCell: Cell | null,
  highlightedSubgrid: Cell[] | null,
  highlightedRow: Cell[] | null,
  highlightedColumn: Cell[] | null,
};