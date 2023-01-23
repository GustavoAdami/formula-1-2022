const { logger } = require("../utils/logger");

const handleCarSetups = (carSetupsData) => {
  console.log("CAR SETUPS", carSetupsData);
  logger("CAR SETUPS", carSetupsData);
};

exports.handleCarSetups = handleCarSetups;
