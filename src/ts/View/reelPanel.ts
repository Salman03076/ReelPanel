
import { Container, Texture } from "pixi.js";
import { stage } from "../index.js";
import { assetsMap } from "../ulity.js";


// creat the reelPanel
class reelPanel {
    private reelContainer: Container;
    private reelContainerTecture: Texture;





    constructor() {

    }

    //create the  Reel container
    async createReelContainer(): Promise<void> {
        this.reelContainer = new Container();
        this.reelContainerTecture = assetsMap[`reelPanelImage`] 


        stage.addChild(this.reelContainer)




    }


}





