const fs = require("fs");
const { text } = require("stream/consumers");

// Blocking, synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File Written");

// Non-blocking, synchronous way
fs.readFile("./txt/start.txt", "utf-8", (error, data) => {
  console.log(data);
});
