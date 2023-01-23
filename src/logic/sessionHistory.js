const { logger } = require("../utils/logger");

const handleSessionHistory = (sessionHistoryData) => {
  console.log("SESSION HISTORY", sessionHistoryData);
  logger("SESSION HISTORY", sessionHistoryData);
};

exports.handleSessionHistory = handleSessionHistory;
