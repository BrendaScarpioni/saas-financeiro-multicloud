const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5500;
const pastaFrontend = path.join(__dirname, "frontend-app");

const tipos = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  let arquivo = req.url === "/" ? "/index.html" : req.url;
  let caminhoArquivo = path.join(pastaFrontend, arquivo);

  fs.readFile(caminhoArquivo, (erro, conteudo) => {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Arquivo não encontrado");
      return;
    }

    const extensao = path.extname(caminhoArquivo);
    const tipo = tipos[extensao] || "text/plain";

    res.writeHead(200, { "Content-Type": tipo });
    res.end(conteudo);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});