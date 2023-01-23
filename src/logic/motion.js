const { logger } = require("../utils/logger");

const handleMotion = (motionData) => {
  console.log("MOTION", motionData);
  logger("MOTION", motionData);
};

exports.handleMotion = handleMotion;
