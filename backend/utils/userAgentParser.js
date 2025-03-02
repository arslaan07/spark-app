const UAParser = require("ua-parser-js");

function parseUserAgent(userAgent = "") {
    const parser = new UAParser();
    parser.setUA(userAgent); // Explicitly set the user agent

    const device = parser.getDevice().type || "Desktop";
    const os = parser.getOS().name || "Unknown";

    return { device, os };
}

module.exports = { parseUserAgent };
