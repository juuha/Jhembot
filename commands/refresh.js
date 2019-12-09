const Config = require("../config.json")
createSchedule = require("../functions/createSchedule.js")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.error(error) }
    let messages = await message_copy.channel.fetchMessages({ limit: 100 })
    for (const [id, messag] of messages) {
        if (messag.author.username != bot.user.username
            || !messag.content.startsWith("> __**")) continue

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
    }
}

module.exports.help = {
    name: "refresh"
}