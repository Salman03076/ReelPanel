import { application } from "./app.js";
import { Container, type ContainerChild } from "pixi.js";
import { gameInit } from "./game.js";

let stage: Container<ContainerChild>;

//initialization
(async () => {
  stage = await application();
  await gameInit();
})();

export const getStage = () => {
  return stage;
};
