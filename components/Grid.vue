<template>
   <section class="grid">
      <Subgrid
        v-for="subgrid in store.gridBySubgrids"
        :subgrid="subgrid"
      />
    </section>
</template>

<script setup lang="ts">
const store = useStore();

onMounted(() => store.initGrid());
</script>

<style scoped lang="css">
.grid {
  width: 500px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border: 10px solid #BDC0C7;
  border-radius: 5px;
}
</style>