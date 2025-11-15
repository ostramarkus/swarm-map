class Map {
	constructor(mapSize=32) {
		this.mapSize = mapSize;
		this.cells = Array(mapSize).fill(false).map(x => Array(mapSize).fill(false))
		this.start = null;
		this.target = null;
	}

	randomize(density=32) {
		for (let i = 0; i < density; i++) {
			this.cells[floor(random(this.mapSize))][floor(random(this.mapSize))] = true;
		}
	}

    isAccesible(x, y) {
        if (
            y < 0 || y >= this.cells.length ||
            x < 0 || x >= this.cells[y].length
        ) {
            return false;
        }

        return !this.cells[y][x]
    }

	getCellValue(x, y) {
		try {
			return this.cells[y][x];
		} catch(error) {
			return false;
		}
	}

	setCellValue(value, x, y) {
		this.cells[y][x] = value;
	}
} // End Map