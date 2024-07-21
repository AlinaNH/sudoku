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