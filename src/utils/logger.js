const fs = require("fs");

// FIXME: refactor logger
function logger(type, message) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const monthTxt = month < 10 ? "0" + month : month;

  fs.appendFile(
    `logs\\${year}-${monthTxt}-${day}_logs.txt`,
    '{"' + type + '": ' + JSON.stringify(message) + "}\n",
    function (err) {
      if (err) throw err;
    }
  );
}

exports.logger = logger;
