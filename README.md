# Jhembot

Jhembot is a discort bot that helps scheduling raids. It creates a schedule filled with a set of roles that correspond to emojis. The be bot places reactions with the emojis under the schedule, that can be clicked by people who want to sign up for the raid. 

## Commands

- **!schedule \<date> \<description>** - generates an interactable raid schedule. For <date> use mon or monday for the next Monday, tue or tuesday for the next Tuesday and so on. You can also use YYYY.MM.DD for a date that isn't next week. For <desc> add an optional description for the schedule.  
- **!mon \<description>** - shortened version of !schedule monday \<description>. Also works for other days of the week. 
- **!setdesc <description>** - sets the default description for your schedule. 
- **!addrole <name of role>** - creates a new role to be presented in the schedule. 
- **!removerole <name of role>** - removes a roles from the list of roles. 
- **!roles** - shows the current roles and their respective emojis. 
- **!refresh** - revitalizes old messages in the channel after bot has been restarted. 
- **!archive** - moves all schedules generated by this bot to the #archive channel. If the #archive channel doesn't exist, the bot will create it for you. 
- **!clean** - cleans all messages starting with "!" in the channel. 
- **!help** - sends this message to the invoker through direct message in discord.

### Prerequisites

- Node.js 6.0.0 or newer is required.
- Discord account (If you have one already, no need to create a separate one for the bot).

### Installing

1. Download or clone this project from Github to a local directory.
2. Run the command `npm install` in the project directory to install the project dependencies. 
3. Go to <https://discordapp.com/developers/applications/> and login if promted. 
    - Click "New Application" on the top right.
    - Give the bot a name. This will be the name seen in Discord.
    - Copy the CLIENT ID to somewhere for later.
    - Click "Bot" on the list on the left. 
    - Click "Add Bot".
    - Under TOKEN click "Copy" to copy the token.
4. Open token.json in the project directory.
    - Change the \<token here> with the token you just copied.
    - So it looks something like (make sure to include the quotation marks)
    
    `{ "token": "123456789.abcdefg.12345678-abcdefg" }`
    - Save the file.
5. Start the bot with the command `node app.js` in the project directory.
6. You will now need the CLIENT ID we saved before now, replace \<CLIENT ID> with it in the following link. Paste this into your browser to invite the bot to your server:

    `
    https://discordapp.com/api/oauth2/authorize?client_id=<CLIENT ID>&permissions=1074097232&scope=bot
    `
7. Done!
8. In Discord use !help to get the command list and to get started.
    


## Authors

* **Juha Ritakoski** - [Juuha](https://github.com/juuha)

## License

This project is licensed under the MIT License - see the [license.md](license.md) file for details