
// load the game asset
import { Texture, Assets } from 'pixi.js';

export const assetsMap = []

export const reelPanelImage = async (): Promise<Texture> => {
    console.log("reelPanelload");
    return await loadTexture(`reelPanelimage`, `assets/reelContainerimage/reelcontainerImage.png`)
}

export const pandaSymboll = async (): Promise<Texture> => {
    return await loadTexture('pandaSymbol', `assets/reelSymbols/symbol1.png`);
}

export const letterSymbol2 = async (): Promise<Texture> => {
    return await loadTexture('letterSymbol', `assets/reelSymbols/symbol2.png`);
}

export const lermpsymbol3 = async (): Promise<Texture> => {
    return await loadTexture(`lermpsymbol`, `assets/reelSymbols/symbol3.png`)
}

export const wildSymbol4 = async (): Promise<Texture> => {
    return await loadTexture(`wildSymbol`, `assets/reelSymbols/symbol4.png`);
}
const loadTexture = async (textureName: string, textureURL: string) => {

    if (!assetsMap[`${textureName}`]) {
        assetsMap[`${textureName}`] = await Assets.load(textureURL);
        console.log(assetsMap)

    }


    return assetsMap[`${textureName}`];
};



