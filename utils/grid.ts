export const generateGrid = (): Grid => {
  const result: Grid = [];

  for (let i = 0; i < GRID_SIZE; i++) {
    result.push(generateCell(i));
  }

  return result;
};

export const resetSelection = (grid: Grid) => {
  grid.forEach(cell => {
    cell.isActive = false;
    cell.isHighlighted = false;
  })
}