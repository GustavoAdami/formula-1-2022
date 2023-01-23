const { logger } = require("../utils/logger");

const handleCarStatus = (carStatusData) => {
  console.log("CAR STATUS", carStatusData);
  logger("CAR STATUS", carStatusData);
};

exports.handleCarStatus = handleCarStatus;
