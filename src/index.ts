import { Core } from './core/core';

const core = new Core();

function drawLoop() {
  core.draw();
  requestAnimationFrame(drawLoop)
}

drawLoop();