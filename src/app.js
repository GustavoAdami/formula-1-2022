const { F122UDP } = require("f1-22-udp");
const { networkInterfaces } = require("os");
const nets = networkInterfaces();

const f122 = new F122UDP({
  address: getLocalIPv4(),
});

/* Telemetry Toggles */
const readMotion = true;
const readSession = true;
const readLapData = true;
const readEvent = true;
const readParticipants = true;
const readCarSetups = true;
const readCarTelemetry = true;
const readCarStatus = true;
const readFinalClassification = true;
const readLobbyInfo = true;
const readCarDamage = true;
const readSessionHistory = true;

try {
  f122.start();
} catch (error) {
  console.log("ERROR START", error);
}

console.info("Formula 1 Telemetry Running\n");
console.log('Test');

if (readMotion) {
  f122.on("motion", function (motionData) {
    console.log("MOTION", motionData);
  });
}

if (readEvent) {
  f122.on("event", (eventData) => {
    console.log("EVENT", eventData);
  });
}

if (readCarDamage) {
  f122.on("carDamage", (carDamageData) => {
    console.log("CAR DAMAGE", carDamageData);
  });
}

if (readCarSetups) {
  f122.on("carSetups", (carSetupData) => {
    console.log("CAR SETUPS", carSetupData);
  });
}

if (readCarStatus) {
  f122.on("carStatus", (carStatusData) => {
    console.log("CAR STATUS", carStatusData);
  });
}

if (readCarTelemetry) {
  f122.on("carTelemetry", (carTelemetryData) => {
    console.log("CAR TELEMETRY", carTelemetryData);
  });
}

if (readFinalClassification) {
  f122.on("finalClassification", (finalClassificationData) => {
    console.log("FINAL CLASSIFICATION", finalClassificationData);
  });
}

if (readLapData) {
  f122.on("lapData", (lapData) => {
    console.log("LAP DATA", lapData);
  });
}

if (readLobbyInfo) {
  f122.on("lobbyInfo", (lobbyInfoData) => {
    console.log("LOBBY INFO", lobbyInfoData);
  });
}

if (readParticipants) {
  f122.on("participants", (participantsData) => {
    console.log("PARTICIPANTS", participantsData);
  });
}

if (readSession) {
  f122.on("session", (sessionData) => {
    console.log("SESSION", sessionData);
  });
}

if (readSessionHistory) {
  f122.on("sessionHistory", (sessionHistoryData) => {
    console.log("SESSION HISTORY", sessionHistoryData);
  });
}

f122.on("error", (errorData) => {
  console.log("ERROR", errorData);
});

function getNetworkInterfaces() {
  /* https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js */
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  return results;
}

function getLocalIPv4() {
  return getNetworkInterfaces()['Wi-Fi'][0];
}
