const { logger } = require("../utils/logger");

const packetType = "LOBBY_INFO";
const saveLogs = true;

const handleLobbyData = (lobbyData) => {
  console.log(packetType, lobbyData);

  if (saveLogs) {
    logger(packetType, lobbyData);
  }
};

exports.handleLobbyData = handleLobbyData;
