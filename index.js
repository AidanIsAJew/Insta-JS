// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load up the instgram-private-api library
const Client = require('instagram-private-api').V1;
// We also load the rest of the things we need in this file:
const Enmap = require("enmap");
const util = require('util');
const _ = require('lodash');
const Promise = require('bluebird');

// We use these vars later on, so maswell load them now
const device = new Client.Device('bot.NodeJS');
const setTimeoutPromise = util.promisify(setTimeout);
// For some reason (__directory + `./cookies/${username}`)
// doesn't so we use the full path instead.
const storage = new Client.CookieFileStorage(__dirname + '/cookies/bot.NodeJS.json');

// Load our config and logger
Client.config = require("./config.js");
Client.logger = require("./modules/Logger.js");

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
Client.Session.create(device, storage, 'bot.NodeJS', 'carter979')
    .then(async function(session) {
        // Now you have a session, we can follow / unfollow, anything...
        // And we want to follow Instagram official profile

        //let usr = await Client.Account.searchForUser(session, 'instagram');
        //console.log(usr);

        var accountId = '25025320'
        var feed = new Client.Feed.UserMedia(session, accountId);

        Promise.mapSeries(_.range(0, 20), function() {
                return feed.get();
            })
            .then(function(results) {
                // result should be Media[][]
                //Client.logger.log(`NEW:\n\n ${results} \n\n`);

                var media = _.flatten(results);
                var urls = _.map(media, function(medium) {
                    Client.logger.log(`\n\n${medium.id}\n\n`);
                    //console.log(`\n\n####################\n\n\n\n`,medium.id);
                    return _.last(medium.images);
                });
                //Client.logger.log(`NEW:\n\n ${urls} \n\n`);
            })


        /*var find = await Client.findHashtag(session, 'follow4follows');
        var sort = await find.find(x => x.params.name === 'follow4follows');
        console.log(sort);*/


        /*var find = await Client.findRelationship(session, 'instagram');
        if (find.params.following === true) {
          var resolve = await Client.findUnfollow(session, 'instagram');
          console.log(resolve.params);
        } else {
          var resolve = await Client.findFollow(session, 'instagram');
          console.log(resolve.params);
        }*/
    });


Client.dates.defer.then(() => {
    Client.logger.log(Client.dates.size + " keys loaded");

    Client.dates.set("lastDate", Date.now());

    setTimeoutPromise(240).then(() => {
        var dat = (Date.now() - Client.dates.get("lastDate"));
        Client.logger.log(dat);
    });
});
