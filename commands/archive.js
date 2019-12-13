const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.error(error) }
    var found = 0
    var chann
    for (const [id, channel] of message_copy.guild.channels) {
        if (channel.name == "archive" && channel.type == "text") {
            chann = channel
            found = 1
        }
    }
    if (!found) {
        try {
            chann = await msg.guild.createChannel('archive', { type: "text" })
        } catch (error) { console.error(error) }
    }
    for (var [id, msg] of message_copy.channel.messages) {
        if (msg.author.id != bot.user.id || !msg.content.startsWith("> __**")) {
            continue
        }
        try {
            await chann.send(msg.content)
        } catch (error) {
            console.error(error)
        } finally {
            try {
                await msg.delete()
            } catch (error) { console.error(error) }
        }
    }
}

module.exports.help = {
    name: "archive"
}