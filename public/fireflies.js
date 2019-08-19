const BASE_FIREFLY = {
  radius: 4,
  color: '#fff',
};
const FIREFLY_MAX_VELOCITY = 0.4;
const FIREFLY_MAX_DEVIATION = 140;

const FIREFLY_SWARM_HEAD_COUNT = 13;

class FireflyManager {
  shineInstance = null;
  swarms = [];

  constructor(shineInstance, swarmCount = 1) {
    this.shineInstance = shineInstance;
    let x, y, spawnRandX, spawnRandY;

    for (let i = 0; i < max(0, swarmCount); i++) {
      const swarm = [];

      spawnRandX = (windowWidth * Math.random());
      spawnRandY = (windowHeight * Math.random());

      for (let k = 0; k < FIREFLY_SWARM_HEAD_COUNT; k++) {
        x = spawnRandX + ((Math.random() - 1) * FIREFLY_MAX_DEVIATION);
        y = spawnRandY + ((Math.random() - 1) * FIREFLY_MAX_DEVIATION);
        swarm.push({
          ...BASE_FIREFLY,
          pos: { x, y },
          velocity: { x: 0, y: 0 },
        });
      }
      this.swarms.push(swarm);
    }
  }

  update() {
    this.swarms = this.swarms.map(swarm => this.updateSwarm(swarm));
  }

  updateSwarm(swarm) {
    return swarm.map(firefly => {
      const d = firefly.radius * 2;
      const x = firefly.pos.x - firefly.radius;
      const y = firefly.pos.y - firefly.radius;
      this.shineInstance.drawShine(x, y, d);

      const incX = map(Math.random(), 0, 1, -FIREFLY_MAX_VELOCITY, FIREFLY_MAX_VELOCITY);
      const incY = map(Math.random(), 0, 1, -FIREFLY_MAX_VELOCITY, FIREFLY_MAX_VELOCITY);
      firefly.velocity.x += incX;
      firefly.velocity.y += incY;
      return this.updateFirefly(firefly);
    });
  }

  updateFirefly(firefly) {
    const updatedFirefly = { ...firefly };
    updatedFirefly.pos.x += updatedFirefly.velocity.x;
    updatedFirefly.pos.y += updatedFirefly.velocity.y;
    updatedFirefly.velocity.x *= 0.9;
    updatedFirefly.velocity.y *= 0.9;

    if (updatedFirefly.pos.x + updatedFirefly.radius < -40) {
      updatedFirefly.pos.x = windowWidth + updatedFirefly.radius;
    }

    if (updatedFirefly.pos.x - updatedFirefly.radius > windowWidth + 40) {
      updatedFirefly.pos.x = 0 - updatedFirefly.radius;
    }

    if (updatedFirefly.pos.y - updatedFirefly.radius < -40) {
      updatedFirefly.pos.y = windowHeight + updatedFirefly.radius;
    }

    if (updatedFirefly.pos.y - updatedFirefly.radius > windowHeight + 40) {
      updatedFirefly.pos.y = 0;
    }
    return updatedFirefly;
  }
}
