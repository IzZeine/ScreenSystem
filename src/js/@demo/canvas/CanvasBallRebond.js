import CanvasBallBase from "./CanvasBallBase";

export default class CanvasBallRebond extends CanvasBallBase {

    constructor( canvasDrawCtx , int_rayon )
    {
        super( canvasDrawCtx , int_rayon );

        // propriétés supplémentaires
        this.speedX = 0.3;
        this.speedY = 0.3;
        this.color = "black";
    }

    update(dt) {
        super.update(dt);

        // override
        this.move(dt);
    }

    move(dt)
    {
        this.x += this.speedX * dt;
        this.y += this.speedY * dt;

        if( this.y < this.radius )
        {
            this.y = this.radius;
            this.speedY *= -1;
        }

        if( this.y > this.ctx.canvas.height - this.radius)
        {
            this.y = this.ctx.canvas.height - this.radius;
            this.speedY *= -1;
        }


        if( this.x < this.radius )
        {
            this.speedX *= -1;
            this.x = this.radius;
        }

        if(  this.x > this.ctx.canvas.width - this.radius )
        {
            this.speedX *= -1;
            this.x = this.ctx.canvas.width - this.radius;
        }
    }
}