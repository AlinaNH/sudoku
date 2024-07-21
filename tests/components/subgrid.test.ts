import { describe, expect, test } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Grid from '~/components/Grid.vue';


describe('Subgrid component', async () => {
  describe('Mounting', () => {
    test(`Subgrid component renders ${SUBGRID_DIMENSION} Cell components`, async() => {
      const wrapper = await mountSuspended(Grid);
      expect(wrapper.find('.subgrid').findAll('.cell').length).toBe(9);
    });
  });
});