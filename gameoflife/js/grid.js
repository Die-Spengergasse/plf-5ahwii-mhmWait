'use strict';
import { Component } from './component.js';
import { Cell } from './cell.js';
import { Patterns } from './patterns.js';

class Grid extends Component {
    columns;
    rows;
    cells;
    elements;
    intervallId;
    offset_x;
    offset_y;
    simulationSpeed;
    
    constructor(parent, anchor, columns, rows) {
        super(parent, anchor);
        this.columns = columns;
        this.rows = rows;
        this.addToDom(document.createElement("div"));
        this.domElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        this.domElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        this.domElement.id = "grid";
        "border border-2 p-1 border-dark-subtle mx-auto".split(" ").forEach(
            (cls) => this.domElement.classList.add(cls),
        );
        this.offset_x = 0;
        this.offset_y = 0;
        this.cells = {}; // {row: {column: cell}}
        this.elements = new Map();
        this.simulationSpeed = 250; // Default speed in milliseconds
        
        // Erstelle die DOM-Elemente für das Grid
        this.createGridCells();
    }
    
    // DOM-Elemente für das Grid erstellen
    createGridCells() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const cell = document.createElement("div");
                this.domElement.appendChild(cell);
                cell.addEventListener("click", (e) => {
                    this.toggleLiving(row, column);
                });
                const idx = `${row}/${column}`;
                cell.id = idx;
                this.elements.set(idx, cell);
            }
        }
    }
    
    toggleLiving(row, column) {
        this.getCell(row, column).toggleLiving();
        this.displayLiveCount();
    }
    
    // Erstellt eine Zelle "on demand"
    getCell(row, column, obj = this.cells) {
        if (!obj.hasOwnProperty(row)) {
            obj[row] = {};
        }
        if (!obj[row].hasOwnProperty(column)) {
            obj[row][column] = new Cell(row, column, this);
        }
        return obj[row][column];
    }
    
    // Optimierter Iterator für Zellen
    *cellIterator() {
        const rows = Object.keys(this.cells);
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const columns = Object.keys(this.cells[row]);
            for (let j = 0; j < columns.length; j++) {
                const column = columns[j];
                yield this.cells[row][column];
            }
        }
    }
    
    // Eine Generation vorwärts
    ageOneGeneration() {
        // Cache für Berechnungen
        const cellCache = new Map();
        const futureCells = {};
        
        // Alle lebenden Zellen und ihre Nachbarn markieren
        [...this.cellIterator()].forEach(cell => {
            if (cell.living) {
                this.markCellAndNeighbors(cell, cellCache);
            }
        });
        
        // Status für alle markierten Zellen berechnen
        for (const [key, cell] of cellCache.entries()) {
            cell.calculateLivingThen();
        }
        
        // Alle Zellen aktualisieren und neue Zellstruktur aufbauen
        for (const [key, cell] of cellCache.entries()) {
            cell.advanceToNextGeneration();
            if (cell.living) {
                this.getCell(cell.row, cell.column, futureCells).setLiving();
            }
        }
        
        this.cells = futureCells;
        this.displayLiveCount();
    }
    
    // Hilfsmethode zum Markieren einer Zelle und ihrer Nachbarn
    markCellAndNeighbors(cell, cellCache) {
        const rowStart = cell.row - 1;
        const rowEnd = cell.row + 1;
        const colStart = cell.column - 1;
        const colEnd = cell.column + 1;
        
        for (let r = rowStart; r <= rowEnd; r++) {
            for (let c = colStart; c <= colEnd; c++) {
                const key = `${r},${c}`;
                if (!cellCache.has(key)) {
                    const neighborCell = this.getCell(r, c);
                    cellCache.set(key, neighborCell);
                }
            }
        }
    }
    
    // Grid verschieben
    shift(arg) {
        const factor = -5;
        let offsetRow = 0;
        let offsetColumn = 0;
        switch (arg) {
            case "left":
                offsetColumn = -1;
                break;
            case "right":
                offsetColumn = 1;
                break;
            case "up":
                offsetRow = -1;
                break;
            case "down":
                offsetRow = 1;
                break;
            default:
                console.warn("Grid.shift: unknown direction: " + arg);
        }
        offsetRow *= factor;
        offsetColumn *= factor;
        this.offset_x += offsetColumn;
        this.offset_y += offsetRow;
        
        // Events für UI-Updates auslösen
        document.dispatchEvent(new CustomEvent('grid-offset-changed', { 
            detail: { x: this.offset_x, y: this.offset_y } 
        }));
        
        const futureCells = {};
        [...this.cellIterator()].forEach((cell) => {
            this.getCell(
                cell.row + offsetRow,
                cell.column + offsetColumn,
                futureCells,
            ).setLiving();
            cell.setLiving(false);
        });
        this.cells = futureCells;
        [...this.cellIterator()].forEach((_) => _.updateDisplay());
    }
    
    // Anzahl lebender Zellen anzeigen
    displayLiveCount() {
        const liveCount = [...this.cellIterator()].filter(
            (_) => _.living,
        ).length;
        
        // Event für UI-Update auslösen
        document.dispatchEvent(new CustomEvent('livecount-changed', { 
            detail: { count: liveCount } 
        }));
    }
    
    // Simulation starten
    getGoing(ms = this.simulationSpeed) {
        if (!(this.intervallId === undefined)) {
            console.warn("Grid.getGoing: already going");
            return;
        }
        this.intervallId = setInterval(() => {
            this.ageOneGeneration();
        }, ms);
    }
    
    // Simulation pausieren
    pause() {
        clearInterval(this.intervallId);
        this.intervallId = undefined;
    }
    // Simulate speed methods
    setSimulationSpeed(speed) {
        this.simulationSpeed = speed;
        
        // If simulation is running, restart with new speed
        if (this.intervallId !== undefined) {
            this.pause();
            this.getGoing(speed);
        }
    }
    
    // Rapid generation advance
    advanceGenerations(numGenerations) {
        for (let i = 0; i < numGenerations; i++) {
            this.ageOneGeneration();
        }
    }
    // Grid zurücksetzen
    reset() {
        this.pause();
        [...this.cellIterator()].forEach((cell) => {
            cell.setLiving(false);
        });
        this.cells = {};
        this.displayLiveCount();
    }
    
    // Vordefiniertes Muster setzen
    setPattern(patternName) {
        if (!Patterns[patternName]) {
            console.warn("Grid.setPattern: unknown pattern: " + patternName);
            return;
        }
        
        Patterns[patternName].forEach(({row, col}) => {
            this.getCell(row, col).setLiving(true);
        });
        
        this.displayLiveCount();
    }
}

export { Grid };