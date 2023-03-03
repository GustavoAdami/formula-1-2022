const { logger } = require("../utils/logger");

const packetType = "CAR_TELEMETRY";
const saveLogs = true;

const handleCarTelemetry = (carTelemetryData) => {
  console.log(packetType, carTelemetryData);

  if (saveLogs) {
    logger(packetType, carTelemetryData);
  }

  const playerIndex = carTelemetryData.m_header.m_playerCarIndex;
  const playerCarTelemetry = carTelemetryData.m_carTelemetryData[playerIndex]

  // console.log(
  //   `SPEED: ${playerCarTelemetry.m_speed} -> THROTTLE: ${playerCarTelemetry.m_throttle * 100} %`);
};

exports.handleCarTelemetry = handleCarTelemetry;
 