const app = require("./src/app");
const {
  app: { port },
} = require("./src/config/config.mongodb");

const PORT = port || 3055;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("WSV eCommerce stop");
  });
});
