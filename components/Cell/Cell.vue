<template>
  <div class="cell">
    {{ cell.value }}
  </div>
</template>

<script setup lang="ts">
import type { Cell } from './types';

defineProps<{
  cell: Cell,
}>()
</script>

<style scoped lang="css" src="./Cell.css" />