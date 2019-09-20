const Discord = require("discord.js");

module.exports.run = async(Vbot, message, args) => {
  let yes = new Discord.RichEmbed()
    .setTitle("\:white_check_mark: 도움말이 보내졌습니다!")
    .setDescription("**DM을 확인해주세요!\n봇을 초대하고 싶으면, 봇을 @멘션 해주세요!**")
    .setColor("#90EE90")
    .setFooter(`Requested Byㅣ${message.author.tag}`)
    .setThumbnail(Vbot.user.displayAvatarURL);

    if(!message.member.hasPermission("ADMINISTRATOR")) {
      let embed = new Discord.RichEmbed()
        .setTitle(":loudspeaker: 봇 명령어 리스트")
        .setColor("#00FFFF")
        .setThumbnail(Vbot.user.displayAvatarURL)
        .setDescription("봇의 명령어 리스트 입니다!")
        .addField("$$userinfo", "유저정보를 보여줍니다! 멘션을 할경우, 멘션한 유저의 정보를 보여줍니다!")
        .addField("$$serverinfo", "서버정보를 불러옵니다!")
        .addField("$$pointcheck", "자신의 경고레벨을 확인합니다!")
        .addField("$$botinfo", "VBOT의 정보를 보여줍니다")
        .addField("$$support [내용]", "봇의 제작자에게 [내용] 으로 문의를 보냅니다.")
        .setFooter(`Requested Byㅣ${message.author.tag}`, message.author.displayAvatarURL)
        message.author.send(embed)
        message.channel.send(yes)

    } else if(message.member.hasPermission("ADMINISTRATOR")) {
      let general = new Discord.RichEmbed()
        .setTitle(":loudspeaker: 봇 명령어 리스트")
        .setColor("#00FFFF")
        .setThumbnail(Vbot.user.displayAvatarURL)
        .setDescription("봇의 명령어 리스트 입니다!")
        .addField("$$userinfo", "유저정보를 보여줍니다! 멘션을 할경우, 멘션한 유저의 정보를 보여줍니다!")
        .addField("$$serverinfo", "서버정보를 불러옵니다!")
        .addField("$$pointcheck", "자신의 경고레벨을 확인합니다!")
        .addField("$$botinfo", "VBOT의 정보를 보여줍니다")
        .addField("$$support [내용]", "봇의 제작자에게 [내용] 으로 문의를 보냅니다.")

      let embed = new Discord.RichEmbed()
        .setTitle(":tools: VBOT 관리 명령어 리스트")
        .setDescription("관리자 전용 명령어 리스트 입니다!")
        .setColor("#00FFFF")
        .addField("$$pointcheck [@멘션]", "@멘션 된 유저의 경고를 확인하거나 자신의 경고를 확인합니다.")
        .addField("$$vote", "아직 준비중")
        .addField("$$warn [@유저] [사유]", "@유저 를 특정 [사유] 로 글로벌 경고를 합니다.\n**참고: r-log 라는 채널을 만들지 않으면, 경고가 불가능합니다!**")
        .setFooter(`Requested Byㅣ${message.author.tag}`)

        message.channel.send(yes)
        message.author.send(general)
        message.author.send(embed)

    }

}

module.exports.config = {
  name: "help",
  aliases: ["도움", "ㅗ디ㅔ", "ehdna", "?"]
}
