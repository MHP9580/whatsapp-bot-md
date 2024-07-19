const { bot, bing } = require('../lib/')
const config = require('../config')
bot(
  {
    pattern: 'bing ?(.*)',
    fromMe: true,
    desc: 'bing ai',
    type: 'ai',
  },
  async (message, match) => {
    if (!config.BING_COOKIE)
      return await message.send(
        `Veuillez définir un cookie Bing, connectez-vous à bing.com, utilisez le chat Bing AI une fois, puis copiez le cookie.\n\nsetvar BING_COOKIE = copied_cookie`
      )
    match = match || message.reply_message.text
    if (!match) return await message.send('*Example : bing Hi*')
    await message.send(
      {
        text: '⏳',
        key: message.message.key,
      },
      {},
      'react'
    )
    const res = await bing(match)
    await message.send(
      {
        text: '✅',
        key: message.message.key,
      },
      {},
      'react'
    )
    return await message.send(res, { quoted: message.data })
  }
)
