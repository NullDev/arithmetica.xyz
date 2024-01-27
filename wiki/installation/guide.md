# Starter Guide
On this page you will a short overview of a few settings you should take a look at before releasing the bot to your users!

Set the channel in which your users should count! `/set-channel <channel>`

Change the language of the bot if neccessary by using `/set-language <language>`. You have a few options that are defined in [Admin Commands](../commands/admin).

Do you want to reset the count every time a user fails? `/cheatmode <True | False>`

Set a cooldown so spammers and trollers don't have a chance to ruin your streak! `/cooldown <cooldown in minutes | default: 60>`

If you want your users to be punished when they fail, you can set a timeout and a timeout-increment!

`/set-timeout <timeout in minutes, 0 = disabled>` and `/timeout-increment <1 = none, 2 = double, ...>`

Find further details in the [Admin Commands](../commands/admin) section!
