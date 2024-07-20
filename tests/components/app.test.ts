import { describe, expect, test } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import App from '~/app.vue';


describe('App component', async () => {
  const wrapper = await mountSuspended(App);

  describe('Mounting', () => {
    test('renders a Grid component', async() => {
      expect(wrapper.find('.grid').exists()).toBe(true);
    });

    test('renders a Numpad component', async() => {
      expect(wrapper.find('.numpad').exists()).toBe(true);
    });
  });
});