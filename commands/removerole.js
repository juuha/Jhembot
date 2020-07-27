const fs = require("fs")
const Config = require("../config.json")
const roles_msg = require("./roles")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        await message.delete()
    } catch (error) { console.error(error) }

    if (!args[0]) {
        try {
            var sent = await message_copy.channel.send(`⚔️ You didn't specify what role to remove`)
            await sent.delete({timeout: Config.deletion_timer})
        } catch (error) { console.error(error) }
        return
    }

    var role = args[0]
    var emoji = bot.roles[message_copy.guild.id][role]
    let custom_emoji = bot.emojis.cache.find(emoji => emoji.name === bot.roles[message_copy.guild.id][role])
    if (custom_emoji) emoji = custom_emoji
    delete bot.roles[message_copy.guild.id][role]
    for (var [id, msg] of message_copy.channel.messages.cache) {
        if (msg.author.id != bot.user.id) continue
        if (msg.content.startsWith("> __**")) {
            for (var [id, reaction] of msg.reactions.cache) {
                if (reaction.emoji != emoji) continue
                for (var [id, user] of reaction.users.cache) {
                    try {
                        await reaction.remove(user)
                    } catch (error) { console.error(error) }
                }
            }
        } else if (!msg.content){
            var embed = await roles_msg.run(bot, msg, "update")
            msg.edit(embed)
        }
        
    }

    fs.writeFile("./roles.json", JSON.stringify(bot.roles, null, 4), async (error) => {
        if (error) console.error(error)
        let custom_emoji = bot.emojis.cache.find(emoji => emoji.name === bot.roles[message_copy.guild.id][role])
        if (custom_emoji) emoji = custom_emoji
        try {
            var sent = await message_copy.channel.send(`⚔️ Role \"${role}\" with emoji ${emoji} removed.`)
            await sent.delete({timeout: Config.deletion_timer})
        } catch (error) { console.error(error) }
    })
}

module.exports.help = {
    name: "removerole"
}