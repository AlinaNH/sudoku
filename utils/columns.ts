export const splitGridByColumns = (gridByRows: Subgrid): Subgrid => {
  const result: Subgrid = [];

  for (let i = 0; i < gridByRows.length; i++) {    
    gridByRows[i].forEach((cell, index) => {
      if (!result[index]) result[index] = ([cell]);
      else result[index].push(cell)
    })
  }

  return result;
};

export const getHighlightedColumn = (
  gridByColumn: Subgrid,
  activeCell: Cell,
): Cell[] | null => {
  const columnToHighlight = gridByColumn.find(
    row => row.find(cell => cell.index === activeCell.index)
  );

  if (columnToHighlight) {
    columnToHighlight.forEach(cell => cell.isHighlighted = true);
    return columnToHighlight;
  }

  return null;
};