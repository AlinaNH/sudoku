export const useStore = defineStore('sudoku', {
  state: (): SudokuStore => {
    return {
      grid: [],
      activeCell: null,
      errors: 0,
    };
  },
  actions: {
    initGrid() {
      this.grid = generateGrid();
    },
    setActiveCell(index: number) {
      if (containsCellAtIndex(this.grid, index)) this.activeCell = this.grid[index];
      else this.activeCell = null;
    },
    setCellValue(value: number) {
      if (this.activeCell && this.activeCell.isVariable && validateCellValue(value)) {
        this.activeCell.value = value;
        if (value !== this.activeCell.correctValue) this.incrementErrors();
      }
    },
    incrementErrors() {
      this.errors += 1;
    },
  },
});