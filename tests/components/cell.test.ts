import { describe, expect, test } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Grid from '~/components/Grid.vue';
import {
  allElementsHasClass,
  checkNotHighlightedCellClass,
  getEmptyAndFilledCellsInRow,
  getRandomCell,
} from './utils';

describe('Cell component', async () => {
  const wrapper = await mountSuspended(Grid);

  describe('Mounting', () => {
    test(`is rendered in the amount of ${GRID_LENGTH}`, async () => {
      expect(wrapper.findAll('.cell').length).toBe(GRID_LENGTH);
    });
  });

  describe('Clicking', async () => {
    const highlightClass = 'cell--highlighted';
    const activeEmptyCell = getRandomCell(wrapper, true);
    const activeFilledCell = getRandomCell(wrapper, false);
    await activeEmptyCell.trigger('click');
  
    test('changes a background color of an active cell', async () => {
      expect(activeEmptyCell.classes('cell--active')).toBe(true);
    });

    test('changes a background color of a row where there is an active cell', async () => {
      const rowIndex = activeEmptyCell.attributes('data-row');
      const rowElements = wrapper.findAll(`[data-row="${rowIndex}"]`);
      const isRowHighlighted = allElementsHasClass(rowElements, highlightClass);
      expect(isRowHighlighted).toBe(true);
    });

    test('changes a background color of a column where there is an active cell', async () => {
      const columnIndex = activeEmptyCell.attributes('data-column');
      const columnElements = wrapper.findAll(`[data-column="${columnIndex}"]`);
      const isColumnHighlighted = allElementsHasClass(columnElements, highlightClass);
     expect(isColumnHighlighted).toBe(true);
    });

    test('changes a background color of a subgrid where there is an active cell', async () => {
      const subgridIndex = activeEmptyCell.attributes('data-subgrid');
      const subgridElements = wrapper.findAll(`[data-subgrid="${subgridIndex}"]`);
      const isSubgridHighlighted = allElementsHasClass(subgridElements, highlightClass);
      expect(isSubgridHighlighted).toBe(true);
    });

    test('does not change a background color of other cells', async () => {
      const isOtherCellsClassNotChanged = checkNotHighlightedCellClass(wrapper, activeEmptyCell, highlightClass);
      expect(isOtherCellsClassNotChanged).toBe(true);
    });

    test('changes a background color of cells with same value with active cell', async () => {
      await activeFilledCell.trigger('click');
      const sameCells = wrapper.findAll('.cell--same');
      const isSameCellsClassChanged = sameCells.every(cell => cell.text() === activeFilledCell.text());
      expect(isSameCellsClassChanged).toBe(true);
    });

    test('does not change a background color of cells with different value with active cell', async () => {
      const sameCells = wrapper.findAll('.cell').filter(cell => !cell.classes('cell--same'));
      const isSameCellsClassChanged = sameCells.every(cell => cell.text() !== activeFilledCell.text());
      expect(isSameCellsClassChanged).toBe(true);
    });

    test('changes a class of a variable cell', async () => {
      await activeEmptyCell.trigger('click');
      const variableCells = wrapper.findAll('[data-variable="true"]');
      const isVariableCellHasClass = variableCells.every(cell => cell.classes('cell--variable'));
      expect(isVariableCellHasClass).toBe(true);
    });

    test('does not changes a class of a non-variable cell', async () => {
      const nonVariableCells = wrapper.findAll('[data-variable="false"]');
      const isNonVariableCellNotHasClass = nonVariableCells.every(cell => !cell.classes('cell--variable'));
      expect(isNonVariableCellNotHasClass).toBe(true);
    });
  });

  describe('Error handling', () => {
    const { emptyCell, filledCell } = getEmptyAndFilledCellsInRow(wrapper);

    test('add an error class if an active cell has an incorrect value', async () => {
      await emptyCell.trigger('click');
      window.dispatchEvent(new KeyboardEvent('keydown', { key: filledCell.text() }));
      await nextTick();
      expect(emptyCell.classes('cell--error')).toBe(true);
    });

    test('does not add an error class to all other cells', () => {
      const otherCells = wrapper
        .findAll('.cell')
        .filter(cell => cell.attributes('data-index') !== emptyCell.attributes('data-index'));
      const otherCellNotHasErrorClass = otherCells.every(cell => !cell.attributes('cell--error'));
      expect(otherCellNotHasErrorClass).toBe(true);
    });
  });
});