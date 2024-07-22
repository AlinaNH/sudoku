<template>
  <div
    :data-index="cell.index"
    :data-row="cell.row"
    :data-column="cell.column"
    :data-subgrid="cell.subgrid"
    :data-variable="cell.isVariable"
    :class="[
      'cell', {
        'cell--active': isActive,
        'cell--highlighted': isHighLighted,
        'cell--same': isSame,
        'cell--variable': cell.isVariable,
        'cell--error': isError, 
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
const isSame = computed(() => {
  return cell.value && cell.value === store.activeCell?.value;
});
const isError = computed(() => cell.value !== cell.correctValue);
</script>

<style scoped lang="css">
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #383B42;
  color: #333333;
  font-size: 24px;
  cursor: pointer;
}

.cell:hover {
  background-color: var(--hover-color);
}

.cell:active {
  background-color: var(--active-color);
}

.cell--highlighted {
  background-color: #EBF3E3;
}

.cell--same {
  background-color: #C8DAB6;
}

.cell--active {
  background-color: #CAE9C4;
}

.cell--variable {
  color: #32936b;
}

.cell--error {
  color: tomato;
}
</style>