export const generateGrid = (): Cell[] => {
  const grid = generateEmptyGrid();
  solveSudokuGrid(grid);
  generateGridWithBlanks(grid, EMPTY_CELL_COUNT);
  return grid;
};

const generateEmptyGrid = (): Cell[] => {
  const result = [];
  for (let index = 0; index < GRID_LENGTH; index++) {
    result.push(generateEmptyCell(index));
  }
  return result;
};

export const groupBySubgrids = (grid: Cell[]): Cell[][] => {
  const result = Array.from({ length: GRID_DIMENSION }, (): Cell[] => []);
  grid.forEach(cell => result[cell.subgrid].push(cell));
  return result;
};

export const containsCellAtIndex = (grid: Cell[], index: number): boolean => {
  return index >= 0 && index < grid.length && grid[index] !== undefined;
};

const solveSudokuGrid = (grid: Cell[]): boolean => {
  for (let i = 0; i < GRID_LENGTH; i++) {
    if (grid[i].value === 0) {
      const values = shuffleValues([...NUMPAD]);
      for (let value of values) {
        if (isisSafeToPlaceValue(grid, grid[i], value)) {
          grid[i].value = value;
          grid[i].correctValue = value;
          if (solveSudokuGrid(grid)) return true;
          grid[i].value = 0;
          grid[i].correctValue = 0;
        }
      }
      return false;
    }
  }
  return true;
};

const shuffleValues = (values: typeof NUMPAD): typeof NUMPAD => {
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
};

const isisSafeToPlaceValue = (grid: Cell[], cell: Cell, value: number): boolean => {
  if (isValueInRow(grid, cell, value)) return false;
  if (isValueInColumn(grid, cell, value)) return false;
  if (isValueInSubgrid(grid, cell, value)) return false;
  return true;
};

const isValueInRow = (grid: Cell[], cell: Cell, value: number): boolean => {
  for (let i = 0; i < GRID_DIMENSION; i++) {
    if (grid[cell.row * GRID_DIMENSION + i].value === value) {
      return true;
    }
  }
  return false;
};

const isValueInColumn = (grid: Cell[], cell: Cell, value: number): boolean => {
  for (let i = 0; i < GRID_DIMENSION; i++) {
    if (grid[i * GRID_DIMENSION + cell.column].value === value) {
      return true;
    }
  }
  return false;
};

const isValueInSubgrid = (grid: Cell[], cell: Cell, value: number): boolean => {
  const startRow = Math.floor(cell.row / SUBGRID_DIMENSION) * SUBGRID_DIMENSION;
  const startColumn = Math.floor(cell.column / SUBGRID_DIMENSION) * SUBGRID_DIMENSION;
  for (let i = 0; i < SUBGRID_DIMENSION; i++) {
    for (let j = 0; j < SUBGRID_DIMENSION; j++) {
      if (grid[(startRow + i) * GRID_DIMENSION + (startColumn + j)].value === value) {
        return true;
      }
    }
  }
  return false;
};

const generateGridWithBlanks = (grid: Cell[], emptyCellsCount: number) => {
  const cellIndexes = grid.map(cell => cell.index);
  shuffleValues(cellIndexes);
  for (let i = 0; i < emptyCellsCount; i++) {
    grid[cellIndexes[i]].value = null;
    grid[cellIndexes[i]].isVariable = true;
  }
};

export const isLastValueSet = (grid: Cell[]): boolean => {
  return grid.every(cell => cell.value === cell.correctValue);
};