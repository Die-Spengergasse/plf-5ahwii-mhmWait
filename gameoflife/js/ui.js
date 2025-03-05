"use strict";
import { Patterns, PatternCategories, PatternNames } from './patterns.js';

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

        // New speed control buttons
        const speedButtons = document.querySelectorAll(".speed-btn");
        const advance1Button = document.querySelector("#advance-1");
        const advance10Button = document.querySelector("#advance-10");
        const advance100Button = document.querySelector("#advance-100");

        // Event Listener für Buttons
        resetButton.addEventListener("click", () => this.grid.reset());
        goButton.addEventListener("click", () => this.grid.getGoing());
        stopButton.addEventListener("click", () => this.grid.pause());

        // Speed control event listeners
        speedButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                // Remove active class from all speed buttons
                speedButtons.forEach(btn => btn.classList.remove("active"));
                
                // Add active class to clicked button
                e.target.classList.add("active");
                
                // Set simulation speed
                const speed = parseInt(e.target.getAttribute("data-speed"));
                this.grid.setSimulationSpeed(speed);
            });
        });

        // Generation advance event listeners
        advance1Button.addEventListener("click", () => this.grid.advanceGenerations(1));
        advance10Button.addEventListener("click", () => this.grid.advanceGenerations(10));
        advance100Button.addEventListener("click", () => this.grid.advanceGenerations(100));
        
        formSelector.addEventListener("change", (e) => {
            if (e.target.value && e.target.value !== "-- Muster auswählen --") {
                this.grid.reset();
                this.grid.setPattern(e.target.value);
                e.target.value = "-- Muster auswählen --";
            }
        });

        shiftLeftButton.addEventListener("click", () => this.grid.shift("left"));
        shiftRightButton.addEventListener("click", () => this.grid.shift("right"));
        shiftUpButton.addEventListener("click", () => this.grid.shift("up"));
        shiftDownButton.addEventListener("click", () => this.grid.shift("down"));

        // Event Listener für Grid-Event-Updates
        document.addEventListener("grid-offset-changed", (e) => {
            offsetXButton.textContent = `_x: ${e.detail.x}`;
            offsetYButton.textContent = `_y: ${e.detail.y}`;
        });

        document.addEventListener("livecount-changed", (e) => {
            livecountButton.textContent = `#: ${e.detail.count}`;
        });
    }

    initializePatternSelector() {
        const formSelector = document.querySelector("select#form");

        
        while (formSelector.firstChild) {
            formSelector.removeChild(formSelector.firstChild);
        }

        
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "-- Muster auswählen --";
        defaultOption.selected = true;
        formSelector.appendChild(defaultOption);

        
        for (const [category, patterns] of Object.entries(PatternCategories)) {
            const group = document.createElement("optgroup");
            group.label = category;

            patterns.forEach((pattern) => {
                const option = document.createElement("option");
                option.value = pattern;
                option.textContent = PatternNames[pattern] || pattern;
                group.appendChild(option);
            });

            formSelector.appendChild(group);
        }
    }
}

export { UIController };
