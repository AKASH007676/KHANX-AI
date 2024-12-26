const axios = require('axios')
const {cmd , commands} = require('../command')
// ship command 
const toM = (a) => '@' + a.split('@')[0];
cmd({
    pattern: "ship",
    alias: ["cup", "love"],
    desc: "Randomly pairs the command user with another group member.",
    react: "❤️",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, groupMetadata, reply }) => {
    try {
        // Ensure command is used in a group
        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        // Get group participants
        const participants = groupMetadata.participants.map(p => p.id);

        if (participants.length < 2) {
            return reply("Not enough members to pair.");
        }

        // Sender of the command
        const sender = m.sender;

        // Randomly select another participant
        let randomParticipant;
        do {
            randomParticipant = participants[Math.floor(Math.random() * participants.length)];
        } while (randomParticipant === sender);

        // Pairing message
        const message = `${toM(sender)} ❤️ ${toM(randomParticipant)}\nCongratulations 💖🍻`;

        // Send the message with contextInfo
        await conn.sendMessage(from, {
            text: message,
            contextInfo: {
                mentionedJid: [sender, randomParticipant], // Mention both users
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363354023106228@newsletter',
                    newsletterName: 'JawadTechX',
                    serverMessageId: 143,
                },
            },
        });
    } catch (e) {
        console.error("Error in ship command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
});
// Insult

cmd({
  pattern: 'insult',
  desc: 'Get a random insult',
  category: "fun",
  react: '🤥',
},
async (Void, citel) => {
  try {
    let response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    let data = response.data;

    if (!data || !data.insult) {
      return citel.reply('Unable to retrieve an insult. Please try again later.');
    }

    let insult = data.insult;
    return citel.reply(`*Insult:* ${insult}`);
  } catch (error) {
    citel.reply(`Error: ${error.message || error}`);
  }
});

// joke 

cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "🤣",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;

        const jokeMessage = `
😂 *Here's a random joke for you!* 😂

*${joke.setup}*

${joke.punchline} 😄

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ Jᴀᴡᴀᴅ TᴇᴄʜX*`;

        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ En Error Appears.");
    }
});

// fact

cmd({
    pattern: "fact",
    desc: "🧠 Get a random fun fact",
    react: "🧠",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://uselessfacts.jsph.pl/random.json?language=en';  // API for random facts
        const response = await axios.get(url);
        const fact = response.data.text;

        const funFact = `
🧠 *Random Fun Fact* 🧠

${fact}

Isn't that interesting? 😄
`;

        return reply(funFact);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
    }
});
    

// fancy 

cmd({
  pattern: "fancy",
  alias: ['font', "style"],
  react: '✍️',
  desc: "Convert text into various fonts.",
  category: "tools",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
  try {
    if (!q) {
      return reply("Please provide text to convert into fonts.");
    }

    let response = await axios.get('https://www.dark-yasiya-api.site/other/font?text=' + encodeURIComponent(q));
    let data = response.data;

    if (!data.status) {
      return reply("Error fetching fonts. Please try again later.");
    }

    let fontResults = data.result.map(font => '*' + font.name + ":*\n" + font.result).join("\n\n");
    
    // Message formatting
    let message = `*KHAN-AI FANCY FONTS*:\n\n${fontResults}\n\n> *BY JAWADTECHX*`;

    // Sending the message with context info
    await conn.sendMessage(
      from,
      {
        text: message,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354023106228@newsletter',
            newsletterName: 'JawadTechX',
            serverMessageId: 143
          }
        }
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error(error);
    reply("An error occurred while fetching fonts.");
  }
});


