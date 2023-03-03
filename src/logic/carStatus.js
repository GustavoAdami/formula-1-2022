const { logger } = require("../utils/logger");

const packetType = "CAR_STATUS";
const saveLogs = true;

const handleCarStatus = (carStatusData) => {
  console.log(packetType, carStatusData);

  if (saveLogs) {
    logger(packetType, carStatusData);
  }
};

exports.handleCarStatus = handleCarStatus;
