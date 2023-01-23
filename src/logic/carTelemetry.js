const { logger } = require("../utils/logger");

const handleCarTelemetry = (carTelemetryData) => {
  console.log("CAR TELEMETRY", carTelemetryData);
  logger("CAR TELEMETRY", carTelemetryData);
};

exports.handleCarTelemetry = handleCarTelemetry;
