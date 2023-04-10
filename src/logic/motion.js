const { logger } = require("../utils/logger");

const packetType = "MOTION";
const saveLogs = false;

const handleMotion = (motionData) => {
  // console.log(packetType, motionData);

  if (saveLogs) {
    logger(packetType, motionData);
  }
};

exports.handleMotion = handleMotion;
