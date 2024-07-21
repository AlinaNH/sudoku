<template>
  <div
    :data-index="cell.index"
    :data-row="cell.row"
    :data-column="cell.column"
    :data-subgrid="cell.subgrid"
    :class="[
      'cell', {
        'cell--active': isActive,
        'cell--highlighted': isHighLighted,
      },
    ]"
    @click="store.setActiveCell(cell.index)"
  >
    {{ cell.value }}
  </div>
</template>

<script setup lang="ts">
const { cell } = defineProps<{
  cell: Cell,
}>();

const store = useStore();
const isActive = computed(() => cell.index === store.activeCell?.index);
const isHighLighted = computed(() => {
  return cell.row === store.activeCell?.row
    || cell.column === store.activeCell?.column
    || cell.subgrid === store.activeCell?.subgrid
});
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