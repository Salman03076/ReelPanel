
import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { getStage } from "../index.js";
import { lermpsymbol3, letterSymbol2, pandaSymboll, reelPanelBgColor, reelPanelImage, wildSymbol4 } from "../ulity.js";

// creat the reelPanel\
export class Reel extends Container {
    private reelContainer: Container;
    private bgContainer: Container;
    private reelBackgrondSprite: Sprite;
    private reelContainerTecture: Texture;
    private reelContainerbgcolor: Sprite;
    public Symbols: Sprite[] = [];
    private isSpining: boolean = false;






    constructor() {
        super();
        this.reelContainer = new Container();
        this.reelContainer.label = "reelContainer";
        this.bgContainer = new Container();
        this.bgContainer.label = "bgContainer";
        this.label = "symContain";
        this.createReelContainer();
        addEventListener(`resize`, this.manageGameSize.bind(this));
    }

    public getReelState(): boolean {
        return this.isSpining;
    }

    //create the  Reel container
    private async createReelContainer(): Promise<void> {
        this.reelContainer.x = innerWidth / 2;
        this.reelContainer.y = innerHeight / 2;
        await this.bgColor();
        this.bgContainer.addChild(this);
        await this.bgsprite();
        this.reelContainer.addChild(this.bgContainer);
        getStage().addChild(this.reelContainer);
        await this.loadSymbol();
        this.symbolsPrePosition();
    };


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
        this.reelBackgrondSprite.anchor.set(0.5)
        this.reelBackgrondSprite.height = 800;
        this.reelBackgrondSprite.width = 300;
        this.bgContainer.addChild(this.reelBackgrondSprite);

    }



    private manageGameSize() {
        this.reelContainer.x = innerWidth / 2;
        this.reelContainer.y = innerHeight / 2;
    }



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
                const symblSprite = new Sprite(texture);
                symblSprite.label = `sym_${i}`;
                symblSprite.anchor.set(0.5);
                this.Symbols.push(symblSprite);
                console.log(this.Symbols);
                this.SulleArray(this.Symbols)
            }
        }
    };



    private SulleArray(array: Sprite[]): Sprite[] {
        for (let i = this.Symbols.length - 1; i > 0; i--) {
            const random: number = Math.floor(Math.random() * (i + 1));
            [this.Symbols[i], array[random]] = [array[random], this.Symbols[i]];
        }
        return array;
    }

    private symbolsPrePosition(): void {
        for (let i = 0; i < this.Symbols.length; i++) {
            // let indexnum=Math.floor(Math.random()*this.Symbols.length)
            let symbols = this.Symbols[i];
            symbols.anchor.set(0.5)
            symbols.width = 200;
            symbols.height = 200;
            symbols.y = 200 * i;
            this.addChild(this.Symbols[i])
            if (symbols.y > this.reelBackgrondSprite.height) {
                symbols.alpha = 0;
                // symbols.y -= totalSymbolsHeight;
            }
        }
    };


    private reelSpin(): void {
        const speed = 2;
        const totalSymbolsHeight = this.reelBackgrondSprite.height;
        for (let num = 0; num < this.Symbols.length; num++) {
            let symbols = this.Symbols[num];
            for (let j = 0; j < this.Symbols.length; j++) {
                symbols.alpha = 1;
                symbols.y += speed;
            }
            if (symbols.y > totalSymbolsHeight) {
                symbols.alpha = 0;
                symbols.y -= totalSymbolsHeight;
            }
        }
        
    }



    public playReelSpin() {
        if (this.isSpining) return;
        this.isSpining = true;
        Ticker.shared.add(this.reelSpin.bind(this));
    }


    public stopReelSpin() {
        if (!this.isSpining) return;
        this.isSpining = false;
        Ticker.shared.remove(this.reelSpin.bind(this));

    };















}





