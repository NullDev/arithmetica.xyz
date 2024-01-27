# Admin Commands
A list of all the commands that are available for server admins.

| Name | Description | Parameters |
| --- | --- | --- |
| admin-help | Show an overview of all admin commands | - |
| ban-user | Ban a user from counting | User |
| unban-user | Unban a user from counting | User |
| cheat-mode | Enable cheat mode, if enabled false counting doesn't reset | True or False |
| cooldown | Cooldown for new members before they are allowed to count | <u>timeout</u>: in minutes, default: 60 |
| last-count | Show the last count of the server as number | - |
| reset-guild | Reset the count for the guild | - |
| set-channel | Set the counting channel | <u>Channel</u> |
| set-language | Set the language for the bot on this server | <u>Language Options</u>: Englisch, French, German, Japanese, Russian, Spanish |
| set-timeout | Configure a timeout for losers | Timeout in minutes, 0 = disabled |
| timeout-increment | Factor to increment the timeout for losers | <u>factor</u>: __1__ = no increment, __2__ = double the timeout on each fail, etc... |
| toggle-arithmetic | Change the arithmetic mode | <u>mode</u>: __Enable__ = normal numbers and arithmetic expressions, __Disable__ = no arithmetic expressions, __Force__ = only arithmetic expressions |

If you need any further assistance regarding the commands, feel free to contact us. Either on [GitHub](https://github.com/NullDev/Arithmetica-Bot/issues) by creating an issue or by joining our [Discord Server](https://discord.gg/hgFyq43dug).