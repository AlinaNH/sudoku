export const generateGrid = (): Cell[] => {
  const grid = generateEmptyGrid();
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

export const containsCellAtIndex = (grid: Cell[], index: number) => {
  return index >= 0 && index < grid.length && grid[index] !== undefined;
};