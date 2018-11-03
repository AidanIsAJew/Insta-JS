module.exports = (Client) => {
    /***************************************************/
    /* Client.Relationship.create(session, account.id) */
    /*  Follows the "account.id" 's profile            */
    /*                                                 */
    /* Client.Relationship.destroy(session, account.id)*/
    /*  UnFollows the "account.id" 's profile          */
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
};
