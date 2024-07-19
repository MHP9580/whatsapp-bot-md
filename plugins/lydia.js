const { setLydia, bot } = require('../lib/')

bot(
	{
		pattern: 'lydia ?(.*)',
		fromMe: true,
		desc: 'to on off chat bot',
		type: 'misc',
	},
	async (message, match) => {
		if (!match)
			return await message.send(
				'*Example : lydia on/off*\n_Répondez ou mentionnez pour activer pour une personne uniquement._'
			)
		const user = message.mention[0] || message.reply_message.jid
		await setLydia(message.jid, match == 'on', user)
		await message.send(
			`_Lydia ${
				match == 'on' ? 'Activated' : 'Deactivated'
			}_\n*Fonctionne uniquement à partir du message de réponse.`
		)
	}
)
