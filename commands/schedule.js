const Config = require("../config.json")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    var date = new Date()
    try {
        message.delete()
    } catch (error) {console.error(error)}
    switch (args[0]) {
        case "mon":
        case "monday":
            date.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7); break;
        case "wednesday":
        case "wed":
            date.setDate(date.getDate() + (3 + 7 - date.getDay()) % 7); break;
        default:
            date = new Date(args[0]); break;
    }

    let roles = ""
    for (const role in bot.roles[message_copy.guild.id]) {
        if (roles == "") {
            roles = `${role}:`
        } else {
            roles = `${roles} \n${role}:`
        }
    }
    date = date.toDateString()
    let schedule = `> __**${date}**__\n> **${Config.time}**\n Sign up by clicking one of the corresponding reactions! \n[0/10]\`\`\`${roles} \nBackups: \n---------------\nCan't make it: \`\`\``
    try {
        await message_copy.channel.send(schedule)
    } catch (error) { console.error(error) }
}

module.exports.help = {
    name: "schedule"
}