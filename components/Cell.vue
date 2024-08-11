<template>
  <div
    :data-index="cell.index"
    :data-row="cell.row"
    :data-column="cell.column"
    :data-subgrid="cell.subgrid"
    :data-variable="cell.isVariable"
    :data-correct="cell.correctValue"
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
const props = defineProps<{
  cell: Cell,
}>();

const store = useStore();
const isActive = computed(() => props.cell.index === store.activeCell?.index);
const isHighLighted = computed(() => {
  return props.cell.row === store.activeCell?.row
    || props.cell.column === store.activeCell?.column
    || props.cell.subgrid === store.activeCell?.subgrid
});
const isSame = computed(() => {
  return props.cell.value && props.cell.value === store.activeCell?.value;
});
const isError = computed(() => props.cell.value && props.cell.value !== props.cell.correctValue);
</script>

<style scoped lang="css">
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #383B42;
  font-size: 1.5rem;
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
  background-color: var(--primary-color);
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