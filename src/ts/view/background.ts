import { Container, Sprite, Texture } from "pixi.js";
import { reelPanelBgColor, reelPanelImage } from "../ulity.js";
import { getStage } from "../index.js";

//background initialization
export class background {
    private reelContainer: Container;
    private bgContainer: Container;
    private reelContainerbgcolor: Sprite;
    private reelContainerTecture: Texture;
    private reelBackgrondSprite: Sprite;

    constructor() {
        addEventListener(`resize`, this.manageGameSize.bind(this));
        this.reelContainer = new Container();
        this.reelContainer.label = "reelContainer";
        this.bgContainer = new Container();
        this.bgContainer.label = "bgContainer";
        this.reelContainer.addChild(this.bgContainer);
        getStage().addChild(this.reelContainer);
        this.bginit();
    }

    public getBgCtr() {
        return this.bgContainer;
    }

    private async bginit(): Promise<void> {
        this.reelContainer.x = innerWidth / 2;
        this.reelContainer.y = innerHeight / 2;
        await this.bgColor();
        await this.bgsprite();
    }

    private async bgColor(): Promise<void> {
        this.reelContainerbgcolor = new Sprite(await reelPanelBgColor());
        this.reelContainerbgcolor.anchor.set(0.5);
        this.reelContainerbgcolor.height = 800;
        this.reelContainerbgcolor.width = 300;
        this.bgContainer.addChild(this.reelContainerbgcolor);
    }

    private async bgsprite(): Promise<void> {
        this.reelContainerTecture = await reelPanelImage();
        this.reelBackgrondSprite = new Sprite(this.reelContainerTecture);
        this.reelBackgrondSprite.anchor.set(0.5);
        this.reelBackgrondSprite.height = 800;
        this.reelBackgrondSprite.width = 300;
        this.reelBackgrondSprite.zIndex = 2;
        this.bgContainer.addChild(this.reelBackgrondSprite);
    }

    private manageGameSize() {
        this.reelContainer.x = innerWidth / 2;
        this.reelContainer.y = innerHeight / 2;
    }

    public getBgSprite() {
        return this.reelBackgrondSprite;
    }

    public getReelCtr() {
        return this.reelContainer;
    }
}
