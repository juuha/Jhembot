const Config = require("../config.json")
const Description = require("../description.json")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    var date = new Date()
    try {
        message.delete()
    } catch (error) { console.error(error) }
    var week = {
        "mon": 1, "monday": 1,
        "tue": 2, "tuesday": 2,
        "wed": 3, "wednesday": 3,
        "thu": 4, "thursday": 4,
        "fri": 5, "friday": 5,
        "sat": 6, "saturday": 6,
        "sun": 7, "sunday": 7
    }
    var day = 0

    if (message_copy.content.startsWith("!schedule")) {
        day = week[args[0]]
        var description = message_copy.content.slice(10).split(/(?<=^\S+)\s/)[1]
        if (!description) {
            description = Description[message_copy.guild.id]
        }
    } else {
        day = week[message_copy.content.split(" ")[0].slice(1)]
        var description = message_copy.content.split(/(?<=^\S+)\s/)[1]
        if (!description) {
            description = Description[message_copy.guild.id]
        }
    }

    if (day) {
        var date = new Date()
        date.setDate(date.getDate() + (7 - date.getDay()) % 7 + day)
    } else {
        date = new Date(args[0])
    }

    if (!date instanceof Date || isNaN(date.getTime())) {
        var error_msg = "⚔️ Usage of command is !schedule <date> <description>. Use !help for more information."
        try {
            var sent = await message_copy.channel.send(error_msg)
            await sent.delete({timeout: Config.deletion_timer})
        } catch (error) { console.error(error) }
        return
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
    let schedule = `> __**${date}**__\n> **${description}**\n Sign up by clicking one of the corresponding reactions! \n[0/10]\`\`\`${roles} \nBackups: \n---------------\nCan't make it: \`\`\``
    try {
        await message_copy.channel.send(schedule)
    } catch (error) { console.error(error) }
}

module.exports.help = {
    name: "schedule",
    mon: "mon",
    tue: "tue",
    wed: "wed",
    thu: "thu",
    fri: "fri",
    sat: "sat",
    sun: "sun"
}