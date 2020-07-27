createSchedule = require("../functions/createSchedule.js")
const roles_msg = require("./roles")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.error(error) }
    let messages = await message_copy.channel.messages.fetch({ limit: 100 })
    for (const [id, messag] of messages) {
        if (messag.author.id != bot.user.id || messag.content.startsWith("⚔️")) continue
        if (messag.content.startsWith("> __**")) {
            for (const [id, reaction] of messag.reactions.cache) {
                try {
                    await reaction.users.fetch()
                } catch (error) { console.error(error) }
            }
            let schedule = createSchedule(bot, messag)
            if (messag.content != schedule) {
                try {
                    await messag.edit(schedule)
                } catch (error) { console.error(error) }
            }
        } else if (!messag.content) {
            var embed = await roles_msg.run(bot, messag, "update")
            messag.edit(embed)
        }
    }
}

module.exports.help = {
    name: "refresh"
}