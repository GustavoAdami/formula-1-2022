const { logger } = require("../utils/logger");

const packetType = "SESSION";
const saveLogs = true;

const handleSession = (sessionData) => {
  console.log(packetType, sessionData);

  if (saveLogs) {
    logger(packetType, sessionData);
  }
};

exports.handleSession = handleSession;
