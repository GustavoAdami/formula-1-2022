const { logger } = require("../utils/logger");
const sound = require("sound-play");

const packetType = "EVENT";
const saveLogs = true;

const handleEvent = (eventData) => {
  console.log(packetType, eventData);

  if (saveLogs) {
    logger(packetType, eventData);
  }

  if (typeof eventData === "string") {
    eventData = JSON.parse(eventData);
  }

  switch (eventData.m_eventStringCode) {
    case "LGOT":
      lightsOut();
      break;

    default:
      break;
  }
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
