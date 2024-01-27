# Self Hosted
If you want full control of what is happening, this option is for you! But beware, this option isn't for everyone. You should know what you're doing. If you're unsure, better head back to the invite section and just use the public bot.
1. Clone the repo `git clone https://github.com/NullDev/Arithmetica-Bot.git`
2. Copy the `config/config.template.js` to `config/config.custom.js`
3. Make the neccessary changes in the config - to get your Bot Token, head to the [Discord Developer Portal](https://discord.com/developers/applications) and get your Token from the `Bot` section. The other tokens are optional and you don't have to worry about them.
4. Run the command `npm install`
5. Run `npm start:prod` OR if you're using `pm2`, which is the preferred option, run the command `pm2 start ecosystem.config.js`
6. You're all set, now you only have to invite the Bot to your server if you haven't done that already!
