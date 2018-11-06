# Insta-JS
Instagram bot written in JavaScript
## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 8.0.0 or higher](https://nodejs.org)
- The node-gyp build tools. This is a pre-requisite for Enmap, but also for a **lot** of other modules. See [The Enmap Guide](https://enmap.evie.codes/install#pre-requisites) for details and requirements for your OS. Just follow what's in the tabbed block only, then come back here!

Once finished:

- In the folder from where you ran the git command, run `cd Insta-JS` and then run `npm install`
- **If you get any error about python or msibuild.exe or binding, read the requirements section again!**
- Change `example-config.js` to `config.js`
- Edit `config.js` and fill in all the relevant details as indicated in the file's comments.

## Starting the bot

Run the `Node Start.bat`

**OR**

- install (pm2(https://www.npmjs.com/package/pm2))
- download my (pm2 scripts(https://github.com/AidanIsAJew/Insta-JS-pm2-scripts))
- add `PM2_Log.bat`, `PM2_Start.bat` and `PM2_Stop.bat` to your project folder
- change `"pm2": false,` to `"pm2": true,` in config.js

(pm2 quick start guide(http://pm2.keymetrics.io/docs/usage/quick-start/))

**OR**

In a command prompt, run the following command:
`node index.js`
