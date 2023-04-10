const { logger } = require("../utils/logger");

const packetType = "PARTICIPANTS";
const saveLogs = false;

const handleParticipants = (participantsData) => {
  // console.log(packetType, participantsData);

  if (saveLogs) {
    logger(packetType, participantsData);
  }

  /* Update driver properties */ // TODO: refactor
  // participantsData.m_participants.forEach((participant) => {
  //   if (driverName === "" && participant.m_name === "VETTEL") {
  //     console.log("Updating Driver Name and Index");
  //     driverName = participant.m_name;
  //     driverIndex = participant.m_driverId;
  //     carIndex = participantsData.m_header.m_playerCarIndex;
  //   }
  // });
};

exports.handleParticipants = handleParticipants;
