// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load up the instgram-private-api library
const Client = require('instagram-private-api').V1;

// Load our config and logger
Client.config = require("./config.js");
Client.logger = require("./modules/Logger.js");
// We also load the rest of the things we need in this file:
const Enmap = require("enmap");
const util = require('util');
const _ = require('lodash');
const Promise = require('bluebird');

// We use these lets later on, so maswell load them now
const device = new Client.Device(Client.config.username);
const setTimeoutPromise = util.promisify(setTimeout);
const storage = new Client.CookieFileStorage(__dirname + `/cookies/${Client.config.username}.json`);

// Let's start by getting some useful functions that we'll use throughout
// the bot.
require("./modules/functions.js")(Client);

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk.
// This makes things extremely easy for setting dates which we can comapre
// to later.
Client.dates = new Enmap({
  name: "dates"
});

// And go for login
Client.Session.create(device, storage, Client.config.username, Client.config.password)
  .then(async function(session) {
    Client.logger.log(`Logged in at ${session.device.username}`, "ready");
    // Now you have a session, we can follow / unfollow, anything...
    // And we want to follow Instagram official profile


    //60 × 60 seconds = 3600 seconds = 3600 × 1000 milliseconds = 3,600,000 ms + 10 (just in case...).
    const time = (60 * 60 * 1000) + 10
    Client.everyHour(session);
    setInterval(Client.everyHour, time, session);

  });
