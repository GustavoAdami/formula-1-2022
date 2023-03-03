const { logger } = require("../utils/logger");

const packetType = "SESSION_HISTORY";
const saveLogs = true;

const handleSessionHistory = (sessionHistoryData) => {
  console.log(packetType, sessionHistoryData);

  if (saveLogs) {
    logger(packetType, sessionHistoryData);
  }
};

exports.handleSessionHistory = handleSessionHistory;
