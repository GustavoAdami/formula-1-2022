const { logger } = require("../utils/logger");

const handleCarDamage = (carDamageData) => {
  console.log("CAR DAMAGE", carDamageData);
  logger("CAR DAMAGE", carDamageData);
};

exports.handleCarDamage = handleCarDamage;
