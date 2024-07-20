import type { DOMWrapper } from "@vue/test-utils";

export const checkIsSubgridHighlighted = (
  subgrid: Cell[],
  cells: DOMWrapper<Element>[]
): boolean => {
  return subgrid.every(highlightedCell => {
    return cells.find(cell => {
      return Number(cell.attributes('data-id')) === highlightedCell.index;
    });
  });
};

export const isGridChanged = (currentGrid: Grid, previousGrid: Grid): boolean => {
  return currentGrid.every((cell, index) => {
    return cell.index === previousGrid[index].index
  });
};