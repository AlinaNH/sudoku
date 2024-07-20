<template>
  <section class="numpad">
    <button
      v-for="num in NUMPAD"
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

onMounted(() => window.addEventListener('keydown', setCellValue));
onUnmounted(() => window.removeEventListener('keydown', setCellValue));
</script>

<style scoped lang="css">
.numpad {
  display: flex;
  gap: 10px;
}

.numpad__button {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-color: white;
  color: #333333;
  border: none;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);;
  border-radius: 8px;
  cursor: pointer;
}

.numpad__button:hover {
  background-color: var(--hover-color);
}

.numpad__button:active {
  background-color: var(--active-color);
}
</style>
