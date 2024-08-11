export const useStore = defineStore('sudoku', {
  state: (): SudokuStore => {
    return {
      grid: [],
      activeCell: null,
      errors: 0,
      isWin: false,
      isLose: false,
      isRetry: true,
    }
  },
  actions: {
    startGame() {
      this.$reset();
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
        if (isLastValueSet(this.grid)) this.isWin = true;
      }
    },
    incrementErrors() {
      this.errors += 1;
      if(this.errors === MAX_ERRORS) this.isLose = true;
    },
    tryAgain() {
      this.errors -= 1;
      this.isLose = false;
      this.isRetry = false;
    }
  },
});