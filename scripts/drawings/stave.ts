﻿module Inknote.Drawing {

    export class Stave implements IDrawable {

        order = 10;
        ID = getID();
        hover: boolean;
        select: boolean;
        x: number = 30;
        width: number = 0;

        isOver(x: number, y: number) {
            return false;
        }

        constructor(public y: number, public name?: string) {


        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

            if (this.name) {
                ctx.beginPath();
                ctx.fillStyle = Colours.black;
                ctx.strokeStyle = Colours.black;
                ctx.font = Fonts.small;
                ctx.textAlign = "left";
                ctx.fillText(this.name, this.x + 10, this.y - 15);
                ctx.textAlign = "center";
            }

            this.width = canvas.width - this.x * 2;

            for (var i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.strokeStyle = Colours.black;
                ctx.moveTo(this.x, this.y + 10 * i);
                ctx.lineTo(canvas.width - this.x, this.y + 10 * i);
                ctx.stroke();
            }

            return true;
        }

    }

}
