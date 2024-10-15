//trabalhando com backend, o js eh executado, e nao linkado em um html
require("colors");

let http = require("http");

let express = require("express");

let app = express();

app.use(express.static('./public'));

let server = http.createServer(app);

server.listen(3000);

console.log("servidor rodando...");

//console.log("Olá mundo".rainbow);