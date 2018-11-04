module.exports = (Client) => {
  /***************************************************/
  /* Client.Relationship.create(session, account.id) */
  /*  Follows the "account.id" 's profile            */
  /*                                                 */
  /* Client.Relationship.destroy(session, account.id)*/
  /*  UnFollows the "account.id"
's profile          */
  /***************************************************/

  Client.findFollow = async (session, name) => {
    const account = await Client.Account.searchForUser(session, name);
    var get = await Client.Relationship.get(session, account.id);
    if (get.params.following === false) {
      return Client.Relationship.create(session, account.id);
    } else {
      return `You are already following ${name}.`;
    }
  };

  Client.findUnfollow = async (session, name) => {
    const account = await Client.Account.searchForUser(session, name);
    var get = await Client.Relationship.get(session, account.id);
    if (get.params.following === true) {
      return Client.Relationship.destroy(session, account.id);
    } else {
      return `You are already not following ${name}.`;
    }
  };

  Client.findRelationship = async (session, name) => {
    const account = await Client.Account.searchForUser(session, name);
    var get = await Client.Relationship.get(session, account.id);
    return get;
  };

  Client.findHashtag = async (session, name) => {
    const tag = await Client.Hashtag.search(session, name);
    return tag;
  };


  Client.waitMin = async (num) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, num * 1000 * 60);
    });
  };

  Client.everyHour = async (session) => {

    const _ = require('lodash');
    const Promise = require('bluebird');

    Client.logger.log(`Fetching posts tagged with #${Client.config.tag}`)
    let feed = new Client.Feed.TaggedMedia(session, Client.config.tag, 10);
    let ids = [];

    await Promise.mapSeries(_.range(0, 20), function() {
        return feed.get();
      })
      .then(async function(results) {
        // result should be Media[][]
        let media = _.flatten(results);
        let urls = _.map(media, function(medium) {
          if (Client.config.debug === true) {
            Client.logger.log(`${medium.id}`, "debug");
          }
          ids.push(medium.id);
        });
      });

    const min = 2;
    Client.logger.log(`Done! Fetched ${ids.length - 1} posts.`);
    Client.logger.log(`Liking each posts with ${min} min interval between. Rate: ${60/min}/hr`)
    for (let i = 0; i < ids.length; i++) {
      if (Client.config.debug === true) {
        Client.logger.log(`Catching`, "debug");
      }

      await Client.waitMin(min);

      if (Client.config.debug === true) {
        Client.logger.log(`Resolved`, "debug");
      }

      await Client.Like.create(session, ids[i]);
      const media = await Client.Media.getById(session, ids[i]);
      Client.likes.inc("likes");
      Client.logger.log(`Liked post by ${media.account.params.username}`);
      Client.logger.log(`Liked ${Client.likes.get("likes")} posts`);
    }
    Client.logger.log(`Done!`);
  };
};
