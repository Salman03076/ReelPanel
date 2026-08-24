
import { collapseNewlines, Container, Sprite, Texture, TilingSprite, Ticker } from "pixi.js";
import { getStage } from "../index.js";
import { lermpsymbol3, letterSymbol2, pandaSymboll, reelPanelBgColor, reelPanelImage, wildSymbol4 } from "../ulity.js";
import { application } from "../app.js";


// creat the reelPanel
export class reelPanel {
    private reelContainer: Container;
    private reelBackgrondSprite: Sprite;
    private reelContainerTecture: Texture;
    private reelContainerbgcolor: Sprite;
    public symblSprite: Sprite;
    public Symbols: Sprite[] = [];
    private symbol1: Sprite;
    private symbol2: Sprite;
    private symbol3: Sprite;
    private symbol4: Sprite;




    constructor() {
        this.createReelContainer();

    }

    //create the  Reel container
    private async createReelContainer(): Promise<void> {
        this.reelContainer = new Container;
        this.reelContainer.y = (innerHeight - this.reelContainer.height);
        this.reelContainerbgcolor = new Sprite(await reelPanelBgColor())
        this.reelContainerbgcolor.anchor.set(0.5);
        this.reelContainerbgcolor.height = 800;
        this.reelContainerbgcolor.width = 270;
        // this.reelContainerbgcolor.zIndex = -2;
        this.reelContainerbgcolor.y = (innerHeight - this.reelContainerbgcolor.height)
        this.reelContainerTecture = await reelPanelImage();
        this.reelBackgrondSprite = new Sprite(this.reelContainerTecture);
        this.reelBackgrondSprite.anchor.set(0.5)
        this.reelContainer.x = innerWidth / 2;
        this.reelContainer.y = innerHeight / 2;
        this.reelBackgrondSprite.height = 800;
        this.reelBackgrondSprite.width = 270;
        this.reelBackgrondSprite.y = (innerHeight - this.reelBackgrondSprite.height)
        this.reelContainer.addChild(this.reelContainerbgcolor)
        await this.loadSymbol();
        this.symbolsPrePosition();
        this.reelContainer.addChild(this.reelBackgrondSprite);
        getStage().addChild(this.reelContainer);
    };


    //symbol set the array
    private async loadSymbol(): Promise<void> {

        // Load all symbol textures
        for (let i = 0; i < 4; i++) {

            let texture: Texture | undefined;

            switch (i) {
                case 0:
                    texture = await pandaSymboll();
                    break;

                case 1:
                    texture = await letterSymbol2();
                    break;

                case 2:
                    texture = await lermpsymbol3();
                    break;

                case 3:
                    texture = await wildSymbol4();
                    break;
            }

            if (texture) {
                this.symblSprite = new Sprite(texture);
                this.symblSprite.anchor.set(0.5);
                this.Symbols.push(this.symblSprite);
                console.log(this.Symbols);
            }
        }
    };



    private symbolsPrePosition(): void {
        for (let i = 0; i < this.Symbols.length; i++) {
            let symbols = this.Symbols[i];
            symbols.anchor.set(0.5)
            symbols.width = 200;
            symbols.height = 200;
            symbols.y = 200 * i;


            this.reelContainer.addChild(this.Symbols[i]);

        }
        this.reelSpin()
    };


    private reelSpin() {
        const speed = 1;
        const totalSymbolsHeight = this.reelBackgrondSprite.height;
        Ticker.shared.add(() => {
            for (let num = 0; num < this.Symbols.length; num++) {
                let symbols = this.Symbols[num];
                for (let j = 0; j < this.Symbols.length; j++) {
                    symbols.alpha = 1;
                    symbols.y += speed;
                }
                if (symbols.y > totalSymbolsHeight) {
                    symbols.alpha = -1;
                    symbols.y -= totalSymbolsHeight;
                }
            }
        });
    }






}





