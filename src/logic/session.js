const { logger } = require("../utils/logger");

const handleSession = (sessionData) => {
  console.log("SESSION", sessionData);
  logger("SESSION", sessionData);
};

exports.handleSession = handleSession;
