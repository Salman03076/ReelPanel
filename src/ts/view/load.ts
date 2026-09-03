
import { countLoadAsset } from "../ulity.js";


export function calculatepercetage() {
    const totalAssets = 7;
    const percentage = Math.floor((countLoadAsset / totalAssets) * 100);
    const gameName = document.getElementById("gameName") as HTMLHRElement;
    const loadBar = document.getElementById("loadBar") as HTMLDivElement;
    const load = document.getElementById("load") as HTMLDivElement;
    load.style.backgroundColor = "#B50000"
    load.style.width = `${percentage}%`;
    if (percentage == 100) {
        loadBar.style.display = "none"
        gameName.style.display = "none"

    }
    console.log(`Assets loaded: ${percentage}%`);
};