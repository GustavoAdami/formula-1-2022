const { logger } = require("../utils/logger");

const handleFinalClassification = (finalClassificationData) => {
  console.log("CAR CLASSIFICATION", finalClassificationData);
  logger("CAR CLASSIFICATION", finalClassificationData);
};

exports.handleFinalClassification = handleFinalClassification;
