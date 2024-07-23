<template>
   <section :class="'grid'">
      <Subgrid
        v-for="subgrid in groupBySubgrids(store.grid)"
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
  width: 31.25rem;
  height: 31.25rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: 1.75rem;
  box-shadow: var(--shadow-lg);
  background-color: white;
  border-radius: var(--border-radius-lg);
}
</style>