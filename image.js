"use strict"
const { createCanvas } = require("canvas");
const fs = require("fs")

class ImageDrawing {
    constructor(width, height) {
        this.canvas = createCanvas(width, height)
        this.context = this.canvas.getContext("2d")
    }

    getHeight() { return this.canvas.height }
    getWidth() { return this.canvas.width }
    getContext() { return this.context }
    getCanvas() { return this.canvas }
    getBuffer() { return this.canvas.toBuffer("image/png") }

    fillRect(x, y, width, height) { this.context.fillRect(x, y, width, height) }
    fillEmpty() { this.fillRect(0, 0, this.getWidth(), this.getHeight()) }
    fillPoint(x, y) { this.fillRect(x, y, 1, 1) }
    setHexFillStyle(fillStyle) { if (this.context.fillStyle != fillStyle) { this.context.fillStyle = fillStyle } }
    setRGBFillStyle(r, g, b) { this.context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")" }
    saveImage(name) { fs.writeFileSync("./" + String(name) + ".png", this.getBuffer()) }
}

module.exports = {
    ImageDrawing: ImageDrawing
};