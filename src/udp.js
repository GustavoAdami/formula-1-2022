const UDP = require('node:dgram');
const client = UDP.createSocket('udp4');
const { getLocalIPv4 } = require('./utils/utils');

const port = 20777;
const hostname = getLocalIPv4();

const sampleEventButtonPackageParsed = Buffer.from('{"m_header":{"m_packetFormat":2022,"m_gameMajorVersion":1,"m_gameMinorVersion":14,"m_packetVersion":1,"m_packetId":3,"m_sessionUID":"2575376323649103380","m_sessionTime":8.408215522766113,"m_frameIdentifier":224,"m_playerCarIndex":19,"m_secondaryPlayerCarIndex":255},"m_eventStringCode":"BUTN","Buttons":{"m_buttonStatus":256}}');
const sampleEventLightsOutParsed = Buffer.from(JSON.stringify({
    m_header: {
      m_packetFormat: 2022,
      m_gameMajorVersion: 1,
      m_gameMinorVersion: 14,
      m_packetVersion: 1,
      m_packetId: 3,
      m_sessionUID: '1680487826192139260',
      m_sessionTime: 6.9323201179504395,
      m_frameIdentifier: 189,
      m_playerCarIndex: 19,
      m_secondaryPlayerCarIndex: 255
    },
    m_eventStringCode: 'LGOT',
    StartLightsOut: { LightsOut: 144 }
  }));

const packetToSend = sampleEventLightsOutParsed;

client.send(packetToSend, port, hostname, (err) => {
  if (err) {
    console.error('Failed to send packet !!')
    client.close();
  } else {
    console.log('Packet send !!')
    client.close();
  }
});

// // Check if any message is received
// client.on('message', (message, info) => {
//     // get the information about server address, port, and size of packet received.
//     console.log('Address: ', info.address, 'Port: ', info.port, 'Size: ', info.size)
  
//     //read message from server
//     console.log('Message from server', message.toString())
//   })
