const config = require('../config')
const { trt, bot } = require('../lib/index')

bot(
	{
		pattern: 'trt ?(.*)',
		fromMe: true,
		desc: 'Google transalte',
		type: 'search',
	},
	async (message, match) => {
		if (!message.reply_message.text)
			return await message.send(
				'*Répondre à un msg\n*_Example : trt ml_\ntrt ml hi'
			)
		const [to, from] = match.split(' ')
		const msg = await trt(message.reply_message.text, to || config.LANG, from)
		if (msg) return await message.send(msg, { quoted: message.quoted })
	}
)
