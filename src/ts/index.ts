import { application } from "./app.js";
import { Container, type ContainerChild } from "pixi.js";
import { Reel } from "./view/Reel.js";

let stage: Container<ContainerChild>;

// all file initialization
(async () => {
    stage = await application();
    const reel = new Reel();

    const spinBtn = document.getElementById(`spineBtn`) as HTMLButtonElement;

    spinBtn.addEventListener(`click`, () => {
        if (!reel.getReelState()) {
            spinBtn.innerHTML = "STOP";
            reel.playReelSpin();
        } else {
            spinBtn.innerHTML = "SPIN";
            reel.stopReelSpin();
        }
    });
})();


export const getStage = () => {
    return stage;
};
