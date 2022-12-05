export default class CanvasBallBase {

    constructor(canvasDrawCtx, int_rayon) {
        this.ctx = canvasDrawCtx;
        this.radius = int_rayon;

        this.color = "yellow";
        this.x = 0;
        this.y = 0;


    };


    update(dt){
        this.draw();
    }

    draw()
    {
        this.ctx.lineStyle = "red";
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc( this.x , this.y , this.radius , 0, 2*Math.PI );
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }
}