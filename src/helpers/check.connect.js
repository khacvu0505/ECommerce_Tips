"use strict";

const mongoose = require("mongoose");
// Use os module to check CPU of server
const os = require("os");
// Use process module to check memory of server
const process = require("process");

const _SECONDS = 5000;

// Count connection
const countConnect = () => {
  const numberConnection = mongoose.connections.length;
  return numberConnection;
};

// Check overload connection
const checkOverload = () => {
  setInterval(() => {
    const numberConnection = countConnect();
    const numCores = os.cpus().length;
    const memory = process.memoryUsage().rss;

    // Example maximum number of connections based on number of cores
    const maxConnection = numberConnection * 5;

    console.log("Number of cores: ", numCores);
    console.log(`Active connections: ${numberConnection}`);
    console.log(`Memory bite used: ${memory / 1024 / 1024} MB`);

    // Check is overload connection
    if (numberConnection > maxConnection) {
      console.log("Overload connection dectected", numberConnection);
    }
  }, _SECONDS); //Moniter every 5 seconds
};

module.exports = {
  countConnect,
  checkOverload,
};
