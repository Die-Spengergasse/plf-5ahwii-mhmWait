'use strict';
import { Grid } from './grid.js';
import { UIController } from './ui.js';

// Initialisiere das Grid
const grid = new Grid(null, document.querySelector("main"), 50, 50);
console.log('Grid initialized:', grid);

// Initialisiere die UI-Steuerung
const uiController = new UIController(grid);

// Hilfsfunktion für Aspect Ratio Debugging
function ar() {
    console.log(`AR: ${window.innerWidth / window.innerHeight}`);
}

// Exportiere grid für Debug-Zugriff in der Konsole
window.gameOfLifeGrid = grid;