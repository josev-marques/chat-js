// José Vítor Andrade Marques 10/07/22

const net = require("net");
const iostream = require("readline");

const ios = iostream.createInterface({
  input: process.stdin,
});

const client = new net.Socket();
const port = 3000;

client.connect(port, "localhost", () => {
  client.on("data", (data) => {
    process.stdout.write(data);
  });
});

const SendMessage = (text) => {
  let clientName = "client::" + client.localPort;
  let message = `${clientName} >> ${text}\n`;

  client.write(message);
};

console.log("Para sair digite: exit");

ios.on("line", (line) => {
  if (line === "exit") client.end();
  else SendMessage(line);
});
