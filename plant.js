class Plant {
    constructor(game, x, y, gene) {
        this.game = game;
        this.x = x;
        this.y = y;
        // this.randomizeBoard();
        this.gene = gene;  // the hue we draw in
        this.age = 0;   // the saturation/light value we use. goes up each tick.
        this.removeFromWorld = false;
        console.log("I'm in!");
    }

    // check if age is above a certain point -> attempt reproduce in adjacent tile
    // roll 1% chance of randomly dying
    update() {
        this.age++;

        if (this.age >= PARAMS.plantGrowth) {
            this.attemptReproduce();
        }

        if (Math.floor((Math.random() * 100) + 1) <= 1){
            this.removeFromWorld = true;
        }

    }

    // checks neighboring tiles if they lack a plant, if so, select one at random and make a mutated version.
    attemptReproduce() {
        let validAdjacents = this.game.checkAdjacents();
         if (validAdjacents.length > 0) {
             let rand = Math.floor(Math.random() * (validAdjacents.length-1));
             this.game.addPlant(new Plant(this.game, validAdjacents[rand].x, validAdjacents[rand].y, this.mutate()));
         }
    }

    // TODO return a slightly offset hue value from this plant's
    mutate() {
        return this.gene + (Math.floor(Math.random() * 51) - 25);
    }

    draw(ctx, game) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = hsl(this.gene,20 + this.age,50);
        ctx.fillRect(this.x * size + gap, this.y * size + gap, size - 2 * gap, size - 2 * gap);
    }
}