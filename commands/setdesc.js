const Description = require("../description.json")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        await message.delete()
    } catch (error) { console.error(error) }
    Description[message_copy.guild.id] = message_copy.content.slice(9)

    fs.writeFile("../description.json", JSON.stringify(Description, null, 4), async (error) => {
        if (error) console.error(error)
    })
}

module.exports.help = {
    name: "setdesc"
}