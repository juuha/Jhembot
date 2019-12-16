const fs = require("fs")
const Description = require("../description.json")

module.exports = (bot, guild) => {
    bot.roles = require('../roles.json')
    if (!bot.roles[guild.id]) {
        bot.roles[guild.id] = {}
        fs.writeFile("./roles.json", JSON.stringify(bot.roles, null, 4), async (error) => {
            if (error) console.error(error)
        })
    }
    if (!Description[guild.id]) {
        Description[guild.id] = `##Set the default description with !setdesc <description>##`
        fs.writeFile("./description.json", JSON.stringify(Description, null, 4), async (error) => {
            if (error) console.error(error)
        })
    }
}