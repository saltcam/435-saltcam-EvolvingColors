class CellBoard {
    constructor(game, dimension) {
        this.game = game;
        this.dimension = dimension;
        this.board = this.newBoard();
        // this.randomizeBoard();
        this.ticks = 0;
        this.tickCount = 0;
        this.removeFromWorld = false;
    }

    newBoard() {
        let newBoard = [];
        for (let i = 0; i < this.dimension; i++) {
            newBoard.push([]);    // makes a new array for this slot
        }
        return newBoard;
    }


    update() {

        this.speed = parseInt(document.getElementById('speed').value, 10);

        if (this.tickCount++ >= this.speed && this.speed !== 150) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            for (let i = 0; i < this.dimension; i++) {
                for (let j = 0; j < this.dimension; j++) {
                    if (this.board[i][j]) {
                        this.board[i][j].update(i, j);
                        if(Math.random() < 0.001) this.board[i][j] = null;
                    }
                }
            }
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

        // console.log("aliveNeighbors: " + aliveNeighbors + ", " + alive);

        return alive;
    }
    draw(ctx) {

        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                let plant = this.board[i][j];
                if (plant) {
                    let size = 8;
                    // let gap = 1;
                    ctx.fillStyle = hsl(plant.gene,70 + plant.age,75);
                    ctx.fillRect(i * size, j * size, size - 2, size - 2);
                    // let size = 8;
                    // let gap = 1;
                    // ctx.fillStyle = "Black";
                    // for (let col = 1; col < this.width-1; col++) {
                    //     for (let row = 1; row < this.height-1; row++) {
                    //         if (this.board[col][row] === 1){
                    //             // ctx.arc(col * size + gap, row * size + gap, size - 2 * gap, 0, 2 * Math.PI);
                    //             // ctx.stroke();
                    //             ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
                    //         }
                    //     }
                    // }
                }
            }
        }

    }
}