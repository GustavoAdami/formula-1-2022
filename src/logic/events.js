const { logger } = require("../utils/logger");
const sound = require("sound-play");

const packetType = "EVENT";
const saveLogs = false;

const handleEvent = (eventData) => {
  // console.log(packetType, eventData);
  
  if (saveLogs) {
    logger(packetType, eventData);
  }

  const eventSummary = {};

  if (typeof eventData === "string") {
    eventData = JSON.parse(eventData);
  }

  switch (eventData.m_eventStringCode) {
    case "LGOT":
      lightsOut();
      break;

    case "SSTA":
      console.log("Session Started");
      eventSummary.sessionId = eventData.m_header.m_sessionUID;
      eventSummary.playerCarIndex = eventData.m_header.m_playerCarIndex;
      eventSummary.inProgress = true;
      break;

    case "SEND":
      console.log("Session Ended");
      eventSummary.inProgress = false;
      break;

    default:
      break;
  }

  return eventSummary;
};

function lightsOut() {
  try {
    const path = require("path");
    const filePath = path.join(
      __dirname,
      "../assets/audio/comments/lights-out.mp3"
    );
    sound.play(filePath);
  } catch (error) {
    console.error("ERROR PLAY", error);
  }
}

exports.handleEvent = handleEvent;
