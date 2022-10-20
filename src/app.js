const { F122UDP } = require("f1-22-udp");
const { getLocalIPv4 } = require('./utils/utils');
const { logger } = require('./utils/logger');
const { exec } = require('child_process');
const sound = require("sound-play");
const { handleEvent } = require('./logic/events');
const { handleLapData } = require("./logic/lapData");

const f122 = new F122UDP({
  address: getLocalIPv4(),
});

/** Telemetry Toggles */
const readMotion = false;              /** Contains all motion data for player’s car – only sent while player is in control */
const readSession = false;             /** Data about the session – track, time left */
const readLapData = false;             /** Data about all the lap times of cars in the session */
const readEvent = true;                /** Various notable events that happen during a session */
const readParticipants = false;        /** List of participants in the session, mostly relevant for multiplayer */
const readCarSetups = false;           /** Packet detailing car setups for cars in the race */
const readCarTelemetry = false;        /** Telemetry data for all cars */
const readCarStatus = false;           /** Status data for all cars */
const readFinalClassification = false; /** Final classification confirmation at the end of a race */
const readLobbyInfo = false;           /** Information about players in a multiplayer lobby */
const readCarDamage = false;           /** Damage status for all cars */
const readSessionHistory = false;      /** Lap and tyre data for session */

/** Player Properties */ // TODO: Refactor
let driverName = "";
let driverIndex = -1;
let currentPosition = -1;
let carIndex = -1;
let overtake = -1;

try {
  f122.start();
} catch (error) {
  console.log("ERROR START", error);
}

console.info("Formula 1 Telemetry Running\n");

if (readMotion) {
  f122.on("motion", function (motionData) {
    console.log("MOTION", motionData);
  });
}

if (readEvent) {
  f122.on("event", (eventData) => {
    handleEvent(eventData);
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
    // handleLapData(lapData); TODO: refactor

    if (currentPosition === -1 && lapData.m_lapData[carIndex]) {
      console.log("LAP DATA", lapData.m_lapData[carIndex]);

      currentPosition = lapData.m_lapData[carIndex].m_carPosition;
      console.log("Current position: " + currentPosition);

      return;
    }

    if (currentPosition !== lapData.m_lapData[carIndex].m_carPosition) {
      if (overtake === -1) {
        overtake = 0;
      }

	  /* Overtake condition */
      if (lapData.m_lapData[carIndex].m_carPosition < currentPosition) {

		/**
		 * TODO: Put audio in a queue to play them in sequence and not cut the one that is playing.
		 * TODO: Several audios per driver. Random
		 */
      sound.play("./assets/audio/vettel-trimmed.mp3");
      }

      console.log(
        "CHANGE POSITION! Old: " +
          currentPosition +
          " New: " +
          lapData.m_lapData[carIndex].m_carPosition
      );
      currentPosition = lapData.m_lapData[carIndex].m_carPosition;
    }
  });
}

if (readLobbyInfo) {
  f122.on("lobbyInfo", (lobbyData) => {
    logger.log('LOBBY INFO', lobbyData);
    console.log("LOBBY INFO", lobbyData);
  });
}

if (readParticipants) {
  f122.on("participants", (participantsData) => {
    logger.log('PARTICIPANTS', participantsData);
    console.log('PARTICIPANTS', participantsData);

	/* Update driver properties */ // TODO: refactor
    participantsData.m_participants.forEach((participant) => {
      if (driverName === "" && participant.m_name === "VETTEL") {
        console.log("Updating Driver Name and Index");
        driverName = participant.m_name;
        driverIndex = participant.m_driverId;
        carIndex = participantsData.m_header.m_playerCarIndex;
      }
    });
  });
}

if (readSession) {
  f122.on("session", (sessionData) => {
    logger.log('SESSION', sessionData);
    console.log("SESSION", sessionData);
  });
}

if (readSessionHistory) {
  f122.on("sessionHistory", (sessionHistoryData) => {
    logger.log('SESSION HISTORY', sessionHistoryData);
    console.log("SESSION HISTORY", sessionHistoryData);
  });
}

f122.on("error", (errorData) => {
  logger.error('ERROR', errorData);
  console.log("ERROR", errorData);
});

f122.on("other", (otherData) => {
  console.log("OTHER", otherData);
});