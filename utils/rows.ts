export const splitGridByRows = (grid: Grid): Subgrid => {
  const result: Subgrid = [];
  const gridBySubgridsRows = splitGridBySubgridRows(grid);

  let lastRowInLastSubgridInLine = 3;
  let lastSubgridInLine = 3;
  let secondRow = 0;
  let thirdRow = 0;

  for (let i = 0; i < gridBySubgridsRows.length; i++) {
    const current = gridBySubgridsRows[i];
    const isThreeRowsFilled = thirdRow === lastSubgridInLine;

    if (isThreeRowsFilled) {
      lastSubgridInLine += SUBGRIDS_NUMBER_IN_LINE;
      lastRowInLastSubgridInLine += SUBGRIDS_NUMBER_IN_LINE * 3;
    }

    const isFistSubgridNotFilled = i < lastRowInLastSubgridInLine;
    const isSecondSubgridNotFilled = secondRow < lastSubgridInLine;
    const isThirdSubgridNotFilled = thirdRow < lastSubgridInLine;

    if (isFistSubgridNotFilled) {
      result.push(current);
    } else {
      if (isSecondSubgridNotFilled) {
        result[secondRow].push(...current);
        secondRow += 1;
      } else {
        if (isThirdSubgridNotFilled) {
          result[thirdRow].push(...current);
          thirdRow += 1;
        }
      }
    }
  }

  return result;
};

export const getHighlightedRow = (
  gridByRows: Subgrid,
  activeCell: Cell,
): Subgrid | null => {
  const rowToHighlight = gridByRows.find(
    row => row.find(cell => cell.index === activeCell.index)
  );

  if (rowToHighlight) {
    rowToHighlight.forEach(cell => cell.isHighlighted = true);
    return rowToHighlight as unknown as Subgrid;
  }

  return null;
};