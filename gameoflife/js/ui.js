'use strict';

class UIController {
    constructor(grid) {
        this.grid = grid;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Buttons finden
        const resetButton = document.querySelector("button#reset");
        const goButton = document.querySelector("button#go");
        const stopButton = document.querySelector("button#stop");
        const formSelector = document.querySelector("select#form");
        const shiftLeftButton = document.querySelector("button#left");
        const shiftRightButton = document.querySelector("button#right");
        const shiftUpButton = document.querySelector("button#up");
        const shiftDownButton = document.querySelector("button#down");
        const offsetXButton = document.querySelector("button#offset-x");
        const offsetYButton = document.querySelector("button#offset-y");
        const livecountButton = document.querySelector("button#livecount");
        
        // Event Listener für Buttons
        resetButton.addEventListener("click", () => this.grid.reset());
        goButton.addEventListener("click", () => this.grid.getGoing());
        stopButton.addEventListener("click", () => this.grid.pause());
        
        formSelector.addEventListener("change", (e) => {
            this.grid.setPattern(e.target.value);
            e.target.value = "-- drop --";
        });
        
        shiftLeftButton.addEventListener("click", () => this.grid.shift("left"));
        shiftRightButton.addEventListener("click", () => this.grid.shift("right"));
        shiftUpButton.addEventListener("click", () => this.grid.shift("up"));
        shiftDownButton.addEventListener("click", () => this.grid.shift("down"));
        
        // Event Listener für Grid-Event-Updates
        document.addEventListener('grid-offset-changed', (e) => {
            offsetXButton.textContent = `_x: ${e.detail.x}`;
            offsetYButton.textContent = `_y: ${e.detail.y}`;
        });
        
        document.addEventListener('livecount-changed', (e) => {
            livecountButton.textContent = `#: ${e.detail.count}`;
        });
    }
}

export { UIController };