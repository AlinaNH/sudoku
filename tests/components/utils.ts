import type { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { getRandomInteger } from '../utils';

export const allElementsHasClass = (
  cells: DOMWrapper<Element>[],
  className: string,
): boolean => {
  return cells.every(cell => {
    return cell.classes(className)
  });
};

export const checkNotHighlightedCellClass = (
  wrapper: VueWrapper,
  activeCell: DOMWrapper<Element>,
  className: string,
): boolean => {
  const excludedCells = getExcludedCellsIndexes(wrapper, activeCell);
  return wrapper
    .findAll('.cell')
    .filter(cell => !excludedCells.has(cell?.attributes('data-index')))
    .every(cell => !cell.classes(className));
};

const getExcludedCellsIndexes = (
  wrapper: VueWrapper,
  activeCell: DOMWrapper<Element>,
): Set<string | undefined> => {
  const cellsToExclude = [ 
    ...getCellsBySegment(wrapper, activeCell, GridSegments.row),
    ...getCellsBySegment(wrapper, activeCell, GridSegments.column),
    ...getCellsBySegment(wrapper, activeCell, GridSegments.subgrid),
  ];
  const cellsToExcludeIndexes = cellsToExclude.map(cell => cell.attributes('data-index'));
  const uniqueIndexesToExclude = new Set(cellsToExcludeIndexes);
  return uniqueIndexesToExclude;
};

const getCellsBySegment = (
  wrapper: VueWrapper,
  activeCell: DOMWrapper<Element>,
  segmentType: keyof typeof GridSegments,
): DOMWrapper<Element>[] => {
  const segmentIndex = activeCell.attributes(`data-${segmentType}`);
  return wrapper.findAll(`[data-${segmentType}="${segmentIndex}"]`);
};

export const getCellValues = (wrapper: VueWrapper): (string | undefined)[] => {
  return wrapper.findAll('.cell').map(cell => cell.attributes('data-index'));
};

export const checkCellValues = (
  initialValues: (string | undefined)[],
  currentValues: (string | undefined)[],
): boolean => {
  if (initialValues.length !== currentValues.length) return false;
  return initialValues.every((value, index) => value === currentValues[index]);
};

export const getRandomCell = (
  wrapper: VueWrapper,
  isVariable: boolean,
  excludedNumber?: string,
): DOMWrapper<Element> => {
  const cells = wrapper.findAll('.cell');
  let variableCells = cells.filter(cell => cell.attributes('data-variable') === isVariable.toString());
  if (excludedNumber) variableCells = variableCells.filter(cell => cell.text() !== excludedNumber);
  const randomIndex = getRandomInteger(0, variableCells.length - 1);
  return variableCells[randomIndex];
};