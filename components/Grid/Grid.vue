<template>
   <section class="grid">
      <div
        v-for="square in splitGridBySubgrid(grid)"
        class="subgrid"
      >
        <Cell
          v-for="cell in square"
          :cell="cell"
        /> 
      </div>
    </section>
</template>

<script setup lang="ts">
import { splitGridBySubgrid } from '@/utils/grid';
import type { Grid } from './types';

const grid = reactive<Grid>([]);

onMounted(() => generateGrid(grid));
</script>

<style scoped lang="css" src="./Grid.css" />