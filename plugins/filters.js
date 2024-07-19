const { getFilter, bot, setFilter, deleteFilter, lydia } = require('../lib/')
const fm = true

bot(
  {
    pattern: 'stop ?(.*)',
    fromMe: fm,
    desc: 'Delete filters in chat',
    type: 'group',
    onlyGroup: false,
  },
  async (message, match) => {
    if (!match) return await message.send(`*Example : .stop salut*`)
    const isDel = await deleteFilter(message.jid, match)
    if (!isDel) return await message.send(`_${match} n''a pas été trouvé dans les filtres_`)
    return await message.send(`_${match} supprimé._`)
  }
)

bot(
  {
    pattern: 'filter ?(.*)',
    fromMe: fm,
    desc: 'filter in groups',
    type: 'group',
    onlyGroup: false,
  },
  async (message, match) => {
    match = match.match(/[\'\"](.*?)[\'\"]/gms)
    if (!match) {
      const filters = await getFilter(message.jid)
      if (!filters) return await message.send(`_Ne définir aucun filtre_\n*Example filter 'salut' 'comment'*`)
      let msg = ''
      filters.map(({ pattern }) => {
        msg += `=> ${pattern} \n`
      })
      return await message.send(msg.trim())
    } else {
      if (match.length < 2) {
        return await message.send(`Example filter 'bonjour' 'salut'`)
      }
      const k = match[0].replace(/['"]+/g, '')
      const v = match[1].replace(/['"]+/g, '')
      if (k && v) await setFilter(message.jid, k, v, match[0][0] === "'" ? true : false)
      await message.send(`_${k}_ ajouté aux filtres.`)
    }
  }
)

bot({ on: 'text', fromMe: false, type: 'filterOrLydia' }, async (message, match) => {
  const filters = await getFilter(message.jid)
  if (filters)
    filters.map(async ({ pattern, regex, text }) => {
      pattern = new RegExp(`(?:^|\\W)${pattern}(?:$|\\W)`, 'i')
      if (pattern.test(message.text)) {
        await message.send(text, {
          quoted: message.data,
        })
      }
    })

  const isLydia = await lydia(message)
  if (isLydia) return await message.send(isLydia, { quoted: message.data })
})

bot({ on: 'text', fromMe: true, type: 'lydia' }, async (message, match) => {
  const isLydia = await lydia(message)
  if (isLydia) return await message.send(isLydia, { quoted: message.data })
})
