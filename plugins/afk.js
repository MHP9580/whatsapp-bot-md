const { bot } = require('../lib/')

global.AFK = {
	isAfk: false,
	reason: false,
	lastseen: 0,
}

bot(
	{
		pattern: 'afk ?(.*)',
		fromMe: true,
		desc: 'away from keyboard',
		type: 'misc',
	},
	async (message, match) => {
		if (!global.AFK.isAfk && !match)
			return await message.send(
				'Example : Mon propriétaire est AFK\n vu pour la dernière fois  #lastseen\nPour désactiver afk, envoyez à nouveau un message.'
			)
		if (!global.AFK.isAfk) {
			if (match) global.AFK.reason = match
			global.AFK.isAfk = true
			global.AFK.lastseen = Math.round(new Date().getTime() / 1000)
			return await message.send(
				match.replace(
					'#lastseen',
					Math.round(new Date().getTime() / 1000) - global.AFK.lastseen
				)
			)
		}
	}
)
