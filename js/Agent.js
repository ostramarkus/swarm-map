class Agent {
	constructor(swarm, x, y) {
		this.swarm = swarm;
		this.location = {'x': x, 'y': y};
		this.path = [];
        this.moveOptions = [];
	}

	update() {
        let atTarget = (this.location.x == this.swarm.map.target.x &&
                    this.location.y == this.swarm.map.target.y) 

        if (atTarget) {
            console.log("Target reached in: " + this.path.length + "moves!");
            this.swarm.run = false;
            return
        }    

		this.moveOptions = this.findMoveOptions();
        if (this.moveOptions.length > 0) {
            this.moveOptions
            let sortedMoves = this.sortByPathFrequency(this.moveOptions, this.path);
            this.moveTo(sortedMoves[0]);
        }
	}

    sortByPathFrequency(moveOptions, path) {
        function countOccurrences(pos) {
            return path.filter(p => p.x === pos.x && p.y === pos.y).length;
        }

        // Sortera stigande efter antal förekomster
        return moveOptions.sort((a, b) => {
            return countOccurrences(a) - countOccurrences(b);
        });
    }
/*
    filterBacktracking(moveOptions, path) {
        if (path.length < 2) return moveOptions; // ingen risk ännu

        const last = path[path.length - 1];
        const previous = path[path.length - 2];

        // Filtrera bort positioner som är exakt "previous"
        return moveOptions.filter(opt => !(opt.x === previous.x && opt.y === previous.y));
    }
*/  
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
        this.path.push(moveOption)
        this.location = moveOption;
    }
}