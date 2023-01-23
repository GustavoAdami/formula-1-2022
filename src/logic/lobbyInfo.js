const { logger } = require("../utils/logger");

const handleLobbyData = (lobbyData) => {
  console.log("LOBBY INFO", lobbyData);
  logger("LOBBY INFO", lobbyData);
};

exports.handleLobbyData = handleLobbyData;
