class MapInterface  {
	constructor(renderSize=256) {
		this.hoverCell = null;
		this.renderSize = renderSize;
		this.position = {'x': width * 0.5 - this.renderSize / 2,
							  'y': height * 0.5 - this.renderSize / 2}
		this.mouseIsPressed = false;
		this.addMode = false;
		this.paintMode = "terrain"; //"start", "target"
        this.stroke = false;
		this.swarm = null;
	}

	createMap(mapSize=32) {
		this.map = new Map(mapSize);
	}    

	checkHover(x=mouseX, y=mouseY) {
		if (this.isInsideMap(x, y)) {
			let coord = this.getCellCoordAtPixel(x, y);
			this.hoverCell = {'x': coord.x, 'y': coord.y};
		} else {
			this.hoverCell = null;
		}
	}

	getCellCoordAtPixel(pixelX, pixelY) {
		if (!this.isInsideMap(pixelX, pixelY)) return null;
		
		let relX = pixelX - this.position.x;
		let relY = pixelY - this.position.y;
		let cellX = floor(relX / this.renderSize * this.map.mapSize);
		let cellY = floor(relY / this.renderSize * this.map.mapSize);	
		return {'x': cellX, 'y': cellY}		
	}

	getPixelCoordForCell(x, y) {
		let cellSize = this.renderSize / this.map.mapSize;
		
		let pixX = cellSize * x;
		let pixY = cellSize * y;
		return {'x': pixX, 'y': pixY}
	}
	
	isInsideMap(x, y) {
		let insideX = x > this.position.x && x < this.position.x + this.renderSize;
		let insideY = y > this.position.y && y < this.position.y + this.renderSize;
		return insideX && insideY
	}

	updateMap() {
		this.checkHover(mouseX, mouseY);
		if (this.mouseIsPressed && this.isInsideMap(mouseX, mouseY)) {
			this.map.setCellValue(this.addMode, this.hoverCell.x, this.hoverCell.y);
		}
	}

	mousePressed() {
		if (!this.isInsideMap(mouseX, mouseY)) return;

		if (this.paintMode == "start") {
			this.map.start = {'x': this.hoverCell.x, 'y': this.hoverCell.y};
			console.log(this.map.start);
		}

		if (this.paintMode == "target") {
			this.map.target = {'x': this.hoverCell.x, 'y': this.hoverCell.y};
			console.log(this.map.target);			
		}
		
		if (this.paintMode == "terrain") {
			this.mouseIsPressed = true;
			let cellValue = this.map.getCellValue(this.hoverCell.x, this.hoverCell.y)
			if (cellValue == false) {
				this.addMode = true;
			} else {
				this.addMode = false;
			}
		}
	}

	mouseReleased() {
		this.mouseIsPressed = false;
	}

	paintCell(x, y, c=color(255, 0, 0)) {
		fill(c);
		let cellPos = this.getPixelCoordForCell(x, y);
		let cellSize = this.renderSize / this.map.mapSize;		
		rect(cellPos.x, cellPos.y, cellSize, cellSize);
	}

	loadMap() {
		let loadData = mapJSONData;
		//let loadData = loadJSON('/assets/map.json');
		this.map = new Map(loadData.mapSize)
		this.map.cells = loadData.cells;
		this.map.start = loadData.start;
		this.map.target = loadData.target;
	}

	saveMap() {
		const now = new Date();
		const yyyy = now.getFullYear();
		const mm = String(now.getMonth() + 1).padStart(2, "0");
		const dd = String(now.getDate()).padStart(2, "0");
		const hh = String(now.getHours()).padStart(2, "0");
		const min = String(now.getMinutes()).padStart(2, "0");
		const timestamp= `${yyyy}${mm}${dd}T${hh}${min}`;
		
		let saveData = {
			'mapSize' : this.map.mapSize,
			'cells' : this.map.cells,
			'start' : this.map.start,
			'target' : this.map.target,
		}
		
		saveJSON(saveData, "map" + timestamp + ".json");
	}

	render() {
        if (this.stroke) {
            this.stroke(90);
        } else {
            noStroke();
        }
		if (this.map !== null) {
			this.renderMap();
		}
		if (this.swarm !== null) {
			this.renderSwarm();
		}
	}

	update() {
		if (this.map !== null) {
			this.updateMap();		
		}
		if (this.swarm !== null) {
			this.swarm.update();
		}
		
	}
	
	renderMap() {
		this.showLog();
		
		let cellSize = this.renderSize / this.map.mapSize;
		
	
		push();
		translate(this.position.x, this.position.y);
		
		for (let y = 0; y < this.map.mapSize; y++) {
			for (let x = 0; x < this.map.mapSize; x++) {				
				let cellX = x * cellSize;
				let cellY = y * cellSize;

				fill(200);
				let cellValue = this.map.getCellValue(x, y);
				if (cellValue) {
					fill(40);
				}
				rect(cellX, cellY, cellSize, cellSize);
			} // End for x
		} // End for y
		if (this.map.start !== null) {
			this.paintCell(this.map.start.x, this.map.start.y, color(20, 200, 20));
		}
		if (this.map.target !== null) {
			this.paintCell(this.map.target.x, this.map.target.y, color(20, 20, 200));
		}
		if(this.hoverCell !== null) {
			let c = color(120);
			if (this.paintMode == "start") {
				c = color(50,200,50);
			} else if (this.paintMode == "target") {
				c = color(50, 50, 200);
			}
			
			this.paintCell(this.hoverCell.x, this.hoverCell.y, c)
			
		}
		
		pop();
	} // End renderMap()	

	showLog() {
        noStroke();
        fill(60);
		let logString = "";
		if (this.hoverCell !== null) {
			logString += "Hovercell: " + this.hoverCell.x + ", " + this.hoverCell.y;			
		} else {
			logString += "Hovercell: null";  	
		}
		
		logString += "\nAddMode: " + this.addMode;
		logString += "\nMouse pressed: " + this.mouseIsPressed;
		logString += "\nPaint mode: " + this.paintMode;		
		text(logString, 20, 20) 
	}	

    runSwarm() {
        this.swarm = new Swarm(this.map);
        console.log(this.swarm);
    }

    renderSwarm() {
		push();
		translate(this.position.x, this.position.y);        
        for (let agent of this.swarm.agents) {
            // console.log(agent)
            let c = color(200, 20, 20);
            this.paintCell(agent.location.x, agent.location.y, c)
        }
        pop();
    }
}