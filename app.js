const Discord = require("discord.js")
const Token = require("./token.json")
const Config = require("./config.json")
const fs = require("fs")
createSchedule = require("./functions/createSchedule.js").default

const bot = new Discord.Client({ disableEveryone: true })
bot.commands = new Discord.Collection()
fs.readdir("./commands/", (error, files) => {
    if (error) console.error(error)
    let jsfiles = files.filter(file => file.split(".").pop() == "js")
    if (jsfiles.length == 0) return
    jsfiles.forEach((jsfile, i) => {
        let props = require(`./commands/${jsfile}`)
        console.log(`${jsfile} command loaded.`)
        bot.commands.set(props.help.name, props)
    })
})

bot.roles = require('./roles.json')

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online and ready to serve! Running on ${bot.guilds.size} servers!`)
    bot.user.setActivity("!help", { type: "PLAYING" })
})

bot.on("message", async (message) => {
    if (message.channel.type == "dm"
        || (message.author.bot && message.author != bot.user)) return
    if (message.author.username == bot.user.username
        && message.channel.name != "archive"
        && message.content.startsWith("> __**")) {
        for (role in bot.roles[message.guild.id]) {
            let emoji = bot.roles[message.guild.id][role]
            let custom_emoji = bot.emojis.find(emoji => emoji.name === bot.roles[message.guild.id][role])
            if (custom_emoji) emoji = custom_emoji
            try {
                if (custom_emoji) {
                    await message.react(emoji)
                } else {
                    await message.react(emoji)
                }
            } catch (error) { console.error(error) }
        }
        try {
            await message.react('♾️')
            await message.react('⛔')
        } catch (error) { console.error('One of the emojis failed.') }
    }

    let prefix = Config.prefix
    if (!message.content.startsWith(prefix)) return
    let msgArray = message.content.split(" ")
    let cmd = msgArray[0]
    let args = msgArray.slice(1)
    let cmd_file = bot.commands.get(cmd.slice(prefix.length))
    if (cmd_file) cmd_file.run(bot, message, args)
})

bot.on("messageReactionAdd", async (messageReaction, user) => {
    const { message } = messageReaction
    if (message.channel.type == "dm"
        || message.author.username != bot.user.username
        || user.bot
        || message.channel.name == "archive") return
    if (message.content.startsWith("> __**")) {
        var schedule = await createSchedule(bot, message)
        try {
            await message.edit(schedule)
        } catch (error) { console.log(error) }
    } else if (message.content.startsWith("⚔️ What emoji")) {
        var role = message.content.slice(38)
        if (!bot.roles[message.guild.id]) {
            bot.roles[message.guild.id] = {}
        }
        
        bot.roles[message.guild.id][role] = messageReaction.emoji.name
        fs.writeFile("./roles.json", JSON.stringify(bot.roles, null, 4), async (error) => {
            if (error) console.error(error)
            var sent = await message.channel.send(`⚔️ Role \"${role}\" added with emoji ${messageReaction.emoji}`)
            sent.delete(Config.deletion_timer)
            message.delete(Config.deletion_timer)
        })
        for (var [id, msg] of message.channel.messages) {
            if (msg.author == bot.user
                && msg.content.startsWith("> __**")) {
                try {
                    await msg.react(messageReaction.emoji)
                } catch (error) { console.error(error) }
            }
        }
    }
})

bot.on("messageReactionRemove", async (messageReaction, user) => {
    const { message } = messageReaction
    if (message.channel.type == "dm"
        || message.author.username != bot.user.username
        || user.bot
        || message.channel.name == "archive"
        || !message.content.startsWith("> __**")) return
    var schedule = createSchedule(bot, message)
    try {
        await message.edit(schedule)
    } catch (error) { console.log(error) }
})

bot.login(Token.token)