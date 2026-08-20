import { Application, Container, type ContainerChild } from "pixi.js";



//set the canvas envirament
export const application = async (): Promise<Container<ContainerChild>> => {

    const app = new Application();
    await app.init({ background: 'yellow', resizeTo: window });
    globalThis.__PIXI_APP_ = app;

    const ReelContain = document.getElementById('ReelContain');

    ReelContain?.appendChild(app.canvas);

    return app.stage;
}
