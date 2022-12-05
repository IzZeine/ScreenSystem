import ScreenBase from "../../@provided/screen/core/ScreenBase";
import CanvasScene from "../canvas/CanvasScene";

export default class DemoCanvasScreen extends ScreenBase{
    constructor(params) {
        super(params);
    }

    async build(builtCompleteCallback) {
        this.canvasScene = new CanvasScene(this.display);
        this.canvasScene.createBall(32);
        this.canvasScene.createBall(24);
        this.canvasScene.createBall(27);
        this.canvasScene.createBall(12);
        this.canvasScene.createBall(48);

        builtCompleteCallback();
    }

    update(dt) {
        this.canvasScene.update(dt);
    }

    screenUpdate(dt) {
        if( Math.random() > .98 ){
            this.canvasScene.createBall(35);
        }
    }
}