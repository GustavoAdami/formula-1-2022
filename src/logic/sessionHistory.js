const { logger } = require("../utils/logger");

const packetType = "SESSION_HISTORY";
const saveLogs = true;

const handleSessionHistory = (sessionHistoryData) => {
  console.log(packetType, carDamageData);

  if (saveLogs) {
    logger(packetType, carDamageData);
  }
};

exports.handleSessionHistory = handleSessionHistory;
