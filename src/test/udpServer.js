const dgram = require("node:dgram");
const server = dgram.createSocket("udp4");
const EventEmitter = require("events");
const f122EventEmitter = new EventEmitter();
const { handleEvent } = require("../logic/events");
const { handleLapData } = require("../logic/lapData");
const { handleMotion } = require("../logic/motion");
const { handleCarDamage } = require("../logic/carDamage");
const { handleCarSetups } = require("../logic/carSetups");
const { handleCarStatus } = require("../logic/carStatus");
const { handleCarTelemetry } = require("../logic/carTelemetry");
const { handleFinalClassification } = require("../logic/finalClassification");
const { handleLobbyData } = require("../logic/lobbyInfo");
const { handleParticipants } = require("../logic/participants");
const { handleSession } = require("../logic/session");
const { handleSessionHistory } = require("../logic/sessionHistory");

server.on("listening", () => {
  const address = server.address();
  console.log(`UDP Test Server... ${address.address}:${address.port}`);
});

server.bind(20777);

server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", (msg, info) => {
  // console.log(`Incoming raw message: ${msg}\n`);
  const fromLogs = false;
  let message;

  if (fromLogs) {
    const jsonParsedMsg = JSON.parse(msg);
    const packetType = Object.keys(jsonParsedMsg)[0];
    message = jsonParsedMsg[packetType];
  } else {
    message = JSON.parse(msg);
  }

  switch (message.m_header.m_packetId) {
    case 0:
      f122EventEmitter.emit("motion", message);
      break;
    case 1:
      f122EventEmitter.emit("session", message);
      break;
    case 2:
      f122EventEmitter.emit("lapData", message);
      break;
    case 3:
      f122EventEmitter.emit("event", message);
      break;
    case 4:
      f122EventEmitter.emit("participants", message);
      break;
    case 5:
      f122EventEmitter.emit("carSetups", message);
      break;
    case 6:
      f122EventEmitter.emit("carTelemetry", message);
      break;
    case 7:
      f122EventEmitter.emit("carStatus", message);
      break;
    case 8:
      f122EventEmitter.emit("finalClassification", message);
      break;
    case 9:
      f122EventEmitter.emit("lobbyInfo", message);
      break;
    case 10:
      f122EventEmitter.emit("carDamage", message);
      break;
    case 11:
      f122EventEmitter.emit("sessionHistory", message);
      break;
    default:
      break;
  }

  //   var response = Buffer.from("From server : your msg is received");
  //   server.send(response, info.port, "localhost", function (error) {
  //     if (error) {
  //       client.close();
  //     } else {
  //       console.log("Data sent !");
  //     }
  //   });
});

// Events
f122EventEmitter.on("motion", (motionData) => {
  handleMotion(motionData);
});

f122EventEmitter.on("event", (eventData) => {
  handleEvent(eventData);
});

f122EventEmitter.on("carDamage", (carDamageData) => {
  handleCarDamage(carDamageData);
});

f122EventEmitter.on("carSetups", (carSetupData) => {
  handleCarSetups(carSetupData);
});

f122EventEmitter.on("carStatus", (carStatusData) => {
  handleCarStatus(carStatusData);
});

f122EventEmitter.on("carTelemetry", (carTelemetryData) => {
  handleCarTelemetry(carTelemetryData);
});

f122EventEmitter.on("finalClassification", (finalClassificationData) => {
  handleFinalClassification(finalClassificationData);
});

f122EventEmitter.on("lapData", (lapData) => {
  handleLapData(lapData);
});

f122EventEmitter.on("lobbyInfo", (lobbyData) => {
  handleLobbyData(lobbyData);
});

f122EventEmitter.on("participants", (participantsData) => {
  handleParticipants(participantsData);
});

f122EventEmitter.on("session", (sessionData) => {
  handleSession(sessionData);
});

f122EventEmitter.on("sessionHistory", (sessionHistoryData) => {
  handleSessionHistory(sessionHistoryData);
});
