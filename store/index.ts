export const useStore = defineStore('sudoku', {
  state: (): SudokuStore => {
    return {
      grid: [],
      gridBySubgrids: [],
      gridByRows: [],
      gridByColumns: [],
      activeCell: null,
      highlightedSubgrid: null,
      highlightedRow: null,
      highlightedColumn: null,
    };
  },
  actions: {
    initGrid() {
      this.grid = generateGrid();
      this.gridBySubgrids = splitGridBySubgrid(this.grid);
      this.gridByRows = splitGridByRows(this.grid);
      this.gridByColumns = splitGridByColumns(this.gridByRows);
    },
    setActiveCell(activeCell: Cell) {
      this.resetSelection();
      this.activeCell = getActiveCell(this.grid, activeCell);
      this.highlightedSubgrid = getHighlightedSubgrid(this.gridBySubgrids, activeCell);
      this.highlightedRow = getHighlightedRow(this.gridByRows, activeCell);
      this.highlightedColumn = getHighlightedColumn(this.gridByColumns, activeCell);
    },
    resetSelection() {
      resetSelection(this.grid);
      this.activeCell = null;
      this.highlightedSubgrid = null;
      this.highlightedRow = null;
      this.highlightedColumn = null;
    }
  },
});