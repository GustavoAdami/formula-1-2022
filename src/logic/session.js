const { logger } = require("../utils/logger");

const packetType = "SESSION";
const saveLogs = false;

const handleSession = (sessionData, sessionConsolidated) => {
  // console.log(packetType, sessionData);

  if (saveLogs) {
    logger(packetType, sessionData);
  }

  if (typeof sessionData === "string") {
    sessionData = JSON.parse(sessionData);
  }

  if (sessionConsolidated.sessionId !== sessionData.m_header.m_sessionUID) {
    console.log("SESSION ID NOT MATCHED");
    // return;
  }

  if (!sessionConsolidated.sessionData) {
    sessionConsolidated.sessionData = {};
    sessionConsolidated.sessionData.gameMode = sessionData.m_gameMode;
    sessionConsolidated.sessionData.totalLaps = sessionData.m_totalLaps;
    sessionConsolidated.sessionData.trackId = sessionData.m_trackId;
    sessionConsolidated.sessionData.sessionType = sessionData.m_sessionType;
    sessionConsolidated.sessionData.formula = sessionData.m_formula;
    sessionConsolidated.sessionData.aiDifficulty = sessionData.m_aiDifficulty;
    sessionConsolidated.sessionData.seasonLinkId = sessionData.m_seasonLinkIdentifier;
    sessionConsolidated.sessionData.weekendLinkId = sessionData.m_weekendLinkIdentifier;
    sessionConsolidated.sessionData.sessionLinkId = sessionData.m_sessionLinkIdentifier;
    sessionConsolidated.sessionData.sessionLength = sessionData.m_sessionLength;
    sessionConsolidated.sessionData.ruleSet = sessionData.m_ruleSet;
  }
};

exports.handleSession = handleSession;
