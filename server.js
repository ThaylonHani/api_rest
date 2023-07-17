import http from 'http';
import { app } from './src/app.js';

const port = 3000 || process.end.PORT ;


app.listen(port, () => console.log(`Rodando na porta ${port} entre em http://localhost:${port} para acessar a api.`));

// const server = http.createServer((req,res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end("Comidinha feita na hora")
// })
// server.listen(port, () => console.log(`Rodando api na porta http://localhost:${port}`))