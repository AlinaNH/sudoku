import { describe, expect, test } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Grid from '~/components/Grid.vue';


describe('Grid component', async () => {
  describe('Mounting', () => {
    test(`renders ${SUBGRID_DIMENSION} Subgrid components`, async() => {
      const wrapper = await mountSuspended(Grid);
      expect(wrapper.findAll('.subgrid').length).toBe(9);
    });
  });
});