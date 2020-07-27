const Discord = require("discord.js")
const Token = require("./token.json")
const Config = require("./config.json")
const roles_msg = require("./commands/roles")
const fs = require("fs")
createSchedule = require("./functions/createSchedule.js")
initGuild = require("./functions/initGuild.js")

const bot = new Discord.Client({ disableEveryone: true, partials: ['MESSAGE', 'REACTION'] })
bot.commands = new Discord.Collection()
fs.readdir("./commands/", (error, files) => {
    if (error) console.error(error)
    let jsfiles = files.filter(file => file.split(".").pop() == "js")
    if (jsfiles.length == 0) return
    for (const jsfile of jsfiles) {
        let props = require(`./commands/${jsfile}`)
        for (const key in props.help) {
            //console.log(`${props.help[key]} command loaded.`)
            bot.commands.set(props.help[key], props)
        }
    }
})

bot.roles = require('./roles.json')

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online and ready to serve! Running on ${bot.guilds.cache.size} servers!`)

    for (var [id, guild] of bot.guilds.cache) {
        initGuild(bot, guild)
    }
    bot.user.setActivity("!help", { type: "LISTENING" })
    
})

bot.on("guildCreate", async (guild) => {
    initGuild(bot, guild)
})

bot.on("message", async (message) => {
    if (message.partial) await message.fetch()
    if (message.channel.type == "dm"
        || (message.author.bot && message.author.id != bot.user.id)) return
    if (message.author.id == bot.user.id
        && message.channel.name != "archive"
        && message.content.startsWith("> __**")) {
        for (role in bot.roles[message.guild.id]) {
            let emoji = bot.roles[message.guild.id][role]
            let custom_emoji = bot.emojis.cache.find(emoji => emoji.name === bot.roles[message.guild.id][role])
            if (custom_emoji) emoji = custom_emoji
            try {
                await message.react(emoji)
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
    if (messageReaction.message.partial) {
        try {
            await messageReaction.message.fetch()
        } catch (error) { console.error(error) }
        for (const [id, reaction] of messageReaction.message.reactions.cache) {
            try {
                await reaction.users.fetch()
            } catch (error) { console.error(error) }
        }
    }
    const { message } = messageReaction
    if (message.channel.type == "dm"
        || message.author.id != bot.user.id
        || message.channel.name == "archive") return
    if (message.content.startsWith("> __**")) {
        var schedule = await createSchedule(bot, message)
        if (message.content != schedule) {
            try {
                await message.edit(schedule)
            } catch (error) { console.log(error) }
        }
    } else if (message.content.startsWith("⚔️ What emoji")) {
        var role = message.content.slice(35)
        bot.roles[message.guild.id][role] = messageReaction.emoji.name
        fs.writeFile("./roles.json", JSON.stringify(bot.roles, null, 4), async (error) => {
            if (error) console.error(error)
            var sent = await message.channel.send(`⚔️ Role \"${role}\" added with emoji ${messageReaction.emoji}`)
            sent.delete({timeout: Config.deletion_timer})
            message.delete({timeout: Config.deletion_timer})
        })
        await message.channel.messages.fetch()
        for (var [id, msg] of message.channel.messages.cache) {
            if (msg.author.id == bot.user.id) {
                if (msg.content.startsWith("> __**")) {
                    try {
                        console.log(messageReaction.emoji)
                        await msg.react(messageReaction.emoji)
                    } catch (error) { console.error(error) }
                } else if (!msg.content) {
                    var embed = await roles_msg.run(bot, msg, "update")
                    msg.edit(embed)
                }
            }
        }
    }
})

bot.on("messageReactionRemove", async (messageReaction, user) => {
    if (messageReaction.message.partial) await messageReaction.message.fetch()
    if (messageReaction.partial) await messageReaction.fetch()
    const { message } = messageReaction
    if (message.channel.type == "dm"
        || message.author.id != bot.user.id
        || message.channel.name == "archive"
        || !message.content.startsWith("> __**")) return
    var schedule = await createSchedule(bot, message)
    try {
        await message.edit(schedule)
    } catch (error) { console.log(error) }
})

bot.login(Token.token)