"use strict"
const { ImageDrawing } = require("./image");
const http = require("http")
const fs = require("fs")
const args = process.argv
const DEFAULT_CROSS = false

const posthtml = fs.readFileSync("post-site.html")
if (args.length <= 4)
    for (var i = 0; i < 2; i++)
        args.push(64)
const image = new ImageDrawing(args[2] * 1, args[3] * 1)
image.setRGBFillStyle(255, 255, 255)
image.fillEmpty()
image.setRGBFillStyle(100, 100, 100)

if (DEFAULT_CROSS) {
    for (var n = 0; n < image.getWidth(); n++) {
        image.fillPoint(n, n)
        image.fillPoint(image.getWidth() - n, n)
    }
}

http.createServer(async function (request, response) {
    if (request.method === "GET") {
        if (request.url === "/") {
            response.writeHead(200, { 'Content-Type': 'image/png' })
            response.end(image.getBuffer())
        } else if (request.url === "/post") {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(posthtml)
        }


    } else if (request.method === "POST") {
        var dataBuffer = ""
        request.on("data", (data) => { dataBuffer += data })
        request.on("end", function () {
            var incomingData = JSON.parse(dataBuffer)
            const properties = ["x", "y", "r", "g", "b"]
            for (var i = 0; i < properties.length; i++)
                if (!incomingData.hasOwnProperty(properties[i])) {
                    response.end(JSON.stringify({ "success": false, "reason": "missing argument: " + properties[i] }));
                    return
                }
            image.setRGBFillStyle(incomingData["r"], incomingData["g"], incomingData["b"])
            image.fillPoint(incomingData["x"], incomingData["y"])
            response.end(JSON.stringify({ "success": true, "reason": "" }))
        })
    }
}).listen(8080)