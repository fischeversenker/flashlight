const BASE_FIREFLY = {
  radius: 15,
  color: '#fff',
};
const FIREFLY_MAX_VELOCITY = 0.4;
const FIREFLY_MAX_DEVIATION = 140;

class FireflyManager {
  shineInstance = null;

  constructor(shineInstance) {
    this.shineInstance = shineInstance;
    const spawnRandX = (200 + windowWidth / 4 * Math.random());
    const spawnRandY = (windowHeight * 0.8 * Math.random());
    this.fireflies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(() => {
      const x = spawnRandX + ((Math.random() - 1) * FIREFLY_MAX_DEVIATION);
      const y = spawnRandY + ((Math.random() - 1) * FIREFLY_MAX_DEVIATION);

      return {
        ...BASE_FIREFLY,
        pos: { x, y },
        velocity: { x: 0, y: 0 },
      };
    });
  }

  update() {
    this.fireflies = this.fireflies.map(firefly => {
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
