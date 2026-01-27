/**
 * FormattedText Component
 *
 * Renders AI responses with proper formatting:
 * - Preserves line breaks and spacing
 * - Renders markdown-like syntax (bold, lists, emojis)
 * - Adds visual spacing between sections
 * - Prevents wall-of-text appearance
 */

interface FormattedTextProps {
  text: string
  className?: string
}

export default function FormattedText({ text, className = '' }: FormattedTextProps) {
  // Split text into lines for processing
  const lines = text.split('\n')

  return (
    <div className={`formatted-text ${className}`}>
      {lines.map((line, index) => {
        // Empty line = vertical spacing
        if (line.trim() === '') {
          return <div key={index} className="h-2" />
        }

        // Detect headers (lines starting with ## or **)
        const isHeader = line.trim().startsWith('##') ||
                        (line.trim().startsWith('**') && line.trim().endsWith('**'))

        // Detect list items (-, •, ✅, ❌, etc.)
        const isListItem = /^[\s]*[-•✅❌📄📧📅🔗⚠️🎯]\s/.test(line)

        // Detect special sections (Want me to:, Should I:, etc.)
        const isActionPrompt = /^(Want me to:|Should I:|Would you like me to:|Or:|Any of these\?)/i.test(line.trim())

        // Process inline markdown: **bold**
        const processedLine = line.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')

        return (
          <div
            key={index}
            className={`
              ${isHeader ? 'font-bold text-base mt-3 mb-1' : ''}
              ${isListItem ? 'ml-2 mb-1' : ''}
              ${isActionPrompt ? 'mt-2 mb-1 text-emerald-100 font-medium' : ''}
              ${!isHeader && !isListItem && !isActionPrompt ? 'mb-1' : ''}
            `}
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        )
      })}
    </div>
  )
}
