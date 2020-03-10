const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention | id>",
    run: async (client, message, args) => {

        function mDelete (message){
            message.delete();
        }

        if (message.deletable) mDelete(message);
        let byMember = message.member;
        
        let rMember = message.mentions.members.first();
        
        if (!rMember) return await message.reply("Can't find this member!").then(m => setTimeout(mDelete, 5000, m));
        let rReason = "";
        args.shift();
        
        if (!args) return await message.reply("Plz provide a reason!").then(m => setTimeout(mDelete, 5000, m));

        for (word in args) {
            rReason = `${rReason}${args[word]} `;
        }
        
        let rChannel = message.guild.channels.cache.filter(c => c.name === "bot_test").first();
        
        const report_message = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setAuthor(stripIndent`Report message`, byMember.user.displayAvatarURL())
            .setDescription(stripIndent`**Member:** ${rMember}
            **Reported by:** ${byMember}
            **Reason:** ${rReason}`)
            .setFooter(message.guild.name, message.guild.iconURL())


        rChannel.send(report_message);
    }
}