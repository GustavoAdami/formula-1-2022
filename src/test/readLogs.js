const nReadlines = require("n-readlines");
const { handleEvent } = require("../logic/events");
const { handleLapData } = require("../logic/lapData");
const { handleMotion } = require("../logic/motion");
const { handleCarDamage } = require("../logic/carDamage");
const { handleCarSetups } = require("../logic/carSetups");
const { handleCarStatus } = require("../logic/carStatus");
const { handleCarTelemetry } = require("../logic/carTelemetry");
const { handleFinalClassification } = require("../logic/finalClassification");
const { handleLobbyData } = require("../logic/lobbyInfo");
const { handleParticipants } = require("../logic/participants");
const { handleSession } = require("../logic/session");
const { handleSessionHistory } = require("../logic/sessionHistory");

function readLogs() {
  const logFile = "logs\\2023-01-17_3-Brazil_logs.txt"; // SampleLog.txt
  const broadbandLines = new nReadlines(logFile);
  let currentLine;
  let lineNumber = 1;
  let lines = [];

  console.log("Reading file...");
  while ((currentLine = broadbandLines.next())) {
    console.log(`Line ${lineNumber}`); // has: ${currentLine.toString("ascii")}\n`);
    // console.log(JSON.parse(currentLine));
    lines.push(JSON.parse(currentLine));
    lineNumber++;
  }

  console.log("end of file.");
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`
  );

  return lines;
}

function readPacket(lines) {
  lines.forEach((line, index) => {
    const keys = Object.keys(line);
    const packet = line[keys];

    // console.log(packet);

    switch (packet.m_header.m_packetId) {
      case 0:
        handleMotion(packet);
        break;
      case 1:
        handleSession(packet);
        break;
      case 2:
        handleLapData(packet);
        break;
      case 3:
        handleEvent(packet);
        break;
      case 4:
        handleParticipants(packet);
        break;
      case 5:
        handleCarSetups(packet);
        break;
      case 6:
        handleCarTelemetry(packet);
        break;
      case 7:
        handleCarStatus(packet);
        break;
      case 8:
        handleFinalClassification(packet);
        break;
      case 9:
        handleLobbyData(packet);
        break;
      case 10:
        handleCarDamage(packet);
        break;
      case 11:
        handleSessionHistory(packet);
        break;
      default:
        break;
    }
  });
}

const lines = readLogs();
readPacket(lines);

exports.readLogs = readLogs;
