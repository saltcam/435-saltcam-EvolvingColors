// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        this.cellBoard = new CellBoard(this, PARAMS.dimension);

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};
        this.ticks = 0;
        this.tickCount = 0;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
        // this.addEntity(new CellBoard(this, PARAMS.dimension));
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

    addPlant(x, y, hue) {
        console.log("Planting");
        this.cellBoard.board[x][y] = new Plant(this, hue);
    }

    addRandomPlant(){
        this.addPlant(
            Math.floor(Math.random() * PARAMS.dimension),
            Math.floor(Math.random() * PARAMS.dimension),
            Math.floor(Math.random() * 360));
    }

    addRandomAnimat(){
        this.addEntity(new Animat(this,
            Math.floor(Math.random() * PARAMS.dimension),
            Math.floor(Math.random() * PARAMS.dimension),
            Math.floor(Math.random() * 360)));
    }

    clearAll() {
        this.cellBoard.board = this.cellBoard.newBoard();
        this.entities = [this.entities[0]];
    }

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.cellBoard.draw(this.ctx);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }

        // Draw latest things first
        // for (let i = this.plants.length - 1; i >= 0; i--) {
        //     this.plants[i].draw(this.ctx, this);
        // }
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

        this.cellBoard.update();

    };

    loop() {
        this.clockTick = this.timer.tick();
        let speed = parseInt(document.getElementById('speed').value, 10);
        if (this.tickCount++ >= speed && speed !== 150) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;


            this.update();
            this.draw();
        }
    }


    screenWrap(tarX, tarY) {
        return {x: (tarX + PARAMS.dimension) % PARAMS.dimension, y: (tarY + PARAMS.dimension) % PARAMS.dimension};
    }

}