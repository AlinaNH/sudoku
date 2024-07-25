import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, test, expect } from 'vitest';
import { getRandomInteger } from '../utils';
import {
  checkIsCellIndexesCorrect,
  checkIsColumnIndexesCorrect,
  checkIsRowIndexesCorrect,
  checkIsSubgridIndexesCorrect,
  getRandomVariableCell,
  isValuesRepeatedInSegment,
} from '../store/utils';

describe('Sudoku Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const store = useStore();
  store.initGrid();
  const activeCell = getRandomVariableCell(store.grid);
  const unexitedCellIndex = GRID_LENGTH + 1;
  const unexitedNum = NUMPAD.length + 1;

  describe('Grid Initialization', () => {
    test('generates a grid with ${GRID_LENGTH} length', () => {
      const isLengthCorrect = store.grid.length === GRID_LENGTH;
      expect(isLengthCorrect).toBe(true);
    });

    test('generates a grid with correct cell indexes', () => {
      const isCellIndexesCorrect = checkIsCellIndexesCorrect(store.grid);
      expect(isCellIndexesCorrect).toBe(true);
    });

    test('generates a grid with correct row indexes', () => {
      const isRowIndexesCorrect = checkIsRowIndexesCorrect(store.grid);
      expect(isRowIndexesCorrect).toBe(true);
    });

    test('generates a grid with correct column indexes', () => {
      const isColumnIndexesCorrect = checkIsColumnIndexesCorrect(store.grid);
      expect(isColumnIndexesCorrect).toBe(true);
    });

    test('generates a grid with correct subgrid indexes', () => {
      const isSubgridIndexesCorrect = checkIsSubgridIndexesCorrect(store.grid);
      expect(isSubgridIndexesCorrect).toBe(true);
    });

    test('generates a grid where every cell is not repeated in its row', () => {
      const isRowValuesCorrect = isValuesRepeatedInSegment(store.grid, GridSegments.row);
      expect(isRowValuesCorrect).toBe(true);
    });

    test('generates a grid where every cell is not repeated in its column', () => {
      const isColumnValuesCorrect = isValuesRepeatedInSegment(store.grid, GridSegments.row);
      expect(isColumnValuesCorrect).toBe(true);
    });

    test('generates a grid where every cell is not repeated in its subgrid', () => {
      const isColumnValuesCorrect = isValuesRepeatedInSegment(store.grid, GridSegments.subgrid);
      expect(isColumnValuesCorrect).toBe(true);
    });

    test(`generates a grid which has ${EMPTY_CELL_COUNT} empty cells`, () => {
      const emptyCells = store.grid.filter(cell => !cell.value);
      expect(emptyCells.length).toBe(EMPTY_CELL_COUNT);
    });

    test('generates a grid where empty cells has an isVariable property sets true', () => {
      const emptyCells = store.grid.filter(cell => !cell.value);
      const isEmptyCellsVariable = emptyCells.every(cell => cell.isVariable);
      expect(isEmptyCellsVariable).toBe(true);
    });

    test('generates a grid where non-empty cells has an isVariable property sets false', () => {
      const emptyCells = store.grid.filter(cell => cell.value);
      const isEmptyCellsVariable = emptyCells.every(cell => cell.isVariable);
      expect(isEmptyCellsVariable).toBe(false);
    });
  });

  describe('Cell Activation', () => {
    test('sets an active cell if an index is valid', async () => {
      store.setActiveCell(activeCell.index);
      expect(store.activeCell?.index).toBe(activeCell.index);
    });

    test('does not active cell if an index is invalid', async () => {
      store.setActiveCell(unexitedCellIndex);
      expect(store.activeCell).toBeNull();
    });
  });

  describe('Cell Value Set', () => {
    const randomNum = getRandomInteger(1, NUMPAD.length);
    test('sets cell value if active cell exists', () => {
      store.setActiveCell(activeCell.index);
      store.setCellValue(randomNum);
      expect(store.activeCell).not.toBeNull();
      expect(store.activeCell?.value).toBe(randomNum);
    });

    test('does not set cell value if value is invalid', () => {
      store.setActiveCell(activeCell.index);
      store.setCellValue(unexitedNum);
      expect(store.activeCell?.value).not.toBe(unexitedNum);
    });

    test('does not set cell value if active cell does not exits', () => {
      store.setActiveCell(unexitedCellIndex);
      store.setCellValue(randomNum);
      expect(store.activeCell).toBeNull();
    });

    test('does not set cell value if active cell is not variable', () => {
      const notVariableCell = store.grid.find(cell => !cell.isVariable && cell.value !== randomNum) as Cell;;
      store.setActiveCell(notVariableCell?.index);
      store.setCellValue(randomNum);
      expect(store.activeCell?.value).not.toBe(randomNum);
    });
  });

  describe('Increment Errors', () => {
    test('increments errors if invalid cell value set', () => {
      const invalidValue = NUMPAD.filter(num => num !== activeCell.correctValue)[0];
      store.setActiveCell(unexitedCellIndex);
      store.setCellValue(invalidValue);
      expect(store.errors).toBe(1);
    });
  });
});