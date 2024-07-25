import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, test } from 'vitest';
import App from '~/app.vue';
import { getEmptyAndFilledCellsInRow } from './utils';

describe('GameInfo', async () => {
  const wrapper = await mountSuspended(App);
  const errors = wrapper.get('#errors');

  describe('Errors', () => {
    test(`renders max error number - ${MAX_ERRORS}`, () => {
      expect(errors.text()).toBe(`0 / ${MAX_ERRORS}`);
    });

    test('increments if set invalid value for a cell', async () => {
      const { emptyCell, filledCell } = getEmptyAndFilledCellsInRow(wrapper);
      await emptyCell.trigger('click');
      window.dispatchEvent(new KeyboardEvent('keydown', { key: filledCell.text() }));
      await nextTick();
      expect(errors.text()).toBe(`1 / ${MAX_ERRORS}`);
    });
  });
});