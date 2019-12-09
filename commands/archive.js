const Discord = require("discord.js")
const Config = require("../config.json")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.error(error) }
    var found = 0
    for (const [id, channel] of message_copy.guild.channels) {
        if (channel.name == "archive" && channel.type == "text") {
            found = 1
        }
    }
    if (!found) {
        try {
            var chann = await msg.guild.createChannel('archive', { type: "text" })
        } catch (error) { console.error(error) }
    }
    for (var [id, msg] of message_copy.channel.messages) {
        if (msg.author.id != bot.user.id
            || msg.content.startsWith("⚔️")) {
            continue
        }
        if (msg.content) {
            for (const [id, channel] of msg.guild.channels) {
                if (channel.name == "archive" && channel.type == "text") {
                    try {
                        await channel.send(msg.content)
                        await msg.delete()
                    } catch (error) { console.error(error) }
                }
            }

        } else {
            for (var [id, channel] of msg.guild.channels) {
                if (channel.name == "archive" && channel.type == "text") {
                    for (var embed of msg.embeds) {
                        const embed2 = new Discord.RichEmbed()
                            .setTitle(embed.title)
                            .setDescription(embed.description)
                            .setColor(embed.color)
                        try {
                            await channel.send(embed2)
                            await msg.delete()
                        } catch (error) { console.error(error) }
                    }
                }
            }
        }
    }
}

module.exports.help = {
    name: "archive"
}