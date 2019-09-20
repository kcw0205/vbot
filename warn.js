const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"));

module.exports.run = async (Vbot, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(":x: 권한이 없습니다!");
  let wUser = message.mentions.users.first() || message.guild.members.get(args[0]);
  if(!wUser) return message.channel.send("먼저, 유저를 멘션해주세요!")
  let reason = args.join(" ").slice(22);
  if(!reason) return message.channel.send("사유를 적어주세요!")

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if(err) console.log(err);
  });

  let wEmbed = new Discord.RichEmbed()
  .setDescription("VBOT 경고시스템")
  .setColor("#FF0000")
  .setAuthor("경고발생됨", Vbot.user.displayAvatarURL)
  .addField("경고된 유저", wUser.tag)
  .addField("현재 경고 개수", `${warns[wUser.id].warns} / 7`)
  .addField("사유", reason)
  .setThumbnail(message.author.displayAvatarURL)
  .setFooter("유저의경고가 7개가 달성될시, 자동으로 밴됩니다!");

  let warnchannel = message.guild.channels.find('name', "r-log");
  if(!warnchannel) return message.reply(":x: 로그 채널이 없습니다! 똑같은 이름으로 채널을 만들어주세요: \"r-log\" !");

  warnchannel.send(wEmbed);
  message.channel.send(wEmbed)

  if(warns[wUser.id].warns == 4) {
    message.guild.member(wUser).kick(reason);
    let kicked = new Discord.RichEmbed()
    .setDescription("VBOT 경고시스템")
    .setColor("#FF0000")
    .setAuthor("경고 발생됨 + 킥됨", Vbot.user.displayAvatarURL)
    .addField("킥된 유저", wUser.tag)
    .addField("현재 경고 개수", `${warns[wUser.id].warns} / 7`)
    .addField("사유", reason)
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter("유저의경고가 7개가 달성될시, 자동으로 밴됩니다!");
    warnchannel.send(kicked)
  } else if(warns[wUser.id].warns == 7) {
    message.guild.member(wUser).ban(reason);
    let banned = new Discord.RichEmbed()
    .setDescription("VBOT 경고시스템")
    .setColor("#FF0000")
    .setAuthor("유저가 밴됨", Vbot.user.displayAvatarURL)
    .addField("밴된 유저", wUser.tag)
    .addField("현재 경고 개수", `밴이 됬습니다!`)
    .addField("사유", reason)
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter("유저의경고가 7개가 달성될시, 자동으로 밴됩니다!");
    warnchannel.send(banned)
  }


}

module.exports.config = {
  name: "경고",
  aliases: ["warning", "givewarn", "rudrh"]
}
