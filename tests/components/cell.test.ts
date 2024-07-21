import { describe, expect, test } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Grid from '~/components/Grid.vue';
import { getRandomInteger } from '../utils';
import { allElementsHasClass, checkNotHighlightedCellClass } from './utils';

describe('Cell component', async () => {
  const wrapper = await mountSuspended(Grid);

  describe('Mounting', () => {
    test(`is rendered in the amount of ${GRID_LENGTH}`, async () => {
      expect(wrapper.findAll('.cell').length).toBe(GRID_LENGTH);
    });
  });

  describe('Clicking', async () => {
    const highlightClass = 'cell--highlighted';
    const randomIndex = getRandomInteger(0, GRID_LENGTH - 1);
    const activeCell = wrapper.find(`[data-index="${randomIndex}"]`);
    await activeCell.trigger('click');
  
    test('changes background color of active cell', async () => {
      expect(activeCell.classes('cell--active')).toBe(true);
    });

    test('changes background color of a row where there is an active cell', async () => {
      const rowIndex = activeCell.attributes('data-row');
      const rowElements = wrapper.findAll(`[data-row="${rowIndex}"]`);
      const isRowHighlighted = allElementsHasClass(rowElements, highlightClass);
      expect(isRowHighlighted).toBe(true);
    });

    test('changes background color of a column where there is an active cell', async () => {
      const columnIndex = activeCell.attributes('data-column');
      const columnElements = wrapper.findAll(`[data-column="${columnIndex}"]`);
      const isColumnHighlighted = allElementsHasClass(columnElements, highlightClass);
     expect(isColumnHighlighted).toBe(true);
    });

    test('changes background color of a subgrid where there is an active cell', async () => {
      const subgridIndex = activeCell.attributes('data-subgrid');
      const subgridElements = wrapper.findAll(`[data-subgrid="${subgridIndex}"]`);
      const isSubgridHighlighted = allElementsHasClass(subgridElements, highlightClass);
      expect(isSubgridHighlighted).toBe(true);
    });

    test('does not change background color of other cells', async () => {
      const isOtherCellsClassNotChanged = checkNotHighlightedCellClass(wrapper, activeCell, highlightClass);
      expect(isOtherCellsClassNotChanged).toBe(true);
    });
  });
});