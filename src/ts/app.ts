import { Application, Container, type ContainerChild, Assets, Sprite } from "pixi.js";



//set the canvas envirament
export const application = async (): Promise<Container<ContainerChild>> => {
    console.log("set the pixi");

    const app = new Application();
    await app.init({ background: '#030607', resizeTo: window });
    globalThis.__PIXI_APP_ = app;


    const ReelContain = document.getElementById('ReelContain') as HTMLDivElement;

    ReelContain?.appendChild(app.canvas);

    return app.stage;
}

