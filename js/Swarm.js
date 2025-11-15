class Swarm {
	constructor(map) {
		this.map = map;
		this.agents = [];
        this.createAgent(this.map.start.x, this.map.start.y);
        this.run = true;
    }

    update() {
        if (frameCount % 2 == 0 && this.run) {
            for (let agent of this.agents) {
                agent.update();
            }
        }
    }

    createAgent(x, y) {
        let agent = new Agent(this, x, y);
		this.agents.push(agent);
        return agent;
    }
}