// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        this.plants = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    addPlant(plant) {
        this.plants.push(plant);
    }

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
        // Draw latest things first
        for (let i = this.plants.length - 1; i >= 0; i--) {
            this.plants[i].draw(this.ctx, this);
        }
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        let plantCount = this.plants.length;

        for (let i = 0; i < plantCount; i++) {
            let plant = this.plants[i];

            if (!plant.removeFromWorld) {
                plant.update();
            }
        }

        for (let i = this.plants.length - 1; i >= 0; --i) {
            if (this.plants[i].removeFromWorld) {
                this.plants.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    }

    checkAdjacents(originalX, originalY){

        const upDir= this.screenWrap(originalX, originalY + 1);
        // let UP = true;
        const leftDir= this.screenWrap(originalX - 1, originalY);
        // let LEFT = true;
        const rightDir= this.screenWrap(originalX + 1, originalY);
        // let RIGHT = true;
        const downDir= this.screenWrap(originalX, originalY - 1);
        // let DOWN = true;
        let validCoords =[
            {x: upDir.x, y: upDir.y},
            {x: leftDir.x, y: leftDir.y},
            {x: rightDir.x, y: rightDir.y},
            {x: downDir.x, y: downDir.y}];

        let validDirs = [true, true, true, true];

        for (let i = 0; i < this.plants.length; i++) {
            if (this.plants.x === upDir.x && this.plants.y === upDir.y) {
                validDirs[0] = false;
            }
            if (this.plants.x === leftDir.x && this.plants.y === leftDir.y) {
                validDirs[1] = false;
            }
            if (this.plants.x === rightDir.x && this.plants.y === rightDir.y) {
                validDirs[2] = false;
            }
            if (this.plants.x === downDir.x && this.plants.y === downDir.y) {
                validDirs[3] = false;
            }
        }

        for (let i = validDirs.length-1; i > 0; i--) {
            if (!validDirs[i]) {    // if not a valid direction, remove the set of coords that correspond to it.
                validCoords.splice(i, 1);
            }
        }

        return validCoords;
    }

    screenWrap(tarX, tarY) {
        return {x: (tarX + PARAMS.dimension) % PARAMS.dimension, y: (tarY + PARAMS.dimension) % PARAMS.dimension};
    }

}