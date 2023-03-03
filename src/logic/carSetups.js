const { logger } = require("../utils/logger");

const packetType = "CAR_SETUPS";
const saveLogs = true;

const handleCarSetups = (carSetupsData) => {
  console.log(packetType, carSetupsData);

  if (saveLogs) {
    logger(packetType, carSetupsData);
  }
};

exports.handleCarSetups = handleCarSetups;
