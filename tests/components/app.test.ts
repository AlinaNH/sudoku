import { describe, expect, test } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import App from '~/app.vue';


describe('App component', async () => {
  test('renders a Grid component', async() => {
    const wrapper = await mountSuspended(App);
    expect(wrapper.find('.grid').exists()).toBe(true);
  });
});