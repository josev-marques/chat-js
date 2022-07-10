// José Vítor Andrade Marques 10/07/22

const net = require("net");
const iostream = require("readline");

const ios = iostream.createInterface({
  input: process.stdin,
});
const port = 3000;

const server = net.createServer((socket) => {
  const socketId = socket.remotePort.toString();

  const SendMessage = (text) => {
    let serverName = "server::" + socket.localPort;
    let message = `${serverName} >> ${text}\n`;
    socket.write(message);
  };

  console.log(`Conexão bem sucedida com socket:${socketId}\n`);
  SendMessage(`Conexão bem sucedida com socket:${socketId}`);

  SendMessage("Bem vindo ao nosso chat!!!");

  socket
    .on("data", (data) => {
      process.stdout.write(data);
    })
    .on("error", (error) => {
      console.error(`Erro no socket:${socketId}: `, error.message);
    })
    .on("end", () => {
      console.log("Chat encerrado pelo cliente");
    });

  ios.on("line", (line) => {
    SendMessage(line);
  });
});

server
  .on("error", (error) => {
    console.error("Erro inesperado: ", error.message);
  })
  .listen(port, () => {
    console.log(`\nServidor aberto em http://localhost:${port}`);
  });
