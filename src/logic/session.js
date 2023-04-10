const { logger } = require("../utils/logger");

const packetType = "SESSION";
const saveLogs = false;

const handleSession = (sessionData, sessionConsolidated) => {
  // console.log(packetType, sessionData);

  if (saveLogs) {
    logger(packetType, sessionData);
  }

  const sessionSummary = {};

  if (typeof sessionData === "string") {
    sessionData = JSON.parse(sessionData);
  }

  if (sessionConsolidated.sessionId !== sessionData.m_header.m_sessionUID) {
    console.log("SESSION ID NOT MATCHED - SESSION");
  }

  if (!sessionConsolidated.sessionData) {
    sessionSummary.sessionData = {};
    sessionSummary.sessionData.gameMode = sessionData.m_gameMode;
    sessionSummary.sessionData.totalLaps = sessionData.m_totalLaps;
    sessionSummary.sessionData.trackId = sessionData.m_trackId;
    sessionSummary.sessionData.sessionType = sessionData.m_sessionType;
    sessionSummary.sessionData.formula = sessionData.m_formula;
    sessionSummary.sessionData.aiDifficulty = sessionData.m_aiDifficulty;
    sessionSummary.sessionData.seasonLinkId = sessionData.m_seasonLinkIdentifier;
    sessionSummary.sessionData.weekendLinkId = sessionData.m_weekendLinkIdentifier;
    sessionSummary.sessionData.sessionLinkId = sessionData.m_sessionLinkIdentifier;
    sessionSummary.sessionData.sessionLength = sessionData.m_sessionLength;
    sessionSummary.sessionData.ruleSet = sessionData.m_ruleSet;
    
  }

  return sessionSummary;
};

exports.handleSession = handleSession;
