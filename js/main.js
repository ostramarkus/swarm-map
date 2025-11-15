let map, mapInterface;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	mapInterface = new MapInterface(256)
	mapInterface.createMap(32);
	mapInterface.map.randomize();
	console.log(mapInterface)
}

function draw() {
	clear();
	mapInterface.update();
	mapInterface.render();
}

function mousePressed() {
	mapInterface.mousePressed();
}

function mouseReleased() {
	mapInterface.mouseReleased();
}

function keyPressed() {
	if (keyCode == 32) {
		mapInterface.dumpMap();
	} else if (keyCode == 83) {	// s
		mapInterface.paintMode = "start";
	} else if (keyCode == 84) {	// t
		mapInterface.paintMode = "target";
	} else if (keyCode == 80) {	// p
		mapInterface.paintMode = "terrain";
	} else if (keyCode == 68) {	// d
		mapInterface.saveMap();
	} else if (keyCode == 76) {	// l
		mapInterface.loadMap();
	} else if (keyCode == 13) {	// Enter
		mapInterface.runSwarm();
	} else if (keyCode == 65) {	// a
		mapInterface.swarm.run = !mapInterface.swarm.run;
	}
}