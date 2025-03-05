'use strict';


const Patterns = {
    // Blinker-Muster (3 Zellen in einer Reihe, oszilliert)
    blinker: [
        {row: 2, col: 3},
        {row: 3, col: 3},
        {row: 4, col: 3}
    ],
    
    // Gleiter-Muster (bewegt sich diagonal über das Grid)
    glider: [
        {row: 2, col: 3},
        {row: 3, col: 4},
        {row: 4, col: 2},
        {row: 4, col: 3},
        {row: 4, col: 4}
    ],
    
    // Bake-Muster (oszillierendes Muster mit Periode 2)
    beacon: [
        {row: 2, col: 2},
        {row: 2, col: 3},
        {row: 3, col: 2},
        {row: 3, col: 3},
        {row: 4, col: 4},
        {row: 4, col: 5},
        {row: 5, col: 4},
        {row: 5, col: 5}
    ],
    
    // Kröte-Muster (oszillierendes Muster mit Periode 2)
    toad: [
        {row: 2, col: 3},
        {row: 2, col: 4},
        {row: 2, col: 5},
        {row: 3, col: 2},
        {row: 3, col: 3},
        {row: 3, col: 4}
    ],
    
    // Pulsar-Muster (großes oszillierendes Muster mit Periode 3)
    pulsar: [
        {row: 2, col: 4}, {row: 2, col: 5}, {row: 2, col: 6}, {row: 2, col: 10}, {row: 2, col: 11}, {row: 2, col: 12},
        {row: 4, col: 2}, {row: 4, col: 7}, {row: 4, col: 9}, {row: 4, col: 14},
        {row: 5, col: 2}, {row: 5, col: 7}, {row: 5, col: 9}, {row: 5, col: 14},
        {row: 6, col: 2}, {row: 6, col: 7}, {row: 6, col: 9}, {row: 6, col: 14},
        {row: 7, col: 4}, {row: 7, col: 5}, {row: 7, col: 6}, {row: 7, col: 10}, {row: 7, col: 11}, {row: 7, col: 12},
        {row: 9, col: 4}, {row: 9, col: 5}, {row: 9, col: 6}, {row: 9, col: 10}, {row: 9, col: 11}, {row: 9, col: 12},
        {row: 10, col: 2}, {row: 10, col: 7}, {row: 10, col: 9}, {row: 10, col: 14},
        {row: 11, col: 2}, {row: 11, col: 7}, {row: 11, col: 9}, {row: 11, col: 14},
        {row: 12, col: 2}, {row: 12, col: 7}, {row: 12, col: 9}, {row: 12, col: 14},
        {row: 14, col: 4}, {row: 14, col: 5}, {row: 14, col: 6}, {row: 14, col: 10}, {row: 14, col: 11}, {row: 14, col: 12}
    ]
};

export { Patterns };