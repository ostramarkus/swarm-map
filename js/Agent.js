class Agent {
	constructor(swarm, x, y) {
		this.swarm = swarm;
		this.location = {'x': x, 'y': y};
		this.path = [];
	}

	update() {
		let moveOptions = this.findMoveOptions();
        if (moveOptions.length > 0) {
            this.moveTo(moveOptions[floor(random(moveOptions.length))]);
        }
        console.log(moveOptions);
	}

	findMoveOptions() {
		let options = [];
        let loc = this.location;
		// Up
        let directions = [
            {'x': loc.x, 'y': loc.y - 1},
            {'x': loc.x + 1, 'y': loc.y},
            {'x': loc.x, 'y': loc.y + 1},
            {'x': loc.x - 1, 'y': loc.y},
        ]
        
        for (let direction of directions) {
            let cellValue = this.swarm.map.isAccesible(direction.x, direction.y);  
            if (cellValue) {
                options.push(direction);
            }
        }
        return options;
	}
    moveTo(moveOption) {
        console.log("moveTo: " + moveOption);
        this.location = moveOption;
    }
}