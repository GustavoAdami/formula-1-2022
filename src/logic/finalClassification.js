const { logger } = require("../utils/logger");

const packetType = "FINAL_CLASSIFICATION";
const saveLogs = true;

const handleFinalClassification = (finalClassificationData) => {
  console.log(packetType, finalClassificationData);

  if (saveLogs) {
    logger(packetType, finalClassificationData);
  }
};

exports.handleFinalClassification = handleFinalClassification;
