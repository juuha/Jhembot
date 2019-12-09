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

    message_copy.channel.send(`⚔️ What emoji should correspond to ${args[0]}`)

}

module.exports.help = {
    name: "addrole"
}