createSchedule = require("../functions/createSchedule.js")
const roles = require("./roles")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.error(error) }
    let messages = await message_copy.channel.fetchMessages({ limit: 100 })
    for (const [id, messag] of messages) {
        if (messag.author.id != bot.user.id || messag.content.startsWith("⚔️")) continue
        if (messag.content.startsWith("> __**")) {
            for (const [id, reaction] of messag.reactions) {
                try {
                    await reaction.fetchUsers()
                } catch (error) { console.error(error) }
            }
            try {
                let schedule = createSchedule(bot, messag)
                await messag.edit(schedule)
            } catch (error) {
                console.error(error)
            }
        } else if (!messag.content) {
            var embed = await roles.run(bot, message_copy, "update")
            messag.edit(embed)
        }
    }
}

module.exports.help = {
    name: "refresh"
}