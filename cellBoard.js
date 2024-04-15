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

            for (let i = 0; i < this.dimension; i++) {
                for (let j = 0; j < this.dimension; j++) {
                    if (this.board[i][j]) {
                        this.board[i][j].update(i, j);
                        if(Math.random() < 0.001) this.board[i][j] = null;

                }
            }
        }
    }

    draw(ctx) {

        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                let plant = this.board[i][j];
                if (plant) {
                    let size = 8;
                    // let gap = 1;
                    ctx.fillStyle = hsl(plant.gene,70 + plant.age,50);
                    ctx.fillRect(i * size, j * size, size - 2, size - 2);

                }
            }
        }

    }
}