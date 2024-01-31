const fs = require("fs");

const { text } = require("stream/consumers");

// Blocking, synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);

// Non-blocking, synchronous way
fs.readFile("txt/start.txt", "utf-8", (error, data1) => {
  console.log(data1);
  fs.readFile(`txt/${data1}.txt`, "utf-8", (error, data2) => {
    console.log(data2);
    fs.readFile(`txt/append.txt`, "utf-8", (error, data3) => {
      console.log(data3);
      fs.writeFile(
        "./txt/final.txt",
        `${data2}\n${data3}`,
        "utf-8",
        (error) => {
          console.log("Your file has been written!");
        }
      );
    });
  });
});