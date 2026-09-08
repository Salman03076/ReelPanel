import { Application, Container, type ContainerChild } from "pixi.js";

// set the canvas envirament
export const application = async (): Promise<Container<ContainerChild>> => {
  console.log("Pixi setup ready!");

  const app = new Application();
  await app.init({ background: "#030607", resizeTo: window });
  globalThis.__PIXI_APP_ = app;

  const gameContainer = document.getElementById(
    "gameContainer",
  ) as HTMLDivElement;
  gameContainer.appendChild(app.canvas);

  return app.stage;
};
