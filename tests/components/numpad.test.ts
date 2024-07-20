import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, test } from 'vitest';
import App from '~/app.vue';
import { getRandomInteger } from '../utils';
import { isGridChanged } from './utils';

describe('Numpad Component', async () => {
  const store = useStore();
  const wrapper = await mountSuspended(App);
  const numpadButtons = wrapper.findAll('.numpad__button');

  describe('Mounting', () => {
    test(`is rendered ${NUMPAD.length} buttons`, () => {
      expect(numpadButtons.length).toBe(NUMPAD.length);
    });
  });

  describe('Clicking', () => {
    const randomNumbuttonIndex = getRandomInteger(0, NUMPAD.length - 1);
    const randomCellIndex = getRandomInteger(0, GRID_SIZE);
    const randomNumpadButton = numpadButtons[randomNumbuttonIndex];
    const randomCell = wrapper.findComponent(`[data-id="${randomCellIndex}"]`);
    const numpadButtonValue = NUMPAD[randomNumbuttonIndex];

    test('does not changes cells values if no active cell', async () => {
      const initialGrid = JSON.parse(JSON.stringify(store.grid));
      await randomNumpadButton.trigger('click');
      const currentGrid = store.grid;
      const isGridNotChanged = isGridChanged(currentGrid, initialGrid);
      expect(isGridNotChanged).toBe(true);
    });

    test('changes a cell value if there is an active cell', async () => {
      await randomCell.trigger('click');
      await randomNumpadButton.trigger('click');
      const activeCell = store.activeCell;
      expect(activeCell?.value).toBe(numpadButtonValue);
    });

    test('changes a cell value if clicking on keyboard numpad', async () => {
      const numpadButtonValue = getRandomInteger(1, NUMPAD.length);
      store.resetSelection();
      await randomCell.trigger('click');
      const event = new KeyboardEvent('keydown', { key: numpadButtonValue.toString() });
      window.dispatchEvent(event);
      expect(store.activeCell?.value).toBe(numpadButtonValue);
    });

    test('does not change a cell value if clicking on incorrect keyboard button', async () => {
      store.resetSelection();
      await randomCell.trigger('click');
      const initialCellValue = JSON.parse(JSON.stringify(store.activeCell?.value));
      const event = new KeyboardEvent('keydown', { key: '0' });
      window.dispatchEvent(event);
      expect(store.activeCell?.value).toBe(initialCellValue);
    });
  });
});