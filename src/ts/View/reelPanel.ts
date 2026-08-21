
import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { getStage } from "../index.js";
import { assetsMap, reelPanelImage } from "../ulity.js";


// creat the reelPanel
export class reelPanel {
    private reelContainer: Container;
    private reelBackgrondSprite: Sprite;
    private reelContainerTecture: Texture;
    public symblSprite: Sprite;
    public Symbols: Sprite[] = [];
    // private symbolTexture: Texture;





    constructor() {
        this.createReelContainer()
        this.loadSymbol()
    }

    //create the  Reel container
    private async createReelContainer(): Promise<void> {
        this.reelContainer = new Container;
        this.reelContainerTecture = await reelPanelImage();
        this.reelBackgrondSprite = new Sprite(this.reelContainerTecture);
        this.reelBackgrondSprite.anchor.set(0.5)
        this.reelBackgrondSprite.x = innerWidth / 2;
        this.reelBackgrondSprite.y = innerHeight / 2;
        this.reelBackgrondSprite.height = 600
        this.reelBackgrondSprite.width = 200
        this.reelContainer = this.reelBackgrondSprite;
        getStage().addChild(this.reelContainer);
    }


    //symbol set the array
    private async loadSymbol(): Promise<void> {
        for (const symbolRefresh of Object.values(assetsMap)) {
            const texture = await symbolRefresh
            this.symblSprite = new Sprite(texture)
            this.Symbols.push(this.symblSprite)
            console.log("load symbol")
        }
    }





}





