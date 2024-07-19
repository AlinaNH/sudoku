export const checkIsGridGenerated = (grid: Grid): boolean => {
  return grid.every((cell, index) => cell.index === index + 1);
};

export const hasLengthEqual = (subgrids: Subgrid, number: number): boolean => {
  return subgrids.every(subgrid => subgrid.length === number);
};

export const isCellsInSubgridCorrect = (subgrids: Subgrid): boolean => {
  return subgrids.every((subgrid, subgridIndex) => subgrid.every(
    (cell, cellIndex) => cell.index === (SUBGRID_SIZE * subgridIndex) + cellIndex + 1
  ));
};

export const isCellsInRowsCorrect = (grid: Grid, rows: Subgrid): boolean => {
  const gridBySubgrids = getGridBySubgridsByRows(rows);
  return gridBySubgrids.flat().every((cell, index) => {
    return cell.index === grid[index].index;
  });
};

const getGridBySubgridsByRows = (rows: Subgrid): Subgrid => {
  const result: Subgrid = [];
  rows.forEach((row, rowIndex) => {
    let subgridRows = getSubgridsRow(row);
    subgridRows.forEach((subgridRow, subgridRowIndex) => {
      const index = subgridRowIndex + getRowIndexOffset(rowIndex);
      if (!result[index]) result[index] = subgridRow;
      else result[index].push(...subgridRow);
    });
  });
  return result;
};

const getSubgridsRow = (row: Cell[]): Subgrid => {
  let result = [];
  for (let i = 0; i < row.length; i += SUBGRID_ROW_SIZE) {
    result.push(row.slice(i, i + SUBGRID_ROW_SIZE));
  }
  return result;
};

const getRowIndexOffset = (index: number): number => {
  return index >= SUBGRID_ROW_SIZE && index < SUBGRID_ROW_SIZE * 2
    ? SUBGRID_ROW_SIZE
    : index >= SUBGRID_ROW_SIZE * 2
      ? SUBGRID_ROW_SIZE * 2
      : 0;
};

export const isCellsInColumnsCorrect = (columns: Subgrid, rows: Subgrid): boolean => {
  const gridByRowsFromGridByColumns = getGridByRowsFromGridByColumns(columns);
  const flatGridByRows = rows.flat();
  return gridByRowsFromGridByColumns.flat().every(
    (cell, index) => cell.index === flatGridByRows[index].index
  );
};

const getGridByRowsFromGridByColumns = (columns: Subgrid): Subgrid => {
  const result: Subgrid = [];
  columns.forEach((column, columnIndex) => {
    column.forEach((cell, cellIndex) => {
      if (columnIndex === 0) result[cellIndex] = [cell];
      else result[cellIndex].push(cell);
    })
  });
  return result;
};

export const getSubgridToHighlight = (subgrids: Subgrid, activeCell: Cell): Cell[] => {
  return subgrids.find(subgrid => {
    return subgrid.find(cell => cell.index === activeCell.index);
  }) as Cell[];
};

export const isCellsHighlighted = (cells: Cell[]): boolean => {
  return cells.every(cell => cell.isHighlighted);
}