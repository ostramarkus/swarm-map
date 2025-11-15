class Swarm {
	constructor(map) {
		this.map = map;
		this.agents = [];
		this.agents.push(new Agent(this, this.map.start.x, this.map.start.y));
        console.log(this.agents);
    }

    update() {
        if (frameCount % 30 == 0) {
            for (let agent of this.agents) {
                agent.update();
            }
        }
    }
}