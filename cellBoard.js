class CellBoard {
    constructor(game, width, height) {
        this.game = game;
        this.width = width+1;
        this.height = height+1;
        this.board = this.newBoard();
        this.randomizeBoard();
        this.ticks = 0;
        this.tickCount = 0;
        this.removeFromWorld = false;
    }

    newBoard() {
        let newBoard = [];
        for (let i = 0; i < this.width; i++) {
            newBoard.push([]);    // makes a new array for this slot
            for (let j = 0; j < this.height; j++) {
                newBoard[i][j] = 0;   // fill with dead cells (really cool game by the way)
            }
        }

        return newBoard;
    }

    randomizeBoard() {
        for (let i = 1; i < this.width-1; i++) {
            for (let j = 1; j < this.height-1; j++) {
                this.board[i][j] = randomInt(2);    // 1 = alive, 0 = dead;
            }
        }
    }

    update() {

        this.speed = 50;

        if (this.tickCount++ >= this.speed && this.speed !== 120) {
            this.tickCount = 0;
            this.ticks++;

            let nextBoard = this.newBoard();

            for (let i = 1; i < this.width - 1; i++) {
                for (let j = 1; j < this.height - 1; j++) {
                    nextBoard[i][j] = this.checkSurround(i, j);
                }
            }

            this.board = nextBoard;
        }
    }

    checkSurround(col, row) {

        let alive = 0;  // the state to return
        let aliveNeighbors = 0;

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (this.board[col + i][row + j] === 1) {   // if alive neighbor
                    aliveNeighbors++;
                }
            }
        }
        if (this.board[col][row] === 1) {

            aliveNeighbors--;
        }

        // 0-1 = die
        // 2-3 = live
        // 4+ = die
        // 3 (NOT 2) = revive
        // if (aliveNeighbors < 2) {
            alive = 0;
        // }
        if (this.board[col][row] === 1 && (aliveNeighbors === 2 || aliveNeighbors === 3)) {    // if we are already alive, stay alive
            alive = 1;
        }
        if (this.board[col][row] === 0 && aliveNeighbors === 3) {    // if we are dead but have 3, rebirth
            alive = 1;
        }
        // else {   // if too many neighbors, die
        //     alive = 0;
        // }

        console.log("aliveNeighbors: " + aliveNeighbors + ", " + alive);

        return alive;
    }
    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Black";
        for (let col = 1; col < this.width-1; col++) {
            for (let row = 1; row < this.height-1; row++) {
                let cell = this.board[col][row];
                if (cell === 1) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    }
}