export const splitGridBySubgrid = (grid: Grid): Subgrid => {
  const result: Subgrid = [];

  for (let i = 0; i < grid.length; i += SUBGRID_SIZE) {
    result.push(grid.slice(i, i + SUBGRID_SIZE));
  }

  return result;
};

export const splitGridBySubgridRows = (grid: Grid): Subgrid => {
  let result: Subgrid = [];

  for (let i = 0; i < grid.length; i += SUBGRID_ROW_SIZE) {
    result.push(grid.slice(i, i + SUBGRID_ROW_SIZE));
  }

  return result;
};

export const getHighlightedSubgrid = (
  gridBySubgrids: Subgrid,
  activeCell: Cell,
): Subgrid | null => {
  const gridToHighlight = gridBySubgrids.find(
    subgrid => subgrid.find(cell => cell.index === activeCell.index)
  );

  if (gridToHighlight) {
    gridToHighlight.forEach(cell => cell.isHighlighted = true);
    return gridToHighlight as unknown as Subgrid;
  }

  return null;
};