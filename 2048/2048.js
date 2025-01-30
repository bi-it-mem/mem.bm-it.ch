document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const scoreValue = document.getElementById("score-value");
    const resetButtonContainer = document.createElement("div");
    resetButtonContainer.id = "reset-container";
    document.body.appendChild(resetButtonContainer);
    
    let score = 0;
    let grid = Array(4).fill(null).map(() => Array(4).fill(0));
    let availableNumbers = [2]; // Beginnt nur mit 2

    const numberColors = {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e"
    };

    function createBoard() {
        board.innerHTML = "";
        grid.forEach(row => {
            row.forEach(value => {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.textContent = value === 0 ? "" : value;
                tile.style.backgroundColor = value === 0 ? "white" : numberColors[value] || "#776e65";
                board.appendChild(tile);
            });
        });
    }

    function getEmptyTiles() {
        let emptyTiles = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (grid[r][c] === 0) {
                    emptyTiles.push({ r, c });
                }
            }
        }
        return emptyTiles;
    }

    function addRandomTile() {
        const emptyTiles = getEmptyTiles();
        if (emptyTiles.length > 0) {
            const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            const newValue = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
            grid[r][c] = newValue;
        }
    }

    function slideRow(row) {
        let newRow = row.filter(val => val);  // Entferne 0-Werte
        let merged = Array(4).fill(false);

        // Verschiebe alle Zahlen nach links
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1] && !merged[i] && !merged[i + 1]) {
                newRow[i] *= 2;  // Zusammenführen der gleichen Zahlen
                score += newRow[i];
                if (!availableNumbers.includes(newRow[i])) {
                    availableNumbers.push(newRow[i]);
                }
                newRow.splice(i + 1, 1); // Lösche die zusammengeführte Zahl
                merged[i] = true;
            }
        }

        // Auffüllen der Reihe mit Nullen
        while (newRow.length < 4) newRow.push(0);
        return newRow;
    }

    function slideGrid(direction) {
        let moved = false;
        let newGrid = Array(4).fill(null).map(() => Array(4).fill(0));

        if (direction === "up" || direction === "down") {
            // Spaltenweise Bewegung
            for (let col = 0; col < 4; col++) {
                let column = [];
                for (let row = 0; row < 4; row++) {
                    column.push(grid[row][col]);
                }
                column = direction === "up" ? slideRow(column) : slideRow(column.reverse()).reverse();
                for (let row = 0; row < 4; row++) {
                    newGrid[row][col] = column[row];
                }
            }
        } else {
            // Zeilenweise Bewegung
            for (let row = 0; row < 4; row++) {
                let newRow = direction === "left" ? slideRow(grid[row]) : slideRow(grid[row].reverse()).reverse();
                for (let col = 0; col < 4; col++) {
                    newGrid[row][col] = newRow[col];
                }
            }
        }

        // Prüfen, ob sich das Grid geändert hat
        moved = !newGrid.every((row, rIdx) => row.every((val, cIdx) => val === grid[rIdx][cIdx]));
        if (moved) {
            grid = newGrid;
            addRandomTile();
            updateGame();
            checkGameOver(); // Überprüfen ob das Spiel zu Ende ist
        }
    }

    function updateGame() {
        createBoard();
        scoreValue.textContent = score;
    }

    function checkGameOver() {
        const emptyTiles = getEmptyTiles();
        if (emptyTiles.length === 0) {
            // Überprüfen, ob noch eine Bewegung möglich ist
            let noMovesLeft = true;
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    if (
                        (r < 3 && grid[r][c] === grid[r + 1][c]) || 
                        (c < 3 && grid[r][c] === grid[r][c + 1])
                    ) {
                        noMovesLeft = false;
                        break;
                    }
                }
            }
            
            // Wenn keine Bewegungen mehr möglich sind, zeige den Reset-Button
            if (noMovesLeft) {
                showResetButton();
            }
        }
    }

    function showResetButton() {
        const resetButton = document.createElement("button");
        resetButton.textContent = "Neustart";
        resetButton.addEventListener("click", resetGame);
        resetButtonContainer.innerHTML = ""; // Entferne vorherige Buttons
        resetButtonContainer.appendChild(resetButton);
    }

    function resetGame() {
        score = 0;
        grid = Array(4).fill(null).map(() => Array(4).fill(0));
        availableNumbers = [2];
        addRandomTile();
        addRandomTile();
        updateGame();
        resetButtonContainer.innerHTML = ""; // Verstecke den Reset-Button
    }

    document.addEventListener("keydown", event => {
        switch (event.key) {
            case "ArrowUp": slideGrid("up"); break;
            case "ArrowRight": slideGrid("right"); break;
            case "ArrowDown": slideGrid("down"); break;
            case "ArrowLeft": slideGrid("left"); break;
        }
    });

    addRandomTile();
    addRandomTile();
    updateGame();
});
