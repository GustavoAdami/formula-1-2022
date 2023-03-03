const { logger } = require("../utils/logger");
// const sound = require("sound-play");

const packetType = "LAP_DATA";
const saveLogs = true;

const handleLapData = (lapData) => {
  console.log(packetType, lapData);

  if (saveLogs) {
    logger(packetType, lapData);
  }

  /** TODO: gotta fix PARTICIPANTS */

  // if (currentPosition === -1 && lapData.m_lapData[carIndex]) {
  //   console.log("LAP DATA", lapData.m_lapData[carIndex]);

  //   currentPosition = lapData.m_lapData[carIndex].m_carPosition;
  //   console.log("Current position: " + currentPosition);

  //   return;
  // }

  // if (currentPosition !== lapData.m_lapData[carIndex].m_carPosition) {
  //   if (overtake === -1) {
  //     overtake = 0;
  //   }

  // /* Overtake condition */
  //   if (lapData.m_lapData[carIndex].m_carPosition < currentPosition) {

  // /**
  //  * TODO: Put audio in a queue to play them in sequence and not cut the one that is playing.
  //  * TODO: Several audios per driver. Random
  //  */
  //   sound.play("./assets/audio/vettel-trimmed.mp3");
  //   }

  //   console.log(
  //     "CHANGE POSITION! Old: " +
  //       currentPosition +
  //       " New: " +
  //       lapData.m_lapData[carIndex].m_carPosition
  //   );
  //   currentPosition = lapData.m_lapData[carIndex].m_carPosition;
  // }
};

exports.handleLapData = handleLapData;
