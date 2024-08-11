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

export const getEmptyAndFilledCellsInRow = (
  wrapper: VueWrapper
): {
  emptyCell: DOMWrapper<Element>,
  filledCell: DOMWrapper<Element>,
} => {
  const cellsByRows = Array.from({ length: GRID_DIMENSION }, (): DOMWrapper<Element>[] => []);
  wrapper.findAll('.cell').forEach(cell => cellsByRows[Number(cell.attributes('data-row'))].push(cell));
  const rowWithEmptyAndFilledCells = cellsByRows.find(row => {
    return getEmptyCellInRow(row) && getFilledCellInRow(row);
  }) as DOMWrapper<Element>[];
  return {
    emptyCell: getEmptyCellInRow(rowWithEmptyAndFilledCells),
    filledCell: getFilledCellInRow(rowWithEmptyAndFilledCells),
  }
};

const getEmptyCellInRow = (row: DOMWrapper<Element>[]): DOMWrapper<Element> => {
  return row.find(cell => !cell.text().length) as DOMWrapper<Element>;
};

const getFilledCellInRow = (row: DOMWrapper<Element>[]): DOMWrapper<Element> => {
  return row.find(cell => cell.text().length) as DOMWrapper<Element>;
};

const groupCellBySegments = (
  wrapper: VueWrapper,
  segmentType: keyof typeof GridSegments,
): DOMWrapper<Element>[][] => {
  const result = Array.from({ length: GRID_DIMENSION }, (): DOMWrapper<Element>[] => []);
  const cells = wrapper.findAll('.cell');
  cells.forEach(cell => result[Number(cell.attributes(`data-${segmentType}`))].push(cell));
  return result;
};

export const loseGame = async (wrapper: VueWrapper) => {
  const gridByRows = groupCellBySegments(wrapper, GridSegments.row);

  const rowToLose = gridByRows.find(row => row.filter(cell => {
    return cell.attributes('data-variable') === 'true';
  }).length >= MAX_ERRORS) as DOMWrapper<Element>[];

  const valueToLose = rowToLose.find(cell => {
    return cell.attributes('data-variable') == 'false';
  })?.attributes('data-correct') as string;

  let count = 0;
  for (const cell of rowToLose) {
    if (cell.attributes('data-variable') === 'true') {
      await cell.trigger('click');
      window.dispatchEvent(new KeyboardEvent('keydown', { key: valueToLose }));
      await nextTick();
      count++;

      if (count === MAX_ERRORS) break;
    }
  }
};