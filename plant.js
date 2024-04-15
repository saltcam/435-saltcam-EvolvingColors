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
        const growthrate = parseInt(document.getElementById("plantgrowth").value);

        if (this.age < 80) {
            this.age += 80/growthrate
        }

        if (this.age >= growthrate) {
            // this.attemptReproduce();
            // return a new adjacent plant that has mutated
            //new Plant(this.game, validAdjacents[rand].x, validAdjacents[rand].y, this.mutate())
            let newCoords = this.game.screenWrap(x - 1 + randomInt(3), y - 1 + randomInt(3));
            this.game.addPlant(newCoords.x,newCoords.y, this.mutate());
            this.age -= 80;
        }

    }

    // return a slightly offset hue value from this plant's
    mutate() {
        return (this.gene + (Math.floor(Math.random() * 11) - 5) + 360) % 360;
    }
}