class Plant {
    constructor(game, x, y, gene) {
        this.game = game;
        this.x = x;
        this.y = y;
        // this.randomizeBoard();
        this.gene = gene;  // the hue we draw in
        this.age = 0;   // the saturation/light value we use. goes up each tick.
        this.removeFromWorld = false;
    }

    // check if age is above a certain point -> attempt reproduce in adjacent tile
    // roll 1% chance of randomly dying
    update() {
        this.age++;

        if (this.age >= PARAMS.plantGrowth) {
            this.attemptReproduce();
        }

    }

    // checks neighboring tiles if they lack a plant, if so, select one at random and make a mutated version.
    attemptReproduce() {
        let validAdjacents = this.game.checkAdjacents();
        // if success {
        this.game.addPlant(new Plant(this.game, x, y, gene));

    }

    draw() {

    }
}