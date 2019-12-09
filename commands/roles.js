const Discord = require("discord.js")
const Config = require("../config.json")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        await message.delete()
    } catch (error) { console.error(error) }
    let roles = ""
    for (role in bot.roles[message_copy.guild.id]) {
        let emoji = bot.roles[message_copy.guild.id][role]
        let custom_emoji = bot.emojis.find(emoji => emoji.name === bot.roles[message.guild.id][role])
        if (custom_emoji) emoji = custom_emoji
        if (roles == "") {
            roles = `${role} : ${emoji}`
        } else {
            roles = roles + `\n${role} : ${emoji}`
        }
    }
    const embed = new Discord.RichEmbed()
        .setTitle(`🛡️ Current roles 🛡️`)
        .setColor(0xFF0000)
        .setDescription(roles)
    try {
        await message_copy.channel.send(embed)
    } catch (error) { console.error(error) }
}

module.exports.help = {
    name: "roles"
}