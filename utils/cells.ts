export const generateCell = (index: number): Cell => ({
  index: index + 1,
  value: index + 1,
  isActive: false,
  isHighlighted: false,
});

export const getActiveCell = (grid: Grid, activeCell: Cell): Cell | null => {
  const cell = grid.find(cell => cell.index === activeCell.index);
  if (cell) {
    cell.isActive = true;
    return cell;
  }
  return null;
};