<template>
  <div :class="'subgrid'">
    <Cell
      v-for="cell in subgrid"
      :cell="cell"
    /> 
  </div>
</template>

<script setup lang="ts">
defineProps<{
  subgrid: Cell[],
}>();
</script>

<style scoped lang="css">
.subgrid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 grid-template-rows: repeat(3, 1fr);
 border: 0.5px solid #383B42;
}
</style>