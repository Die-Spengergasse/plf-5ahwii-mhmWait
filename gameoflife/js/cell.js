'use strict';


class Cell {
    row;
    column;
    living; 
    livingThen; 
    
    constructor(row, column, grid) {
        this.row = row;
        this.column = column;
        this.grid = grid;
        this.living = false;
        this.livingThen = undefined;
    }

    calculateLivingThen() {
    
        let rowStart = this.row - 1;
        let rowEnd = this.row + 1;
        let columnStart = this.column - 1;
        let columnEnd = this.column + 1;
        let livingNeighbors = 0;
        for (let row = rowStart; row <= rowEnd; row++) {
            for (let column = columnStart; column <= columnEnd; column++) {
                if (row == this.row && column == this.column) {
                    continue; 
                }
                if (this.grid.getCell(row, column).living) livingNeighbors++;
            }
        }
        if (this.living) {
            if (livingNeighbors < 2 || livingNeighbors > 3) {
               
                this.livingThen = false;
                return;
            }
        } else {
          
            if (livingNeighbors == 3) {
                this.livingThen = true;
                return;
            }
        }
        this.livingThen = this.living;
    }

    setLiving(alive = true) {
        this.living = alive;
        this.livingThen = undefined;
        this.updateDisplay();
    }

    toggleLiving() {
        this.setLiving(!this.living);
    }

    updateDisplay() {
        if (
            this.row < 0 ||
            this.column < 0 ||
            this.row >= this.grid.rows ||
            this.column >= this.grid.columns
        ) {
            return;
        }
        const cell = this.grid.elements.get(`${this.row}/${this.column}`);
        if (!cell) {
            return;
        }
        if (this.living) {
            cell.classList.add("living");
        } else {
            cell.classList.remove("living");
        }
    }

    advanceToNextGeneration() {
        this.livingThen ??= false; 
        this.living = this.livingThen;
        this.livingThen = undefined;
        this.updateDisplay();
    }
}


export { Cell };