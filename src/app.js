const { F122UDP } = require("f1-22-udp");
const { getLocalIPv4 } = require("./utils/utils");
const { handleEvent } = require("./logic/events");
const { handleMotion } = require("./logic/motion");
const { handleLapData } = require("./logic/lapData");
const { handleSession } = require("./logic/session");
const { handleCarDamage } = require("./logic/carDamage");
const { handleCarSetups } = require("./logic/carSetups");
const { handleCarStatus } = require("./logic/carStatus");
const { handleLobbyData } = require("./logic/lobbyInfo");
const { handleCarTelemetry } = require("./logic/carTelemetry");
const { handleParticipants } = require("./logic/participants");
const { handleSessionHistory } = require("./logic/sessionHistory");
const { handleFinalClassification } = require("./logic/finalClassification");

const f122 = new F122UDP({
  address: getLocalIPv4(),
});

/** Telemetry Toggles */
let readMotion = true; /** Contains all motion data for player’s car – only sent while player is in control */
let readSession = true; /** Data about the session – track, time left */
let readLapData = true; /** Data about all the lap times of cars in the session */
let readEvent = true; /** Various notable events that happen during a session */
let readParticipants = true; /** List of participants in the session, mostly relevant for multiplayer */
let readCarSetups = true; /** Packet detailing car setups for cars in the race */
let readCarTelemetry = true; /** Telemetry data for all cars */
let readCarStatus = true; /** Status data for all cars */
let readFinalClassification = true; /** Final classification confirmation at the end of a race */
let readLobbyInfo = true; /** Information about players in a multiplayer lobby */
let readCarDamage = true; /** Damage status for all cars */
let readSessionHistory = true; /** Lap and tyre data for session */

let sessionConsolidated = {};

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
    handleEvent(eventData, sessionConsolidated);
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
    handleFinalClassification(finalClassificationData, sessionConsolidated);
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

let addedParticipants = false;

if (readParticipants) {
  f122.on("participants", (participantsData) => {
    if (!addedParticipants) {
      addedParticipants = true;
      sessionConsolidated.participants = participantsData;
    }

    handleParticipants(participantsData);
  });
}

if (readSession) {
  f122.on("session", (sessionData) => {
    handleSession(sessionData, sessionConsolidated);
  });
}

if (readSessionHistory) {
  f122.on("sessionHistory", (sessionHistoryData) => {
    if (!sessionConsolidated.inProgress) {
      // console.log("SESSION HISTORY", sessionHistoryData);
      handleSessionHistory(sessionHistoryData,  sessionConsolidated);

    }
  });
}

f122.on("error", (errorData) => {
  console.log("ERROR", errorData);
});

f122.on("other", (otherData) => {
  console.log("OTHER", otherData);
});
