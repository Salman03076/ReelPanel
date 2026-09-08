// load the game asset
import { Texture, Assets } from "pixi.js";
import { calculatepercetage } from "./view/loadBar.js";

export let countLoadAsset: number = 0;

export const assetsMap = [];

export const reelPanelImage = async (): Promise<Texture> => {
  console.log("reelPanelload");
  return await loadTexture(
    `reelPanelimage`,
    `assets/reelContainerimage/reel.png`,
  );
};

export const reelPanelBgColor = async (): Promise<Texture> => {
  return await loadTexture(
    `reelbgcolor`,
    `assets/reelContainerimage/reelbgColor.png`,
  );
};

const loadTexture = async (textureName: string, textureURL: string) => {
  if (!assetsMap[`${textureName}`]) {
    assetsMap[`${textureName}`] = await Assets.load(textureURL);
    console.log(assetsMap);
    countLoadAsset++;
    calculatepercetage();
  }
  return assetsMap[`${textureName}`];
};

export const assetMap: Texture[] = [];

const assets = [
  "assets/reelSymbols/symbol1.png",
  "assets/reelSymbols/symbol2.png",
  "assets/reelSymbols/symbol3.png",
  "assets/reelSymbols/symbol4.png",
  "assets/reelSymbols/symbol5.png",
];

export async function loadAssets(): Promise<void> {
  for (const path of assets) {
    const texture = await Assets.load<Texture>(path);

    assetMap.push(texture);
    countLoadAsset++;
    calculatepercetage();
  }
  console.log(countLoadAsset);
}
