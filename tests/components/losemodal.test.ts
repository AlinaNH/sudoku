import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, test } from 'vitest';
import App from '~/app.vue';
import { loseGame } from './utils';

describe('LoseModal component', async () => {
 const wrapper = await mountSuspended(App);

  describe('Mounting', () => {
    test('renders if game is lost', async () => {
      await loseGame(wrapper);
      expect(wrapper.find('.lose-modal').exists()).toBe(true);
    });
  });

  describe('Try again', async () => {
    const initialCellsValues = wrapper.findAll('.cell').map(cell => cell.text());

    test('closes LoseModal on click', async () => {
      const tryAgain = wrapper.find('[data-test="try-again"]');
      await tryAgain.trigger('click');
      expect(wrapper.find('.lose-modal').exists()).toBe(false);
    });

    test('renders same grid on click', () => {
      const currentCellsValues = wrapper.findAll('.cell').map(cell => cell.text());
      const isGridChanged = initialCellsValues.every((value, index) => value === currentCellsValues[index]);
      expect(isGridChanged).toBe(false);
    });

    test(`renders ${MAX_ERRORS - 1} / ${MAX_ERRORS} errors on click`, async () => {
      const errors = wrapper.get('#errors');
      expect(errors.text()).toBe(`${MAX_ERRORS - 1} / ${MAX_ERRORS}`);
    });

    test('not rendered if the game lose second time', async () => {
      await loseGame(wrapper);
      expect(wrapper.find('.lose-modal').exists()).toBe(true);
      expect(wrapper.find('[data-test="try-again"]').exists()).toBe(false);
    });
  });

  describe('Start new game', () => {
    test('renders a new grid if clicked', async () => {
      const initialCellsValues = wrapper.findAll('.cell').map(cell => cell.text());
      const tryAgainButton = wrapper.find('[data-test="start-game-after-lost"]');
      await tryAgainButton.trigger('click');
      const currentCellsValues = wrapper.findAll('.cell').map(cell => cell.text());
      const isGridChanged = !initialCellsValues.every((value, index) => value === currentCellsValues[index]);
      expect(wrapper.find('.lose-modal').exists()).toBe(false);
      expect(isGridChanged).toBe(true);
    });

    test(`renders 0 / ${MAX_ERRORS} errors on click`, async () => {
      const errors = wrapper.get('#errors');
      expect(errors.text()).toBe(`0 / ${MAX_ERRORS}`);
    });
  });
});