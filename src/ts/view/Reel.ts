
import { Container, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import { bambooSymbol5, lermpsymbol3, letterSymbol2, pandaSymboll, wildSymbol4 } from "../ulity.js";
import { background, background as Background } from "./background.js";


// creat the reelPanel\
export class Reel extends Container {
    private background: background;
    private isSpining: boolean = false;
    private spinSpeed: number = 10;
    private Symbols: Sprite[] = [];
    private bg;
    private reelCtr;









    constructor() {
        super();
        this.label = "symContain";
        this.y = -145.5;
        this.SetupSym();

    }


    public getReelState(): boolean {
        return this.isSpining;
    }

    //create the  Reel container
    private async SetupSym(): Promise<void> {
        this.background = new Background();
        this.bg = this.background.getBgSprite();
        console.log(this.bg);
        this.reelCtr = this.background.getReelCtr();
        console.log(this.reelCtr);
        await this.loadSymbol();
        this.symbolsPrePosition();
        this.reelmask();
        this.background.getBgCtr().addChild(this);

    };



    public addsymbols() {
        this.background.getBgCtr().addChild(this);
    }








    //symbol set the array
    private async loadSymbol(): Promise<void> {

        // Load all symbol textures
        for (let i = 0; i < 5; i++) {

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
                case 4:
                    texture = await bambooSymbol5()
                    break;
            }

            if (texture) {
                const symblSprite = new Sprite(texture);
                symblSprite.label = `sym_${i}`;
                symblSprite.anchor.set(0.5);
                symblSprite.width = 180;
                symblSprite.height = 180;
                this.Symbols.push(symblSprite);
                console.log(this.Symbols);
            }
        }
        this.SulleArray(this.Symbols)
    };



    private SulleArray(array: Sprite[]): Sprite[] {
        for (let i = this.Symbols.length - 1; i > 0; i--) {
            const random: number = Math.floor(Math.random() * (i + 1));
            [this.Symbols[i], array[random]] = [array[random], this.Symbols[i]];
        }
        return array;
    }

    private symbolsPrePosition(): void {
        const totalSymbolsHeight = this.bg;
        const upperExtraSym = this.Symbols[0];
        upperExtraSym.y = -200;
        upperExtraSym.width = 180;
        upperExtraSym.height = 180;
        this.addChild(upperExtraSym)
        for (let i = 1; i < this.Symbols.length - 1; i++) {
            let symbols = this.Symbols[i];
            symbols.anchor.set(0.5)
            symbols.y = 200 * (i - 1);
            this.addChild(this.Symbols[i])
            if (symbols.y > this.bg) {
                symbols.alpha = 0;
                symbols.y -= totalSymbolsHeight;
            }
        }
        const lowerExtraSym = this.Symbols[4];
        lowerExtraSym.y = 600;
        lowerExtraSym.width = 180;
        lowerExtraSym.height = 180;
        this.addChild(lowerExtraSym)
    };


    private reelSpin(): void {
        const totalSymbolsHeight = 800;
        for (let num = 0; num < this.Symbols.length; num++) {
            let symbols = this.Symbols[num];
            symbols.alpha = 1;
            symbols.y += this.spinSpeed;
            if (this.children[this.children.length - 1].y > totalSymbolsHeight) {
                // symbols.alpha = 0;
                symbols.y = symbols.y - totalSymbolsHeight - 200;
                this.addChildAt(symbols, 0);
            }
        }

    }




    private spinboundle = this.reelSpin.bind(this)

    public playReelSpin() {
        if (this.isSpining) return;
        this.isSpining = true;
        Ticker.shared.add(this.spinboundle);
    }


    public stopReelSpin() {
        if (!this.isSpining) return;
        this.isSpining = false;
        Ticker.shared.remove(this.spinboundle);

    };

    private reelmask() {
        const mask = new Graphics();
        mask.label = "symbolsMask"
        mask

        mask.rect(
            -104,
            -241.5,
            200,
            570,
        );

        mask.fill(0xffffff);

        this.mask = mask;
        this.reelCtr.addChild(mask);

    }















}





