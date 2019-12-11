const Config = require("../config.json")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        await message.delete()
    } catch (error) { console.error(error) }
    if (!Config[message_copy.guild.id]) {
        Config[message_copy.guild.id] = {}
    }
    Config[message_copy.guild.id].time = message_copy.content.slice(9)

    fs.writeFile("./config.json", JSON.stringify(Config, null, 4), async (error) => {
        if (error) console.error(error)
    })
}

module.exports.help = {
    name: "settime"
}