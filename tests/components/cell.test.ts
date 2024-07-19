import { beforeEach, describe, expect, test } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Grid from '~/components/Grid.vue';
import { getRandomInteger } from '../utils';
import { setActivePinia, createPinia } from 'pinia';
import { checkIsSubgridHighlighted } from './utils';

describe('Cell component', async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const store = useStore();
  const wrapper = await mountSuspended(Grid);
  const cells = wrapper.findAll('.cell');
  const randomIndex = getRandomInteger(0, GRID_SIZE);
  const randomCell = wrapper.findComponent(`[data-id="${randomIndex}"]`);

  describe('Mounting', () => {
    test(`is rendered in the amount of ${GRID_SIZE}`, async () => {
      expect(wrapper.findAll('.cell').length).toBe(81);
    });
  });

  describe('Clicking', async () => {
    await randomCell.trigger('click');
  
    test('changes active cell background color', async () => {
      expect(randomCell.classes('cell--active')).toBe(true);
    });

    test('changes background color of highlighed subgrid', async () => {
      const isSubgridHighlighted = checkIsSubgridHighlighted(store.highlightedSubgrid as Cell[], cells);
      expect(isSubgridHighlighted).toBe(true);
    });

    test('changes background color of highlighed row', async () => {
      const isRowsHighlighted = checkIsSubgridHighlighted(store.highlightedRow as Cell[], cells);
      expect(isRowsHighlighted).toBe(true);
    });

    test('changes background color of highlighed column', async () => {
      const isColumnHighlighted = checkIsSubgridHighlighted(store.highlightedColumn as Cell[], cells);      
      expect(isColumnHighlighted).toBe(true);
    });
  });
});