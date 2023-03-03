const { logger } = require("../utils/logger");

const packetType = "CAR_DAMAGE";
const saveLogs = true;

const handleCarDamage = (carDamageData) => {
  console.log(packetType, carDamageData);

  if (saveLogs) {
    logger(packetType, carDamageData);
  }
};

exports.handleCarDamage = handleCarDamage;
