const { logger } = require('../utils/logger');
const sound = require("sound-play");

const handleEvent = (eventData) => {
    if (typeof eventData === 'string') {
        eventData = JSON.parse(eventData);
      }
  
      logger.log('EVENT: ', eventData)
      console.log("EVENT", eventData);
      
    switch (eventData.m_eventStringCode) {
        case 'LGOT':
            lightsOut();
            break;
    
        default:
            break;
    }

}

function lightsOut() {
    try {
      const path = require("path");
      const filePath = path.join(__dirname, "../assets/audio/comments/lights-out.mp3");
      sound.play(filePath);


      } catch (error) {
        console.error('ERROR PLAY', error)
      }
}

exports.handleEvent = handleEvent;