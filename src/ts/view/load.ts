
import { countLoadAsset } from "../ulity.js";


export function calculatepercetage() {
    const totalAssets = 7;
    const percentage = Math.floor((countLoadAsset / totalAssets) * 100);
    const loadBackground = document.getElementById("loadBackground") as HTMLImageElement;
    const gameName = document.getElementById("gameName") as HTMLHRElement;
    const loadBar = document.getElementById("loadBar") as HTMLDivElement;
    const load = document.getElementById("load") as HTMLDivElement;
    const spinbtn = document.getElementById("spineBtn") as HTMLButtonElement
    load.style.backgroundColor = "#B50000"
    load.style.width = `${percentage}%`;
    if (percentage == 100) {
        loadBar.style.display = "none"
        loadBackground.style.display = "none"
        gameName.style.display = "block"
        spinbtn.style.display = "block"



    }
    console.log(`Assets loaded: ${percentage}%`);
};