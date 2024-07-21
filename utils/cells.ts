export const generateEmptyCell = (index: number): Cell => {
  const row = getRowByCellIndex(index);
  const column = getColumnByCellIndex(index);
  const subgrid = getSubgridIndex(row, column);
  return {
    index,
    value: index,
    row,
    column,
    subgrid,
  };
};

const getRowByCellIndex = (index: number): number => {
  return Math.floor(index / GRID_DIMENSION);
};

const getColumnByCellIndex = (index: number): number => {
  return Math.floor(index % GRID_DIMENSION);
};

const getSubgridIndex = (rowIndex: number, columnIndex: number) => {
  const subgridRow = Math.floor(rowIndex / SUBGRID_DIMENSION);
  const subgridColumn = Math.floor(columnIndex / SUBGRID_DIMENSION)
  return subgridRow * SUBGRID_DIMENSION + subgridColumn;
};

export const validateCellValue = (value: any): boolean => NUMPAD.includes(value);