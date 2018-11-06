const config = {
  // Show debug output
  "debug": false,

  // pm2
  "pm2": false,

  // The tag thats going to be liked
  // Some common tags are:
  // like4likes
  // likeforlikes
  // follow4follows
  // followforfollowback
  // follow4followback
  "tag": "likeforlikes",

  // The time, in minutes, that will be between each like
  // DO NOT PUT THIS AT 0
  "min": 1,

  // Your instagram username
  "username": "INSTAGRAM_USERNAME",

  // Your instagram password
  "password": "INSTAGRAM_PASSWORD"
};

module.exports = config;
