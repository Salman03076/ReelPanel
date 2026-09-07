import { Container, Graphics, Sprite, Ticker } from "pixi.js";
import { assetMap } from "../ulity.js";
import { getBg, getSpinBtn } from "../game.js";

// creat the reelPanel\
export class Reel extends Container {
    private isSpining: boolean = false;
    private spinSpeed: number = 20;
    private Symbols: Sprite[] = [];

    constructor() {
        super();
        this.label = "symContain";
        this.y = -145.5;
        this.SetupSym();
        getBg().getBgCtr().addChild(this);
    }

    public getReelState(): boolean {
        return this.isSpining;
    }

    //create the  Reel container
    private async SetupSym(): Promise<void> {
        await this.loadSymbol();
        this.symbolsPrePosition();
        this.reelmask();
    }

    //symbol set the array
    private async loadSymbol(): Promise<void> {
        for (let i = 0; i < assetMap.length; i++) {
            const symbol = new Sprite(assetMap[i]);

            symbol.label = `sym_${i}`;
            symbol.anchor.set(0.5);

            symbol.width = 180;
            symbol.height = 180;

            this.Symbols.push(symbol);
        }

        this.ShulleArray(this.Symbols);
    }

    // shulle the Array
    private ShulleArray(array: Sprite[]): Sprite[] {
        for (let i = this.Symbols.length - 1; i > 0; i--) {
            const random: number = Math.floor(Math.random() * (i + 1));
            [this.Symbols[i], array[random]] = [array[random], this.Symbols[i]];
        }
        return array;
    }

    // assign the prePosition
    private symbolsPrePosition(): void {
        const totalSymbolsHeight = getBg().getBgSprite().height;
        const upperExtraSym = this.Symbols[0];
        upperExtraSym.y = -200;
        upperExtraSym.width = 180;
        upperExtraSym.height = 180;
        this.addChild(upperExtraSym);
        for (let i = 1; i < this.Symbols.length - 1; i++) {
            let symbols = this.Symbols[i];
            symbols.anchor.set(0.5);
            symbols.y = 200 * (i - 1);
            this.addChild(this.Symbols[i]);
            if (symbols.y > getBg().getBgSprite().height) {
                symbols.alpha = 0;
                symbols.y -= totalSymbolsHeight;
            }
        }
        const lowerExtraSym = this.Symbols[4];
        lowerExtraSym.y = 600;
        lowerExtraSym.width = 180;
        lowerExtraSym.height = 180;
        this.addChild(lowerExtraSym);
    }

    // Reel Spin Animation
    private reelSpin(): void {
        const totalSymbolsHeight = getBg().getBgSprite().height;
        for (let num = 0; num < this.Symbols.length; num++) {
            let symbols = this.Symbols[num];
            symbols.alpha = 1;
            symbols.y += this.spinSpeed;
            if (symbols.y > totalSymbolsHeight) {
                symbols.alpha = 0;
                symbols.y = symbols.y - totalSymbolsHeight - 200;
                this.addChildAt(symbols, 0);
            }
        }
    }

    private spinboundle = this.reelSpin.bind(this);

    public playReelSpin() {
        if (this.isSpining) return;
        this.isSpining = true;
        Ticker.shared.add(this.spinboundle);
    }

    public stopReelSpin(): void {
        if (!this.isSpining) return;
        this.isSpining = false;

        const stopReelAnimation = setInterval(() => {
            // Decrease speed
            if (this.spinSpeed > 0) {
                this.spinSpeed -= 2;

                if (this.spinSpeed < 0) {
                    this.spinSpeed = 0;
                }
            }

            // Check all symbols
            for (let index = 0; index < this.Symbols.length; index++) {
                const currentY = this.Symbols[index].y;

                if (currentY == 200 || currentY == 0 || currentY == 400) {
                    clearInterval(stopReelAnimation);
                    Ticker.shared.remove(this.spinboundle);
                    this.spinSpeed = 20;
                    console.log("Reel stopped at:", currentY);
                    break;
                } else {
                    this.spinSpeed = 20;
                }
            }
        }, 10);
    }

    // create the masking for symbol Area
    private reelmask() {
        const mask = new Graphics();
        mask.label = "symbolsMask";
        mask;

        mask.rect(-104, -241.5, 200, 570);

        mask.fill(0xffffff);

        this.mask = mask;
        getBg().getBgCtr().addChild(mask);
    }
}
