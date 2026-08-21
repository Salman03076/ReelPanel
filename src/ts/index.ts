import { application } from "./app.js";
import { Container, type ContainerChild } from "pixi.js";
import { reelPanel } from "./View/reelPanel.js";



let stage: Container<ContainerChild>;

//All file initialiazation
(async () => {
    stage = await application();
    await new reelPanel()
})();


export const getStage = () => {
    return stage;
};

