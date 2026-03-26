/**
 * FormattedText Component
 *
 * Renders AI responses with proper markdown formatting:
 * - Bold, italic, inline code, links
 * - Headers (##, ###)
 * - Tables with proper alignment
 * - Code blocks (``` fenced)
 * - Ordered and unordered lists (including nested/emoji)
 * - Horizontal rules
 * - Line breaks and spacing
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
  result = result.replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-[13px] font-mono">$1</code>')

  // Bold + italic
  result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold"><em>$1</em></strong>')

  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')

  // Italic
  result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic">$1</em>')

  // Links [text](url)
  result = result.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-1 hover:opacity-80 transition-opacity">$1</a>'
  )

  // Internal links [text](/path)
  result = result.replace(
    /\[([^\]]+)\]\(\/([^)]+)\)/g,
    '<a href="/$2" class="underline underline-offset-2 decoration-1 hover:opacity-80 transition-opacity">$1</a>'
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
            return <div key={index} className="h-2" />

          case 'hr':
            return <hr key={index} className="border-white/20 my-3" />

          case 'header':
            return (
              <div
                key={index}
                className={`font-bold mt-3 mb-1.5 ${
                  block.level === 1 ? 'text-base' :
                  block.level === 2 ? 'text-[15px]' : 'text-sm'
                }`}
                dangerouslySetInnerHTML={{ __html: processInline(block.content) }}
              />
            )

          case 'action-prompt':
            return (
              <div
                key={index}
                className="mt-2 mb-1 text-emerald-100 font-medium"
                dangerouslySetInnerHTML={{ __html: processInline(block.content) }}
              />
            )

          case 'list-item':
            return (
              <div
                key={index}
                className="mb-0.5"
                style={{ paddingLeft: `${Math.max(block.indent * 4, 8)}px` }}
                dangerouslySetInnerHTML={{ __html: processInline(block.content) }}
              />
            )

          case 'ordered-item':
            return (
              <div
                key={index}
                className="mb-0.5"
                style={{ paddingLeft: `${Math.max(block.indent * 4, 8)}px` }}
                dangerouslySetInnerHTML={{ __html: processInline(`${block.number}. ${block.content}`) }}
              />
            )

          case 'table':
            if (block.rows.length === 0) return null
            const [headerRow, ...bodyRows] = block.rows
            return (
              <div key={index} className="my-3 overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.08]">
                      {headerRow.map((cell, ci) => (
                        <th
                          key={ci}
                          className="px-3 py-2 text-left font-bold border-b border-white/10 whitespace-nowrap"
                          dangerouslySetInnerHTML={{ __html: processInline(cell) }}
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 1 ? 'bg-white/[0.03]' : ''}>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-3 py-1.5 border-b border-white/[0.06]"
                            dangerouslySetInnerHTML={{ __html: processInline(cell) }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'code-block':
            return (
              <div key={index} className="my-3 rounded-lg overflow-hidden border border-white/10">
                {block.language && (
                  <div className="px-3 py-1 bg-white/[0.08] text-[11px] font-mono text-white/50 uppercase tracking-wider">
                    {block.language}
                  </div>
                )}
                <pre className="px-3 py-2.5 bg-black/30 overflow-x-auto text-[13px] leading-relaxed">
                  <code className="font-mono text-emerald-200/90">{block.content}</code>
                </pre>
              </div>
            )

          case 'paragraph':
            return (
              <div
                key={index}
                className="mb-1"
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
