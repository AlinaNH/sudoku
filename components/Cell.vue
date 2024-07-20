<template>
  <div
    :data-id="cell.index"
    :class="[
      'cell', {
        'cell--highlighted': cell.isHighlighted,
        'cell--active': cell.isActive,
      },
    ]"
    @click="store.setActiveCell(cell)"
  >
    {{ cell.value }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cell: Cell,
}>();

const store = useStore();
</script>

<style scoped lang="css">
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #383B42;
  color: #333333;
  font-size: 18px;
  cursor: pointer;
}

.cell:hover {
  background-color: var(--hover-color);
}

.cell:active {
  background-color: var(--active-color);
}

.cell--highlighted {
  background-color: #EBEFE7;
}

.cell--active {
  background-color: #ABBBA0;
}
</style>