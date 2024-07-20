<template>
   <section :class="'grid'">
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
  padding: 28px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  background-color: white;
  border-radius: 24px;
}
</style>