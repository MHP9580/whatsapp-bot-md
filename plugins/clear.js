const { bot } = require('../lib/')

bot(
	{
		pattern: 'clear ?(.*)',
		fromMe: true,
		desc: 'delete whatsapp chat',
		type: 'whatsapp',
	},
	async (message, match) => {
		await message.clearChat(message.jid)
		await message.send('Tout les messages de ce hat ont été supprimés')
	}
)
