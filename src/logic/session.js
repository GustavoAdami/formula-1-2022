const { logger } = require("../utils/logger");

const packetType = "SESSION";
const saveLogs = true;

const handleSession = (sessionData) => {
  console.log(packetType, carDamageData);

  if (saveLogs) {
    logger(packetType, carDamageData);
  }
};

exports.handleSession = handleSession;
