// Main Declarations = client
const Discord = require("discord.js");
const Vbot = new Discord.Client({disableEveryone: false});
const config = require("./configuration.json");
const prefix = config.prefix;
const fs = require("fs");

Vbot.on("ready", async () => {
  console.log(`[ LOGS - APP.js ] Client Initialized. \n[ LOGS - APP.js ] Logged on "${Vbot.user.tag}"`)
  Vbot.user.setPresence({ game: { name: '$$도움ㅣVBOT' }, status: 'dnd' })
})

Vbot.aliases = new Discord.Collection();
Vbot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) Vbot.channels.get("622324866300772352").send(` \`\`\`js\n${err}\`\`\` `);

   let jsfile = files.filter(f => f.split(".").pop() === "js")
   if(jsfile.length <= 0) {
       return console.log("[ ERROR - APP.js ] Failed loading commands, No commands existing.");
   }
   jsfile.forEach((f, i) => {
       let pull = require(`./commands/${f}`);
       Vbot.commands.set(pull.config.name, pull);
       pull.config.aliases.forEach(alias => {
           Vbot.aliases.set(alias, pull.config.name)
       });
   });
});

// Message Settings [ 메시지 설정 ]
Vbot.on("message", async message => {

  let mentioned = new Discord.RichEmbed()
    .setAuthor("읭? 누가 날 불렀어!")
    .setDescription("VBOT을 이용하시려면, $$도움 을 쳐주세요!")
    .addBlankField()
    .addField("VBOT 초대링크", `[여기를 클릭하세요](https://discordapp.com/oauth2/authorize?client_id=${config.vbot_id}&scope=bot&permissions=8)`)
    .setColor("#FFFFFF")
    .addField("TEAM CREDIT", "[여기를 클릭하세요](https://discord.gg/FnBm5Gf)")
    .setFooter(`Requested by | ${message.author.tag}`, message.author.displayAvatarURL)
    .setThumbnail(Vbot.user.displayAvatarURL)
    .setTimestamp();
   if(message.author.bot || message.channel.type === "dm") return;

   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);

   if(message.content.includes(`<@!${config.vbot_id}>`)) message.channel.send(mentioned)
   if(message.content.includes(`<@${config.vbot_id}>`)) message.channel.send(mentioned)

   if(!message.content.startsWith(prefix)) return;

   let commandfile = Vbot.commands.get(cmd.slice(prefix.length)) || Vbot.commands.get(Vbot.aliases.get(cmd.slice(prefix.length)))
   if(commandfile) commandfile.run(Vbot,message,args)
});

Vbot.login(config.token)
