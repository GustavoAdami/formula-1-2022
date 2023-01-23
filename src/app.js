const { F122UDP } = require("f1-22-udp");
const { getLocalIPv4 } = require("./utils/utils");
const { handleEvent } = require("./logic/events");
const { handleLapData } = require("./logic/lapData");
const { handleMotion } = require("./logic/motion");
const { handleCarDamage } = require("./logic/carDamage");
const { handleCarSetups } = require("./logic/carSetups");
const { handleCarStatus } = require("./logic/carStatus");
const { handleCarTelemetry } = require("./logic/carTelemetry");
const { handleFinalClassification } = require("./logic/finalClassification");
const { handleLobbyData } = require("./logic/lobbyInfo");
const { handleParticipants } = require("./logic/participants");
const { handleSession } = require("./logic/session");
const { handleSessionHistory } = require("./logic/sessionHistory");

const f122 = new F122UDP({
  address: getLocalIPv4(),
});

/** Telemetry Toggles */
const readMotion = true; /** Contains all motion data for player’s car – only sent while player is in control */
const readSession = true; /** Data about the session – track, time left */
const readLapData = true; /** Data about all the lap times of cars in the session */
const readEvent = true; /** Various notable events that happen during a session */
const readParticipants = true; /** List of participants in the session, mostly relevant for multiplayer */
const readCarSetups = true; /** Packet detailing car setups for cars in the race */
const readCarTelemetry = true; /** Telemetry data for all cars */
const readCarStatus = true; /** Status data for all cars */
const readFinalClassification = true; /** Final classification confirmation at the end of a race */
const readLobbyInfo = true; /** Information about players in a multiplayer lobby */
const readCarDamage = true; /** Damage status for all cars */
const readSessionHistory = true; /** Lap and tyre data for session */

try {
  f122.start();
  console.info("Formula 1 Telemetry Running\n");
} catch (error) {
  console.error("Error Starting Telemetry", error);
}

if (readMotion) {
  f122.on("motion", (motionData) => {
    handleMotion(motionData);
  });
}

if (readEvent) {
  f122.on("event", (eventData) => {
    handleEvent(eventData);
  });
}

if (readCarDamage) {
  f122.on("carDamage", (carDamageData) => {
    handleCarDamage(carDamageData);
  });
}

if (readCarSetups) {
  f122.on("carSetups", (carSetupData) => {
    handleCarSetups(carSetupData);
  });
}

if (readCarStatus) {
  f122.on("carStatus", (carStatusData) => {
    handleCarStatus(carStatusData);
  });
}

if (readCarTelemetry) {
  f122.on("carTelemetry", (carTelemetryData) => {
    handleCarTelemetry(carTelemetryData);
  });
}

if (readFinalClassification) {
  f122.on("finalClassification", (finalClassificationData) => {
    handleFinalClassification(finalClassificationData);
  });
}

if (readLapData) {
  f122.on("lapData", (lapData) => {
    handleLapData(lapData);
  });
}

if (readLobbyInfo) {
  f122.on("lobbyInfo", (lobbyData) => {
    handleLobbyData(lobbyData);
  });
}

if (readParticipants) {
  f122.on("participants", (participantsData) => {
    handleParticipants(participantsData);
  });
}

if (readSession) {
  f122.on("session", (sessionData) => {
    handleSession(sessionData);
  });
}

if (readSessionHistory) {
  f122.on("sessionHistory", (sessionHistoryData) => {
    handleSessionHistory(sessionHistoryData);
  });
}

f122.on("error", (errorData) => {
  console.log("ERROR", errorData);
});

f122.on("other", (otherData) => {
  console.log("OTHER", otherData);
});
