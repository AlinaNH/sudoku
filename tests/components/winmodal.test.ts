import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, test } from 'vitest';
import App from '~/app.vue';

describe('WinModal component', async () => {
 const wrapper = await mountSuspended(App);

  describe('Mounting', () => {
    test('renders if game is win', async () => {
      const variableCells = wrapper.findAll('[data-variable="true"]');
      const numpadButtons = wrapper.findAll('.numpad__button');
      for (const cell of variableCells) {
        const numpadButton = numpadButtons[Number(cell.attributes('data-correct')) - 1];
        await cell.trigger('click');
        await numpadButton.trigger('click');
      }
      expect(wrapper.find('.win-modal').exists()).toBe(true);
    });
  });

  describe('Clicking', () => {
    test('starts a new game on click', async () => {
      const startNewGameButton = wrapper.find('.win-modal__button');
      await startNewGameButton.trigger('click');
      const variableCells = wrapper.findAll('[data-variable="true"]');
      const isVariableCellsEmpty = variableCells.every(cell => !cell.text());
      expect(wrapper.find('.win-modal').exists()).toBe(false);
      expect(isVariableCellsEmpty).toBe(true);
    });
  });
});