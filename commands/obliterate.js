module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        await message.delete()
    } catch (error) { console.error(error) }

    let msgs = await message_copy.channel.messages.filter(msg => msg.author.id == bot.user.id)
    for (var [id, msg] of msgs) {
        try {
            await msg.delete()
        } catch (error) { console.error(error) }
    }
}

module.exports.help = {
    name: "obliterate"
}