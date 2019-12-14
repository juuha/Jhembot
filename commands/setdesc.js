const Description = require("../description.json")
const Config = require("../config.json")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        await message.delete()
    } catch (error) { console.error(error) }
    var desc = message_copy.content.slice(9)
    if (desc == "") {
        try {
            var sent = await message_copy.channel.send(`⚔️ Default description can't be empty.`)
            await sent.delete(Config.deletion_timer)
        } catch (error) { console.error(error) }
        return
    }
    Description[message_copy.guild.id] = desc

    fs.writeFile("./description.json", JSON.stringify(Description, null, 4), async (error) => {
        if (error) console.error(error)
    })

    try {
        var sent = await message_copy.channel.send(`⚔️ Default description has been changed to "${desc}"`)
        await sent.delete(Config.deletion_timer)
    } catch (error) { console.error(error) }
}

module.exports.help = {
    name: "setdesc"
}