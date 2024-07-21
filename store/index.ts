export const useStore = defineStore('sudoku', {
  state: (): SudokuStore => {
    return {
      grid: [],
      activeCell: null,
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
      if (this.activeCell && validateCellValue(value)) {
        this.activeCell.value = value;
      }
    },
  },
});