import { application } from "./app.js";
import { Container, type ContainerChild } from "pixi.js";
import { Reel } from "./view/Reel.js";
import { background } from "./view/background.js";
import { loadAssets } from "./ulity.js";
import { SoundManager } from "./autio.js";

let stage: Container<ContainerChild>;
let bg: background;
let spinBtn;
let sound;


// all file initialization
(async () => {
    stage = await application();
    new SoundManager()

    bg = new background()

    await loadAssets()

    const reel = new Reel();

    spinBtn = document.getElementById(`spineBtn`) as HTMLButtonElement;

    spinBtn.addEventListener(`click`, () => {
        if (!reel.getReelState()) {
            SoundManager.click
            spinBtn.innerHTML = "STOP";
            reel.playReelSpin();
        } else {

            SoundManager.click
            spinBtn.innerHTML = "SPIN";
            reel.stopReelSpin();
        }
    });
})();


export const getStage = () => {
    return stage;
};


export const getBg = () => {
    return bg;
};


export const getSpinBtn = () => {
    return spinBtn;
};

