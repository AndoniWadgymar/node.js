const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

///////////////////////////////////////////////
// FILES

// const { text } = require("stream/consumers");

// // Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// // Non-blocking, synchronous way
// fs.readFile("txt/start.txt", "utf-8", (error, data1) => {
//   console.log(data1);
//   fs.readFile(`txt/${data1}.txt`, "utf-8", (error, data2) => {
//     console.log(data2);
//     fs.readFile(`txt/append.txt`, "utf-8", (error, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (error) => {
//           console.log("Your file has been written!");
//         }
//       );
//     });
//   });
// });

/////////////////////////////////////////////////
// SERVER
// We use the blocking since this code is only runned once
// Templates read
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

// Data read
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((element) =>
  slugify(element.productName, { lower: true })
);
 
const server = http.createServer((request, response) => {
  // Get the query and the pathName from the request
  // OLD WAY
  // const { query, pathname } = url.parse(request.url, true);

  // NEW WAY TO GET URLs AND PARAMS
  const baseURL = `http://${request.headers.host}`;
  const requestURL = new URL(request.url, baseURL);

  const pathname = requestURL.pathname;
  const query = requestURL.searchParams.get("id");

  // Overview page
  if (pathname === "/overview" || pathname === "/") {
    response.writeHead(200, { "Content-type": "text/html" });

    const cardsHTML = dataObj
      .map((element) => replaceTemplate(templateCard, element))
      .join("");

    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);

    response.end(output);
  }

  // Product Page
  else if (pathname === "/product") {
    const product = dataObj[query];
    response.writeHead(200, { "Content-type": "text/html" });
    const output = replaceTemplate(templateProduct, product);
    response.end(output);
  }

  // API
  else if (pathname === "/api") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(data);
  }

  // Not Found
  else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    response.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
