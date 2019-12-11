const Config = require("../config.json")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.error(error) }

    if (!args[0]) {
        try {
            var sent = await message_copy.channel.send(`⚔️ You need to give the role a name!`)
            await sent.delete(Config.deletion_timer)
        } catch (error) { console.error(error) }
        return
    }

    if (bot.roles[message.guild.id][args[0]]) {
        try {
            let role = args[0]
            let emoji = bot.roles[message.guild.id][role]
            let custom_emoji = bot.emojis.find(emoji => emoji.name === bot.roles[message.guild.id][role])
            if (custom_emoji) emoji = custom_emoji
            var sent = await message.channel.send(`Role ${role} already exists with emoji ${emoji}, choose another name for the role or remove old role first.`)
        } catch (error) {
            console.error(error)
        } finally {
            await sent.delete(Config.deletion_timer)
        }
        return
    }

    message_copy.channel.send(`⚔️ What emoji should correspond to ${args[0]}`)

}

module.exports.help = {
    name: "addrole"
}