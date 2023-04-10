const { logger } = require("../utils/logger");

const packetType = "SESSION_HISTORY";
const saveLogs = false;

const handleSessionHistory = (sessionHistoryData, sessionConsolidated) => {
  // console.log(packetType, sessionHistoryData);

  if (saveLogs) {
    logger(packetType, sessionHistoryData);
  }

  if (typeof sessionHistoryData === "string") {
    sessionHistoryData = JSON.parse(sessionHistoryData);
  }

  if (sessionConsolidated.sessionId !== sessionHistoryData.m_header.m_sessionUID) {
    console.log("SESSION ID NOT MATCHED - HISTORY");
  }

  if (sessionConsolidated.finalClassification) {
    if (!sessionConsolidated.sessionHistory) {
      sessionConsolidated.sessionHistory = {};
      sessionConsolidated.sessionHistory.players = [];
    }

    if (sessionConsolidated.sessionHistory?.players.length < sessionConsolidated.finalClassification.numCars) {
      sessionConsolidated.sessionHistory.players.push(sessionHistoryData);

      if (sessionConsolidated.sessionHistory?.players.length === sessionConsolidated.finalClassification.numCars) {
        console.log("SESSION CONSOLIDATED", sessionConsolidated);
        logger("SUMMARY", sessionConsolidated);
        sessionConsolidated.reset = true;
      }
    }
  }

  return sessionConsolidated;
};

exports.handleSessionHistory = handleSessionHistory;
