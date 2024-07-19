const { bot, getGPTResponse, getDallEResponse } = require('../lib')

bot(
  {
    pattern: 'gpt ?(.*)',
    fromMe: true,
    desc: 'ChatGPT fun',
    type: 'AI',
  },
  async (message, match) => {
    match = match || message.reply_message.text
    if (!match) return await message.send('*Example : gpt Quelle est la capitale de la France ?*')
    const res = await getGPTResponse(match)
    await message.send(res, { quoted: message.data })
  }
)

bot(
  {
    pattern: 'dall ?(.*)',
    fromMe: true,
    desc: 'dall image generator',
    type: 'AI',
  },
  async (message, match) => {
    if (!match)
      return await message.send(
        '*Example : dall un gros plan, portrait photographique en studio d''un chat siamois blanc qui a l''air curieux, oreilles rétroéclairées*'
      )
    const res = await getDallEResponse(match)
    await message.sendFromUrl(res)
  }
)
