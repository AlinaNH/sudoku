import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, test } from 'vitest';
import App from '~/app.vue';
import { getRandomInteger } from '../utils';
import { getCellValues, checkCellValues, getRandomCell } from './utils';

describe('Numpad Component', async () => {
  const wrapper = await mountSuspended(App);
  const numpadButtons = wrapper.findAll('.numpad__button');

  describe('Mounting', () => {
    test(`is rendered ${NUMPAD.length} buttons`, () => {
      expect(numpadButtons.length).toBe(NUMPAD.length);
    });
  });

  describe('Clicking', () => {
    const randomNumpadButtonIndex = getRandomInteger(0, NUMPAD.length - 1);
    const numpadButton = numpadButtons[randomNumpadButtonIndex];
    const numpadButtonValue = (randomNumpadButtonIndex + 1).toString();
    const activeCell = getRandomCell(wrapper, true);

    test('does not changes cells values if no active cell', async () => {
      const initialValues = getCellValues(wrapper);
      await numpadButton.trigger('click');
      const currentValues = getCellValues(wrapper);
      const isCellValuesChanged = checkCellValues(initialValues, currentValues);
      expect(isCellValuesChanged).toBe(true);
    });

    test('changes a cell value if there is an active cell', async () => {
      await activeCell.trigger('click');
      await numpadButton.trigger('click');
      expect(activeCell.text()).toBe(numpadButtonValue);
    });

    test('changes a cell value if clicking on keyboard numpad', async () => {
      const numpadButtonValue = getRandomInteger(1, NUMPAD.length).toString();
      await activeCell.trigger('click');
      window.dispatchEvent(new KeyboardEvent('keydown', { key: numpadButtonValue }));
      await nextTick();
      expect(activeCell.text()).toBe(numpadButtonValue);
    });

    test('does not change a cell value if clicking on incorrect keyboard button', async () => {
      await activeCell.trigger('click');
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
      await nextTick();
      expect(activeCell.text()).not.toBe('0');
    });

    test('does not change a cell value if clicking on non variable cell', async () => {
      const nonVariableCell = getRandomCell(wrapper, false, numpadButtonValue);
      await nonVariableCell.trigger('click');
      window.dispatchEvent(new KeyboardEvent('keydown', { key: numpadButtonValue }));
      await nextTick();
      expect(nonVariableCell.text()).not.toBe(numpadButtonValue);
    });
  });
});