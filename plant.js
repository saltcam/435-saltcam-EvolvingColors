class Plant {
    constructor(game, gene) {
        this.game = game;
        // this.x = x;
        // this.y = y;
        // this.randomizeBoard();
        this.gene = gene;  // the hue we draw in
        this.age = 0;   // the saturation/light value we use. goes up each tick.
        // this.removeFromWorld = false;
        // console.log("I'm in!");
    }

    // check if age is above a certain point -> attempt reproduce in adjacent tile
    // roll 1% chance of randomly dying
    update(x, y) {
        if (this.age < PARAMS.plantGrowth) {
            this.age++;
        }

        if (this.age >= PARAMS.plantGrowth) {
            // this.attemptReproduce();
            // return a new adjacent plant that has mutated
            //new Plant(this.game, validAdjacents[rand].x, validAdjacents[rand].y, this.mutate())
            let newCoords = this.game.screenWrap(x - 1 + randomInt(3), y - 1 + randomInt(3));
            this.game.addPlant(newCoords.x,newCoords.y, this.mutate());

        }

    }

    // checks neighboring tiles if they lack a plant, if so, select one at random and make a mutated version.
    // attemptReproduce() {
    //     // let validAdjacents = this.game.checkAdjacents(this.x, this.y);
    //     //  if (validAdjacents.length > 0) {
    //     //      let rand = Math.floor(Math.random() * (validAdjacents.length-1));
    //          this.game.addPlant(new Plant(this.game, validAdjacents[rand].x, validAdjacents[rand].y, this.mutate()));
    //      // }
    // }

    // return a slightly offset hue value from this plant's
    mutate() {
        //
        // if (newGene > 360) {
        //     newGene = 360;
        // }
        // if (newGene < 0) {
        //     newGene = 0;
        // }
        return (this.gene + (Math.floor(Math.random() * 51) - 25) + 360) % 360;
    }

    // draw(ctx, game) {
    //     let size = 8;
    //     let gap = 1;
    //     ctx.fillStyle = hsl(this.gene,20 + this.age,50);
    //     ctx.fillRect(this.x * size + gap, this.y * size + gap, size - 2 * gap, size - 2 * gap);
    // }
}