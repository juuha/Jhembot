module.exports = async (bot, message) => {
    var signups = {}

    var signees = new Set()
    var removees = new Set()
    for (var [id, reaction] of message.reactions.cache) {
        for (var [id, user] of reaction.users.cache) {
            if (user.id == bot.user.id) continue
            var emotion = ""
            for (role in bot.roles[message.guild.id]) {
                if (reaction.emoji.name == bot.roles[message.guild.id][role]) {
                    emotion = role
                    signees.add(user.username)
                    break
                }
            }
            if (reaction.emoji.name == "♾️") {
                emotion = "extra"
                signees.add(user.username)
            } else if (reaction.emoji.name == "⛔") {
                emotion = "no"
                removees.add(user.username)
            }
            if (emotion == "") reaction.remove(user)
            if (!signups[emotion]) {
                signups[emotion] = user.username
            } else {
                signups[emotion] = `${signups[emotion]}, ${user.username}`
            }
        }
    }

    if (removees.size > 0) {
        for (var [m_id, reaction] of message.reactions.cache) {
            var reactionUserManager = reaction.users
            for (var [r_id, user] of reaction.users.cache) {      
                if (user.id == bot.user.id) continue
                if (removees.has(user.username) && reaction.emoji.name != "⛔") {
                    reactionUserManager.remove(user)
                }
            }

        }
    }
    let roles = ""
    for (const role in bot.roles[message.guild.id]) {
        if (roles == "") {
            roles = `${role}: ${signups[role] || ""}`
        } else {
            roles = `${roles} \n${role}: ${signups[role] || ""}`
        }

    }
    if (!signups.extra) signups.extra = ""
    if (!signups.no) signups.no = ""
    var date = message.content.split('\n')[0].slice(6, 21)
    var description = message.content.split('\n')[1].substring(4).slice(0,-2)
    let schedule = `> __**${date}**__ \n> **${description}**\n Sign up by clicking one of the corresponding reactions! \n[${signees.size}/10] \`\`\`${roles} \nBackups: ${signups.extra} \n---------------\nCan't make it: ${signups.no}\`\`\``
    return schedule
}