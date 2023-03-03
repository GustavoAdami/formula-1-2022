const { logger } = require("../utils/logger");

const packetType = "MOTION";
const saveLogs = true;

const handleMotion = (motionData) => {
  console.log(packetType, motionData);

  if (saveLogs) {
    logger(packetType, motionData);
  }
};

exports.handleMotion = handleMotion;
