const { networkInterfaces } = require("os");

function getNetworkInterfaces() {
  /* https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js */
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  return results;
}

const getLocalIPv4 = () => {
  const networkInterfaces = getNetworkInterfaces();

  return networkInterfaces["Ethernet 2"][0]
    ? networkInterfaces["Ethernet 2"][0]
    : networkInterfaces["Wi-Fi"][0];
};

exports.getLocalIPv4 = getLocalIPv4;
