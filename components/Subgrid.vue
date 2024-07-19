<template>
  <div class="subgrid">
    <Cell
      v-for="cell in subgrid"
      :cell="cell"
    /> 
  </div>
</template>

<script setup lang="ts">
defineProps<{
  subgrid: Grid,
}>();
</script>

<style scoped lang="css">
.subgrid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 grid-template-rows: repeat(3, 1fr);
 border: 1px solid #5E626E;
}
</style>