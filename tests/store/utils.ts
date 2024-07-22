import { getRandomInteger } from '../utils';

export const checkIsCellIndexesCorrect = (grid: Cell[]): boolean => {
  return grid.every((cell, index) => cell.index === index);
};

export const checkIsRowIndexesCorrect = (grid: Cell[]): boolean => {
  return grid.every((cell, index) => cell.row ===  Math.floor(index / GRID_DIMENSION));
};

export const checkIsColumnIndexesCorrect = (grid: Cell[]): boolean => {
  return grid.every((cell, index) => cell.column ===  Math.floor(index % GRID_DIMENSION));
};

export const checkIsSubgridIndexesCorrect = (grid: Cell[]): boolean => {
  return grid.every(cell => {
    const subgridRow = Math.floor(cell.row / SUBGRID_DIMENSION);
    const subgridColumn = Math.floor(cell.column / SUBGRID_DIMENSION);
    return cell.subgrid === subgridRow * SUBGRID_DIMENSION + subgridColumn;
  });
};

export const getRandomVariableCell = (grid: Cell[]): Cell => {
  const variableCells = grid.filter(cell => cell.isVariable);
  const randomIndex = getRandomInteger(0, variableCells.length - 1);
  return variableCells[randomIndex];
};

export const isValuesRepeatedInSegment = (grid: Cell[], segmentType: keyof typeof GridSegments): boolean => {
  const gridBySegments = groupCellsSegments(grid, segmentType);
  return gridBySegments.every(segment => segment.every(
    cell => NUMPAD.filter(value => value === cell.correctValue))
  );
};

export const groupCellsSegments = (
  grid: Cell[],
  segmentType: keyof typeof GridSegments,
): Cell[][] => {
  const result = Array.from({ length: GRID_DIMENSION }, (): Cell[] => []);
  grid.forEach(cell => result[cell[segmentType]].push(cell));
  return result;
};