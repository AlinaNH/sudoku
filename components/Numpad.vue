<template>
  <section class="numpad">
    <button
      v-for="num in NUMPAD"
      :disabled="isDisabled(num)"
      class="button numpad__button"
      @click="store.setCellValue(num)"
    >
      {{ num }}
    </button>
  </section>
</template>

<script setup lang="ts">
const store = useStore();

const setCellValue = (e: KeyboardEvent) => store.setCellValue(+e.key);

const isDisabled = (num: number): boolean => {
  return store.grid.filter(cell => (
    cell.value === num && cell.correctValue === num
  )).length === GRID_DIMENSION;
};

onMounted(() => window.addEventListener('keydown', setCellValue));
onUnmounted(() => window.removeEventListener('keydown', setCellValue));
</script>

<style scoped lang="css">
.numpad {
  display: flex;
  gap: 10px;
}

.numpad__button {
  width: 3.125rem;
  height: 3.125rem;
  font-size: 1.5rem;
}
</style>
