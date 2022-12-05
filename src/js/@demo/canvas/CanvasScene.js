import CanvasBallBlob from "./CanvasBallBlob";
import CanvasBallRebond from "./CanvasBallRebond";
import CanvasBallBase from "./CanvasBallBase";

export default class CanvasScene{
    constructor(htmlElement) {

        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth - 40;
        this.canvas.height = window.innerHeight *2;
        this.ctx = this.canvas.getContext("2d");

        htmlElement.appendChild(this.canvas);

        this.updateableChildren = [];
    }

    update(dt){

        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);


        for (let i = 0; i < this.updateableChildren.length; i++) {
            const updateableChild = this.updateableChildren[i];
            updateableChild.update(dt);
        }
    }

    createBall(radius){

        switch (this.updateableChildren.length % 3) {
            case 0:
                var newBalle = new CanvasBallBlob(this.ctx, radius);
                break;

            case 1:
                var newBalle = new CanvasBallRebond(this.ctx, radius);
                break;

            case 2:
                var newBalle = new CanvasBallBase(this.ctx, radius);
                break;
        }

        newBalle.x = radius + Math.random() * (this.canvas.width-radius)
        newBalle.y = radius + Math.random() * (this.canvas.height-radius)


        this.updateableChildren.push(newBalle);
    }

}