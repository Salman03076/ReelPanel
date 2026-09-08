import { Reel } from "./view/Reel.js";
import { background } from "./view/background.js";
import { loadAssets } from "./ulity.js";
import { SoundManager } from "./autio.js";

let bg: background;
let spinBtn: HTMLButtonElement;
let Sound: SoundManager;

// all file initialization
export async function gameInit(): Promise<void> {
  Sound = new SoundManager();

  bg = new background();

  await loadAssets();

  const reel = new Reel();

  const spinBtn = document.getElementById("spineBtn") as HTMLButtonElement;

  spinBtn.addEventListener(`click`, () => {
    Sound.clickSound.play();
    if (!reel.getReelState()) {
      Sound.spinSound.play();
      spinBtn.innerHTML = "STOP";
      reel.playReelSpin();
      reel.getBlurSymbols(1);
    } else {
      spinBtn.innerHTML = "SPIN";
      reel.stopReelSpin();
      reel.getBlurSymbols(0);
      Sound.spinSound.stop();
    }
  });
}

export const getSoundManager = () => {
  return Sound;
};

export const getBg = () => {
  return bg;
};

export const getSpinBtn = () => {
  return spinBtn;
};
