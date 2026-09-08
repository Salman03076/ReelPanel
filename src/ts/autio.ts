import { Howl } from "howler";

// Game Sound initialization
export class SoundManager {
    private audioPaths = {
        background: "assets/audio/background.mp3",
        click: "assets/audio/click.mp3",
        spin: "assets/audio/spin.mp3",
        reelStop: "assets/audio/reelStop.mp3",
        win: "assets/audio/win.mp3",
        bigWin: "assets/audio/bigWin.mp3",
    };

    public backgroundSound = new Howl({
        src: [this.audioPaths.background],
        loop: true,
        volume: 0.3,
    });

    public clickSound = new Howl({
        src: [this.audioPaths.click],
        volume: 1,
    });

    public spinSound = new Howl({
        src: [this.audioPaths.spin],
        loop: true,
        volume: 0.8,
    });

    // public reelStopSound = new Howl({
    //     src: [this.audioPaths.reelStop],
    // });

    // public winSound = new Howl({
    //     src: [this.audioPaths.win],
    // });

    // public bigWinSound = new Howl({
    //     src: [this.audioPaths.bigWin],
    // });
}
