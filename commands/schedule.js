const Config = require("../config.json")

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
    if (week[args[0]]) {
        day = week[args[0]]
    } else if (week[message_copy.content.slice(1)]) {
        day = week[message_copy.content.slice(1)]
    }
    if (day) {
        date.setDate(date.getDate() + (day + 7 - date.getDay()) % 7)
    } else {
        date = new Date(args[0])
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
    let schedule = `> __**${date}**__\n> **${Config.time[message_copy.guild.id]}**\n Sign up by clicking one of the corresponding reactions! \n[0/10]\`\`\`${roles} \nBackups: \n---------------\nCan't make it: \`\`\``
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