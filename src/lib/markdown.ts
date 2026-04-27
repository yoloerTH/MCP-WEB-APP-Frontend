function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderInlineFormatting(text: string): string {
  text = text.replace(/`([^`]+)`/g, '<code class="bg-white/10 text-emerald-300 px-1.5 py-0.5 rounded text-base font-mono">$1</code>')
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-emerald-300 font-semibold">$1</strong>')
  text = text.replace(/\*([^*]+)\*/g, '<em class="text-emerald-200">$1</em>')
  text = text.replace(/\s--\s/g, ', ')
  return text
}

function renderInline(text: string): string {
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, linkText, url) => {
    const isExternal = url.startsWith('http')
    const extras = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${escapeHtml(url)}"${extras} class="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">${renderInlineFormatting(linkText)}</a>`
  })
  return renderInlineFormatting(text)
}

export interface MarkdownContext {
  title: string
  description: string
}

export function markdownToHtml(content: string, ctx: MarkdownContext): string {
  const lines = content.split('\n')
  const parts: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('# ') && !line.startsWith('## ') && !line.startsWith('### ')) {
      const text = line.replace(/^#\s+/, '')
      parts.push(`<h1 class="font-display text-5xl lg:text-6xl text-white mb-8 leading-tight">${renderInline(text)}</h1>`)
      i++
    } else if (line.startsWith('### ')) {
      const text = line.replace(/^###\s+/, '')
      parts.push(`<h3 class="font-display text-2xl lg:text-3xl text-white mb-4 mt-12 leading-tight">${renderInline(text)}</h3>`)
      i++
    } else if (line.startsWith('## ')) {
      const text = line.replace(/^##\s+/, '')
      const id = text.toLowerCase().replace(/[^\w\sͰ-Ͽἀ-῿]/g, '').replace(/\s+/g, '-')
      parts.push(`<h2 id="${escapeHtml(id)}" class="font-display text-3xl lg:text-4xl text-white mb-6 mt-16 leading-tight scroll-mt-32"><span class="inline-block mr-4 text-emerald-400">//</span>${renderInline(text)}</h2>`)
      i++
    } else if (line.trim() === '---') {
      parts.push('<hr class="border-white/10 my-12" />')
      i++
    } else if (line.trim().startsWith('|')) {
      const tableRows: string[][] = []
      let hasHeader = false
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const row = lines[i].trim()
        if (row.match(/^\|[\s\-:|]+\|$/)) {
          hasHeader = true
          i++
          continue
        }
        const cells = row.split('|').filter((_: string, idx: number, arr: string[]) => idx > 0 && idx < arr.length - 1).map((c: string) => c.trim())
        tableRows.push(cells)
        i++
      }
      if (tableRows.length > 0) {
        const headerRow = hasHeader ? tableRows[0] : null
        const bodyRows = hasHeader ? tableRows.slice(1) : tableRows
        let tableHtml = '<div class="overflow-x-auto mb-8 rounded-xl border border-white/10"><table class="w-full text-left">'
        if (headerRow) {
          tableHtml += '<thead><tr class="bg-white/5 border-b border-white/10">'
          for (const cell of headerRow) {
            tableHtml += `<th class="px-5 py-3 text-sm font-semibold text-emerald-300 uppercase tracking-wider">${renderInline(cell)}</th>`
          }
          tableHtml += '</tr></thead>'
        }
        tableHtml += '<tbody>'
        bodyRows.forEach((row, ri) => {
          const bgClass = ri % 2 === 0 ? ' bg-white/[0.02]' : ''
          tableHtml += `<tr class="border-b border-white/5${bgClass}">`
          for (const cell of row) {
            tableHtml += `<td class="px-5 py-3 text-gray-300 text-base">${renderInline(cell)}</td>`
          }
          tableHtml += '</tr>'
        })
        tableHtml += '</tbody></table></div>'
        parts.push(tableHtml)
      }
    } else if (line.trim().startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''))
        i++
      }
      const quoteParagraphs = quoteLines
        .map(ql => `<p class="text-lg text-emerald-200/80 italic leading-relaxed">${renderInline(ql)}</p>`)
        .join('')
      parts.push(`<blockquote class="border-l-4 border-emerald-500/50 pl-6 py-3 my-6 bg-emerald-500/5 rounded-r-lg">${quoteParagraphs}</blockquote>`)
    } else if (line.trim().startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().replace(/^-\s+/, ''))
        i++
      }
      const listItems = items
        .map(item => `<li class="flex items-start gap-3 text-lg text-gray-300 leading-relaxed"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span><span>${renderInline(item)}</span></li>`)
        .join('')
      parts.push(`<ul class="space-y-3 mb-6 ml-2">${listItems}</ul>`)
    } else if (line.trim().match(/^\d+\.\s/)) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''))
        i++
      }
      const listItems = items
        .map((item, ii) => `<li class="flex items-start gap-3 text-lg text-gray-300 leading-relaxed"><span class="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-sm flex items-center justify-center flex-shrink-0 font-semibold">${ii + 1}</span><span>${renderInline(item)}</span></li>`)
        .join('')
      parts.push(`<ol class="space-y-3 mb-6 ml-2">${listItems}</ol>`)
    } else if (line.trim().match(/^\{\{youtube:([^}]+)\}\}$/)) {
      const videoId = line.trim().match(/^\{\{youtube:([^}]+)\}\}$/)?.[1] || ''
      const safeId = escapeHtml(videoId)
      const safeTitle = escapeHtml(ctx.title)
      const safeDesc = escapeHtml(ctx.description)
      parts.push(`<figure class="my-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/5"><div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="https://www.youtube.com/embed/${safeId}" title="${safeTitle}" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><figcaption class="sr-only">${safeTitle} — ${safeDesc} <a href="https://www.youtube.com/watch?v=${safeId}" rel="noopener">Watch on YouTube</a></figcaption></figure>`)
      i++
    } else if (line.trim() && !line.startsWith('#')) {
      parts.push(`<p class="text-lg text-gray-300 leading-relaxed mb-6">${renderInline(line)}</p>`)
      i++
    } else {
      if (parts.length > 0) {
        parts.push('<div class="h-2"></div>')
      }
      i++
    }
  }
  return parts.join('\n')
}

export function extractH2Headings(content: string): { text: string; id: string }[] {
  return content
    .split('\n')
    .filter((line: string) => line.startsWith('## '))
    .map((heading: string) => {
      const text = heading.replace(/^##\s+/, '')
      const id = text.toLowerCase().replace(/[^\w\sͰ-Ͽἀ-῿]/g, '').replace(/\s+/g, '-')
      return { text, id }
    })
}
