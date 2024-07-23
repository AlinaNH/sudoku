<template>
  <section class="numpad">
    <button
      v-for="num in NUMPAD"
      :disabled="isDisabled(num)"
      class="numpad__button"
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
  return store.grid.filter(cell => cell.value === num).length === GRID_DIMENSION;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: white;
  color: #333333;
  border: none;
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
}

.numpad__button:hover:enabled {
  background-color: var(--hover-color);
}

.numpad__button:active:enabled {
  background-color: var(--active-color);
}

.numpad__button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
