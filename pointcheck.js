const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"));

module.exports.run = async(Vbot, message, args) => {
    let splitted = args.join(" ");
    let user = message.mentions.users.first();

    if(!user) {
      let 유저 = message.author;
      if(!warns[유저.id]) {
        message.channel.send("\:x: 당신은 경고가 없습니다! ~~착하게 사셨군요!~~");
      } else if(warns[유저.id]) {
        let 됬음 = (`**\`\`\`md\n## ${유저.tag} 님의 경고는 현재 ${warns[유저.id].warns} 개가 있습니다!\`\`\`** `);
        message.channel.send(됬음)
      }
    } else if(user) {
      if(!message.member.hasPermission("MANAGE_MEMBERS")) {
        return message.channel.send("당신은 해당 유저의 경고포인트를 볼 권한이 없습니다!");
      }
      if(!warns[user.id]) {
        message.channel.send("\:x: 해당 유저는 착하게 살았습니다! 경고가 없어요!")
      } else {
        let 됬음 = (`**\`\`\`md\n## ${user.tag} 님의 경고는 현재 ${warns[user.id].warns} 개가 있습니다!\`\`\`** `);
        message.channel.send(됬음)
      }
    }
}

module.exports.config = {
  name: "pointcheck",
  aliases: ["경고확인", "rudrhghkrdls", "경고포인트", "경포"]
}
