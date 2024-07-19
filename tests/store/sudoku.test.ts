import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, test, expect } from 'vitest';
import { getRandomInteger } from '../utils';
import {
  checkIsGridGenerated,
  isCellsInSubgridCorrect,
  hasLengthEqual,
  isCellsInRowsCorrect,
  isCellsInColumnsCorrect,
  getSubgridToHighlight,
  isCellsHighlighted,
} from './utils';

describe('Sudoku Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const randomIndex = getRandomInteger(0, GRID_SIZE);
  const anotherRandomIndex = getRandomInteger(0, GRID_SIZE);
  const unexitedIndex = 100;
  const activeCell = generateCell(randomIndex);
  const anotherActiveCell = generateCell(anotherRandomIndex);
  const unexistedCell = generateCell(unexitedIndex);
  const store = useStore();
  store.initGrid();

  describe('Grid Initialization', () => {
    test('generates a grid', () => {
      const has89Cells = store.grid.length == GRID_SIZE;
      const isGridGenerated = checkIsGridGenerated(store.grid);
      expect(has89Cells).toBe(true);
      expect(isGridGenerated).toBe(true);
    });

    test('generates a grid splitted by subgrids', () => {
      const gridBySubgridsLength = store.gridBySubgrids.length;
      const has9Subgrids = hasLengthEqual(store.gridBySubgrids, SUBGRID_SIZE);
      const isCellIndexesCorrect = isCellsInSubgridCorrect(store.gridBySubgrids);
      expect(gridBySubgridsLength).toBe(SUBGRID_SIZE);
      expect(has9Subgrids).toBe(true);
      expect(isCellIndexesCorrect).toBe(true);
    });

    test('generates a grid splitted by rows', () => {
      const gridByRowsLength = store.gridByRows.length;
      const has9Rows = hasLengthEqual(store.gridByRows, SUBGRID_SIZE);
      const isCellIndexesCorrect = isCellsInRowsCorrect(store.grid, store.gridByRows);
      expect(gridByRowsLength).toBe(SUBGRID_SIZE);
      expect(has9Rows).toBe(true);
      expect(isCellIndexesCorrect).toBe(true);
    });

    test('generates a grid splitted by columns', () => {
      const gridByColumnsLength = store.gridByColumns.length;
      const has9Columns = hasLengthEqual(store.gridByColumns, SUBGRID_SIZE);
      const isCellIndexesCorrect = isCellsInColumnsCorrect(store.gridByColumns, store.gridByRows);
      expect(gridByColumnsLength).toBe(SUBGRID_SIZE);
      expect(has9Columns).toBe(true);
      expect(isCellIndexesCorrect).toBe(true);
    });
  });

  describe('Cell Activation', () => {
    store.setActiveCell(activeCell);
  
    test('sets active cell', async () => {
      expect(store.activeCell?.index).toBe(activeCell.index);
      expect(store.activeCell?.isActive).toBe(true);
    });

    test('sets highlighted subgrid', async () => {
      const subgridToHighlight = getSubgridToHighlight(store.gridBySubgrids, activeCell);
      const isCellsInSubgridHighlighted = isCellsHighlighted(store.highlightedSubgrid as Cell[]);
      expect(store.highlightedSubgrid).toBe(subgridToHighlight);
      expect(isCellsInSubgridHighlighted).toBe(true);
    });

    test('sets highlighted row', async () => {
      const rowToHighlight = getSubgridToHighlight(store.gridByRows, activeCell);
      const isCellsInRowHighlighted = isCellsHighlighted(store.highlightedRow as Cell[]);
      expect(store.highlightedRow).toBe(rowToHighlight);
      expect(isCellsInRowHighlighted).toBe(true);
    });

    test('sets highlighted column', async () => {
      const columnToHighlight = getSubgridToHighlight(store.gridByColumns, activeCell);
      const isCellsInColumnHighlighted = isCellsHighlighted(store.highlightedColumn as Cell[]);
      expect(store.highlightedColumn).toBe(columnToHighlight);
      expect(isCellsInColumnHighlighted).toBe(true);
    });

    test('sets data for second cell if runs twice with different data', async () => {
      let subgridToHighlight, rowToHighlight, columnToHighlight;
      subgridToHighlight = getSubgridToHighlight(store.gridBySubgrids, activeCell);
      rowToHighlight = getSubgridToHighlight(store.gridByRows, activeCell);
      columnToHighlight =  getSubgridToHighlight(store.gridByColumns, activeCell);
      expect(store.activeCell?.index).toBe(activeCell.index);
      expect(store.highlightedSubgrid).toBe(subgridToHighlight);
      expect(store.highlightedColumn).toBe(columnToHighlight);
      expect(store.highlightedRow).toBe(rowToHighlight);
      store.setActiveCell(anotherActiveCell);
      subgridToHighlight = getSubgridToHighlight(store.gridBySubgrids, anotherActiveCell);
      rowToHighlight = getSubgridToHighlight(store.gridByRows, anotherActiveCell);
      columnToHighlight =  getSubgridToHighlight(store.gridByColumns, anotherActiveCell);
      expect(store.activeCell?.index).toBe(anotherActiveCell.index);
      expect(store.highlightedSubgrid).toBe(subgridToHighlight);
      expect(store.highlightedColumn).toBe(columnToHighlight);
      expect(store.highlightedRow).toBe(rowToHighlight);
    });

    test('sets null if cell does not exist', () => {
      store.setActiveCell(unexistedCell);
      expect(store.activeCell).toBeNull();
      expect(store.highlightedSubgrid).toBeNull();
      expect(store.highlightedRow).toBeNull();
      expect(store.highlightedColumn).toBeNull();
    });
  });

  describe('Cell Activation Reset', () => {
    test('sets null if called', () => {
      store.setActiveCell(activeCell);
      expect(store.activeCell).not.toBeNull();
      expect(store.highlightedSubgrid).not.toBeNull();
      expect(store.highlightedRow).not.toBeNull();
      expect(store.highlightedColumn).not.toBeNull();
      store.resetSelection();
      expect(store.activeCell).toBeNull();
      expect(store.highlightedSubgrid).toBeNull();
      expect(store.highlightedRow).toBeNull();
      expect(store.highlightedColumn).toBeNull();
    });
  });
});