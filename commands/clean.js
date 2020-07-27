module.exports.run = async (bot, message, args) => {
    var messages = await message.channel.messages.fetch({ limit: 100 })
    for ([id, messag] of messages) {
        if (messag.content.startsWith("!")) {
            try {
                await messag.delete()
            } catch (error) { console.error(error) }
        } else if (messag.author.id = bot.user.id){
            for (const [id, reaction] of messag.reactions.cache) {
                try {
                    await reaction.users.fetch()
                } catch (error) { console.error(error) }
            }
        }
    }
}

module.exports.help = {
    name: "clean"
}