const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	document.getElementById("plant").addEventListener("click", () => {
		gameEngine.addRandomPlant();
	});
	document.getElementById("animat").addEventListener("click", () => {
		gameEngine.addRandomAnimat();
	});
	document.getElementById("clear").addEventListener("click", () => {
		gameEngine.clearAll();
	});

	gameEngine.init(ctx);
	gameEngine.start();
});
