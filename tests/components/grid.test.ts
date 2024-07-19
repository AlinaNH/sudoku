import { describe, expect, test } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Grid from '~/components/Grid.vue';


describe('Grid component', async () => {
  describe('Mounting', () => {
    test(`renders ${SUBGRID_SIZE} Subgrid components`, async() => {
      const wrapper = await mountSuspended(Grid);
      expect(wrapper.attributes('class')).toBe('grid');
      expect(wrapper.findAll('.subgrid').length).toBe(9);
    });
  });
});