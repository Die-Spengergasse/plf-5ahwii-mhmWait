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
    ],

    block: [
        {row: 2, col: 2}, {row: 2, col: 3},
        {row: 3, col: 2}, {row: 3, col: 3}
    ],

    beehive: [
        {row: 2, col: 3}, {row: 2, col: 4},
        {row: 3, col: 2}, {row: 3, col: 5},
        {row: 4, col: 3}, {row: 4, col: 4}
    ],

    loaf: [
        {row: 2, col: 3}, {row: 2, col: 4},
        {row: 3, col: 2}, {row: 3, col: 5},
        {row: 4, col: 3}, {row: 4, col: 5},
        {row: 5, col: 4}
    ],

    boat: [
        {row: 2, col: 2}, {row: 2, col: 3},
        {row: 3, col: 2}, {row: 3, col: 4},
        {row: 4, col: 3}
    ],

    // Raumschiffe
    lwss: [
        {row: 2, col: 2}, {row: 2, col: 5},
        {row: 3, col: 6},
        {row: 4, col: 2}, {row: 4, col: 6},
        {row: 5, col: 3}, {row: 5, col: 4}, {row: 5, col: 5}, {row: 5, col: 6}
    ],

    // Weitere Oszillatoren
    clock: [
        {row: 2, col: 3}, {row: 2, col: 4},
        {row: 3, col: 2}, {row: 3, col: 5},
        {row: 4, col: 2}, {row: 4, col: 5},
        {row: 5, col: 3}, {row: 5, col: 4}
    ],

    pentadecathlon: [
        {row: 10, col: 9}, {row: 10, col: 10}, {row: 10, col: 11},
        {row: 11, col: 10},
        {row: 12, col: 10},
        {row: 13, col: 9}, {row: 13, col: 10}, {row: 13, col: 11},
        {row: 16, col: 9}, {row: 16, col: 10}, {row: 16, col: 11},
        {row: 17, col: 10},
        {row: 18, col: 10},
        {row: 19, col: 9}, {row: 19, col: 10}, {row: 19, col: 11}
    ],

    // Methuselahs
    rpentomino: [
        {row: 10, col: 11}, {row: 10, col: 12},
        {row: 11, col: 10}, {row: 11, col: 11},
        {row: 12, col: 11}
    ],

    diehard: [
        {row: 10, col: 17},
        {row: 11, col: 11}, {row: 11, col: 12},
        {row: 12, col: 12}, {row: 12, col: 16}, {row: 12, col: 17}, {row: 12, col: 18}
    ],

    acorn: [
        {row: 10, col: 12},
        {row: 11, col: 14},
        {row: 12, col: 11}, {row: 12, col: 12}, {row: 12, col: 15}, {row: 12, col: 16}, {row: 12, col: 17}
    ],

    // Gosper Glider Gun - eines der bekanntesten Muster
    gliderGun: [
        // Linker Block
        {row: 5, col: 1}, {row: 5, col: 2},
        {row: 6, col: 1}, {row: 6, col: 2},
        
        // Linke Struktur
        {row: 5, col: 11}, {row: 6, col: 11}, {row: 7, col: 11},
        {row: 4, col: 12}, {row: 8, col: 12},
        {row: 3, col: 13}, {row: 9, col: 13},
        {row: 3, col: 14}, {row: 9, col: 14},
        {row: 6, col: 15},
        {row: 4, col: 16}, {row: 8, col: 16},
        {row: 5, col: 17}, {row: 6, col: 17}, {row: 7, col: 17},
        {row: 6, col: 18},
        
        // Rechte Struktur
        {row: 3, col: 21}, {row: 4, col: 21}, {row: 5, col: 21},
        {row: 3, col: 22}, {row: 4, col: 22}, {row: 5, col: 22},
        {row: 2, col: 23}, {row: 6, col: 23},
        {row: 1, col: 25}, {row: 2, col: 25}, {row: 6, col: 25}, {row: 7, col: 25},
        
        // Rechter Block
        {row: 3, col: 35}, {row: 3, col: 36},
        {row: 4, col: 35}, {row: 4, col: 36}
    ]
};

const PatternNames = {
    "blinker": "Blinker",
    "glider": "Gleiter",
    "beacon": "Bake",
    "toad": "Kröte",
    "pulsar": "Pulsar",
    "block": "Block",
    "beehive": "Bienenstock",
    "loaf": "Laib",
    "boat": "Boot",
    "lwss": "Leichtes Raumschiff",
    "clock": "Uhr",
    "pentadecathlon": "Pentadecathlon",
    "rpentomino": "R-Pentomino",
    "diehard": "Diehard",
    "acorn": "Eichel",
    "gliderGun": "Gosper Gleiterkanone"
};

const PatternDescriptions = {
    "blinker": "Einfacher Oszillator mit Periode 2.",
    "glider": "Bewegt sich diagonal über das Grid.",
    "beacon": "Oszillator mit Periode 2, bei dem zwei Blöcke abwechselnd erscheinen und verschwinden.",
    "toad": "Oszillator mit Periode 2, der zwischen zwei Formen wechselt.",
    "pulsar": "Komplexer Oszillator mit Periode 3 und dreifacher Symmetrie.",
    "block": "Stabile 2x2-Formation, die sich nie ändert.",
    "beehive": "Stabile sechszellige Formation, die einem Bienenstock ähnelt.",
    "loaf": "Stabile Formation, die einem Brotlaib ähnelt.",
    "boat": "Stabile fünfzellige Formation in Form eines Bootes.",
    "lwss": "Leichtes Raumschiff, bewegt sich horizontal.",
    "clock": "Oszillator mit Periode 2, der wie eine rotierende Uhr aussieht.",
    "pentadecathlon": "Langlebiger Oszillator mit Periode 15.",
    "rpentomino": "Kleines Muster, das eine lange und chaotische Entwicklung durchläuft.",
    "diehard": "Muster, das nach 130 Generationen verschwindet.",
    "acorn": "Kleines Muster, das zu einer komplexen Struktur heranwächst.",
    "gliderGun": "Erzeugt kontinuierlich Gleiter, der erste entdeckte unendliche Wachstumsmechanismus."
};

const PatternCategories = {
    "Oszillatoren": ["blinker", "toad", "beacon", "clock", "pulsar", "pentadecathlon"],
    "Still Lifes": ["block", "beehive", "loaf", "boat"],
    "Raumschiffe": ["glider", "lwss"],
    "Methuselahs": ["rpentomino", "diehard", "acorn"],
    "Spezielle Muster": ["gliderGun"]
};

export { Patterns ,PatternCategories, PatternNames, PatternDescriptions};