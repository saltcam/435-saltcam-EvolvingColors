class Animat {

    constructor(game, x, y, gene) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.gene = gene;
        this.energy = 50;
    }

    move() {
        let x = this.x;
        let y = this.y;

        let best = Infinity;

        for(var i = -1; i < 2; i++) { // find cell to move to
            for(var j = -1; j < 2; j++) {
                let newCoords = this.game.screenWrap(this.x + i, this.y + j, PARAMS.dimension);
                let plant = this.game.cellBoard.board[newCoords.x][newCoords.y];

                const diff = Math.abs(this.gene - (plant ? plant.gene : Infinity));

                if(diff < best) {
                    best = diff;
                    x = newCoords.x;
                    y = newCoords.y;
                }
            }
        }

        this.x = x;
        this.y = y;
    }

    hueDifference (plant) {
        let diff = plant ? Math.abs(this.gene - plant.gene) : 180;
        if (diff > 180) diff = 360 - diff; // now diff is between 0-180 and wraps
        return (90 - diff) / 90;
    }

    eat() {
        const growthrate = parseInt(document.getElementById("animatgrowth").value);
        const selectivity = parseInt(document.getElementById("animatselection").value);
        const plant = this.game.cellBoard.board[this.x][this.y];
        const diff = this.hueDifference(plant);

        if(plant && diff >= selectivity) {
            this.game.cellBoard.board[this.x][this.y] = null;
            this.energy += 80 / growthrate * diff;
        }
    }

    reproduce() {
        if(this.energy > 80) {
            this.energy -= 80;

            gameEngine.addEntity(new Animat(this.game, this.x, this.y, this.mutate()));
        }
    }

    die() {
        this.removeFromWorld = true;
    }

    mutate() {
        return (this.gene + (Math.floor(Math.random() * 11) - 5) + 360) % 360;
    }

    update() {
        this.move();
        this.eat();
        this.reproduce();
        if(this.energy < 1 || Math.random() < 0.01) this.die();
    }

    draw(ctx) {
        ctx.fillStyle = hsl(this.gene,75,50);
        ctx.strokeStyle = "light gray";
        ctx.beginPath();
        ctx.arc(this.x * 7, this.y * 7, 7/2 - 1, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    /*
    let size = 8;
                    // let gap = 1;
                    ctx.fillStyle = hsl(plant.gene,70 + plant.age,75);
                    ctx.fillRect(i * size, j * size, size - 2, size - 2);
     */

}