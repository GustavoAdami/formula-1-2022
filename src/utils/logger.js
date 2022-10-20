const { Console } = require("console");
const fs = require("fs");

// FIXME: refactor logger. File is overwritten everytime app runs.
// make a new logger
const logger = new Console({
    stdout: fs.createWriteStream("logs/logs.txt"),
    stderr: fs.createWriteStream("logs/error_logs.txt"),
  });
  
  // // saving to normalStdout.txt file
  // myLogger.log("Hello 😃. This will be saved in normalStdout.txt file");
  
  // // saving to errStdErr.txt file
  // myLogger.error("Its an error ❌. This will be saved in errStdErr.txt file");

//   const logger = (sessionId) => {
//     const log = new Console({
//         stdout: fs.createWriteStream(`logs/logs_${sessionId}.txt`),
//         stderr: fs.createWriteStream(`logs/error_logs_${sessionId}.txt`),
//       });


//     return logger;
//   } 

  exports.logger = logger;