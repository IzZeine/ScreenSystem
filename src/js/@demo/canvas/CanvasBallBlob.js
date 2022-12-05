import CanvasBallRebond from "./CanvasBallRebond";

export default class CanvasBallBlob extends CanvasBallRebond {

    constructor(canvasDrawCtx, int_rayon) {
        super(canvasDrawCtx, int_rayon);

        // propriétés supplémentaires
        this.speedScale = Math.random();
        this.color = "red";
        this.minScale = int_rayon * .75;
        this.maxScale = int_rayon * 2;
    }

    move(dt) {
        super.move(dt);


        // move specific à blob
        this.radius += this.speedScale * dt;
        if (this.radius < this.minScale) {
            this.radius = this.minScale;
            this.speedScale *= -1;
        }

        if (this.radius > this.maxScale) {
            this.radius = this.maxScale;
            this.speedScale *= -1;
        }
    }
}
