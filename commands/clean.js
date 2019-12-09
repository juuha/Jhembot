module.exports.run = async (bot, message, args) => {
    var messages = await message.channel.fetchMessages({ limit: 100 })
    for ([id, messag] of messages) {
        if (messag.content.startsWith("!")) {
            try {
                await messag.delete()
            } catch (error) { console.error(error) }
        }
    }
}

module.exports.help = {
    name: "clean"
}