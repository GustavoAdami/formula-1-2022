const { logger } = require("../utils/logger");

const packetType = "FINAL_CLASSIFICATION";
const saveLogs = false;

const handleFinalClassification = (finalClassificationData, sessionConsolidated) => {
  // console.log(packetType, finalClassificationData);

  if (saveLogs) {
    logger(packetType, finalClassificationData);
  }

  const finalClassificationSummary = {};

  if (typeof finalClassificationData === "string") {
    finalClassificationData = JSON.parse(finalClassificationData);
  }

  if (sessionConsolidated.sessionId !== finalClassificationData.m_header.m_sessionUID) {
    console.log("SESSION ID NOT MATCHED - FINAL CLASSIFICATION");
  }

  if (!sessionConsolidated.finalClassification) {
    finalClassificationSummary.finalClassification = {};
    finalClassificationSummary.finalClassification.numCars = finalClassificationData.m_numCars;
    finalClassificationSummary.finalClassification.classification = finalClassificationData.m_classificationData;
  }

  return finalClassificationSummary;
};

exports.handleFinalClassification = handleFinalClassification;
