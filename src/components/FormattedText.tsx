/**
 * FormattedText Component
 *
 * Renders AI responses with polished markdown formatting:
 * - Bold, italic, inline code, links
 * - Headers (H1, H2, H3) with distinct visual hierarchy
 * - Tables with refined styling
 * - Code blocks (``` fenced)
 * - Blockquotes (> syntax)
 * - Ordered and unordered lists (including nested/emoji)
 * - Horizontal rules
 * - Action prompts (auto-detected)
 */

interface FormattedTextProps {
  text: string
  className?: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function processInline(line: string): string {
  let result = escapeHtml(line)

  // Inline code (must come before bold/italic to avoid conflicts)
  result = result.replace(/`([^`]+)`/g, '<code class="bg-white/[0.12] px-1.5 py-0.5 rounded text-[13px] font-mono text-emerald-200">$1</code>')

  // Bold + italic
  result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold"><em>$1</em></strong>')

  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')

  // Italic
  result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic opacity-90">$1</em>')

  // Links [text](url)
  result = result.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-1 decoration-emerald-300/40 hover:decoration-emerald-300 transition-all">$1</a>'
  )

  // Internal links [text](/path)
  result = result.replace(
    /\[([^\]]+)\]\(\/([^)]+)\)/g,
    '<a href="/$2" class="underline underline-offset-2 decoration-1 decoration-emerald-300/40 hover:decoration-emerald-300 transition-all">$1</a>'
  )

  return result
}

type Block =
  | { type: 'paragraph'; content: string }
  | { type: 'header'; level: number; content: string }
  | { type: 'list-item'; content: string; indent: number }
  | { type: 'ordered-item'; content: string; number: string; indent: number }
  | { type: 'table'; rows: string[][] }
  | { type: 'code-block'; language: string; content: string }
  | { type: 'blockquote'; content: string }
  | { type: 'hr' }
  | { type: 'spacing' }
  | { type: 'action-prompt'; content: string }

function parseBlocks(text: string): Block[] {
  const lines = text.split('\n')
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // Empty line
    if (trimmed === '') {
      blocks.push({ type: 'spacing' })
      i++
      continue
    }

    // Code block (fenced)
    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      blocks.push({ type: 'code-block', language, content: codeLines.join('\n') })
      i++ // skip closing ```
      continue
    }

    // Horizontal rule
    if (/^[-*_]{3,}$/.test(trimmed)) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2))
        i++
      }
      blocks.push({ type: 'blockquote', content: quoteLines.join(' ') })
      continue
    }

    // Table detection: line contains | and next line is separator or current is separator
    if (trimmed.includes('|') && i + 1 < lines.length) {
      const nextTrimmed = lines[i + 1]?.trim() || ''
      if (nextTrimmed.match(/^\|?[\s-:|]+\|[\s-:|]+\|?$/)) {
        // This is a table header row, next is separator
        const tableRows: string[][] = []

        // Collect all table rows
        while (i < lines.length && lines[i].trim().includes('|')) {
          const row = lines[i].trim()
          // Skip separator rows
          if (row.match(/^\|?[\s-:|]+\|[\s-:|]+\|?$/)) {
            i++
            continue
          }
          const cells = row
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map(c => c.trim())
          tableRows.push(cells)
          i++
        }
        blocks.push({ type: 'table', rows: tableRows })
        continue
      }
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'header', level: 3, content: trimmed.slice(4) })
      i++
      continue
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'header', level: 2, content: trimmed.slice(3) })
      i++
      continue
    }
    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'header', level: 1, content: trimmed.slice(2) })
      i++
      continue
    }

    // Action prompts
    if (/^(Want me to:|Should I:|Would you like me to:|Or:|Any of these\?)/i.test(trimmed)) {
      blocks.push({ type: 'action-prompt', content: trimmed })
      i++
      continue
    }

    // Ordered list items (1. 2. etc)
    const orderedMatch = trimmed.match(/^(\d+)[.)]\s+(.+)/)
    if (orderedMatch) {
      const indent = line.length - line.trimStart().length
      blocks.push({ type: 'ordered-item', number: orderedMatch[1], content: orderedMatch[2], indent })
      i++
      continue
    }

    // Unordered list items (-, *, bullet, emoji prefixed)
    const listMatch = /^[\s]*([-*•]|✅|❌|📄|📧|📅|🔗|⚠️|🎯|📊|📈|📁|🔄|🚀|✨|🔴|💡|➡️|🛡️|⭐|🔧|💰|📌|🏷️|🔍|📝|🤖|💬|📋|🆕|➕)\s/.test(line)
    if (listMatch) {
      const indent = line.length - line.trimStart().length
      const content = trimmed.replace(/^[-*•]\s+/, '').replace(/^(✅|❌|📄|📧|📅|🔗|⚠️|🎯|📊|📈|📁|🔄|🚀|✨|🔴|💡|➡️|🛡️|⭐|🔧|💰|📌|🏷️|🔍|📝|🤖|💬|📋|🆕|➕)\s+/, (match) => match)
      blocks.push({ type: 'list-item', content: trimmed, indent })
      i++
      continue
    }

    // Regular paragraph
    blocks.push({ type: 'paragraph', content: trimmed })
    i++
  }

  return blocks
}

export default function FormattedText({ text, className = '' }: FormattedTextProps) {
  const blocks = parseBlocks(text)

  return (
    <div className={`formatted-text ${className}`}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'spacing':
            return <div key={index} className="h-2.5" />

          case 'hr':
            return <hr key={index} className="border-white/[0.12] my-4" />

          case 'header': {
            const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3'
            const styles = {
              1: 'text-[17px] font-bold mt-4 mb-2 tracking-tight',
              2: 'text-[15px] font-bold mt-3.5 mb-1.5 tracking-tight',
              3: 'text-sm font-semibold mt-3 mb-1 uppercase tracking-wide opacity-90',
            }
            return (
              <Tag
                key={index}
                className={styles[block.level as 1 | 2 | 3]}
                dangerouslySetInnerHTML={{ __html: processInline(block.content) }}
              />
            )
          }

          case 'blockquote':
            return (
              <div
                key={index}
                className="border-l-2 border-emerald-300/40 pl-3.5 my-2.5 opacity-85 italic"
                dangerouslySetInnerHTML={{ __html: processInline(block.content) }}
              />
            )

          case 'action-prompt':
            return (
              <div
                key={index}
                className="mt-3 mb-1 font-semibold opacity-95"
                dangerouslySetInnerHTML={{ __html: processInline(block.content) }}
              />
            )

          case 'list-item':
            return (
              <div
                key={index}
                className="mb-1 leading-relaxed"
                style={{ paddingLeft: `${Math.max(block.indent * 4, 8)}px` }}
                dangerouslySetInnerHTML={{ __html: processInline(block.content) }}
              />
            )

          case 'ordered-item':
            return (
              <div
                key={index}
                className="mb-1 leading-relaxed"
                style={{ paddingLeft: `${Math.max(block.indent * 4, 8)}px` }}
                dangerouslySetInnerHTML={{ __html: processInline(`${block.number}. ${block.content}`) }}
              />
            )

          case 'table': {
            if (block.rows.length === 0) return null
            const [headerRow, ...bodyRows] = block.rows
            return (
              <div key={index} className="my-3.5 overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.06]">
                      {headerRow.map((cell, ci) => (
                        <th
                          key={ci}
                          className="px-3.5 py-2.5 text-left font-semibold border-b border-white/[0.1] whitespace-nowrap text-[13px] uppercase tracking-wider opacity-80"
                          dangerouslySetInnerHTML={{ __html: processInline(cell) }}
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((row, ri) => (
                      <tr key={ri} className={`transition-colors ${ri % 2 === 1 ? 'bg-white/[0.02]' : ''}`}>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-3.5 py-2 border-b border-white/[0.04] text-[13.5px]"
                            dangerouslySetInnerHTML={{ __html: processInline(cell) }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }

          case 'code-block':
            return (
              <div key={index} className="my-3.5 rounded-xl overflow-hidden border border-white/[0.08]">
                {block.language && (
                  <div className="px-3.5 py-1.5 bg-white/[0.06] text-[11px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                    {block.language}
                  </div>
                )}
                <pre className="px-3.5 py-3 bg-black/25 overflow-x-auto text-[13px] leading-relaxed">
                  <code className="font-mono text-emerald-200/85">{block.content}</code>
                </pre>
              </div>
            )

          case 'paragraph':
            return (
              <div
                key={index}
                className="mb-1.5 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: processInline(block.content) }}
              />
            )

          default:
            return null
        }
      })}
    </div>
  )
}
