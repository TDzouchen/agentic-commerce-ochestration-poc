function parseInlineMarkdown(text) {
  const parts = []
  // Match **bold**, *italic*, and `code`
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    if (match[2]) {
      parts.push(<strong key={match.index} className="font-semibold">{match[2]}</strong>)
    } else if (match[3]) {
      parts.push(<em key={match.index}>{match[3]}</em>)
    } else if (match[4]) {
      parts.push(<code key={match.index} className="bg-gray-100 px-1 rounded text-xs">{match[4]}</code>)
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

export default function TextMessage({ message }) {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-gray-800 text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-md">
          <p className="text-sm">{parseInlineMarkdown(message.text)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start mb-4">
      <div className="flex items-center gap-2 mb-2">
        {/* AI avatar */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <circle cx="12" cy="12" r="12" fill="#BAE0FF"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M9.49967 7.33325C7.19849 7.33325 5.33301 9.17003 5.33301 11.4358C5.33301 13.7016 7.19849 15.5384 9.49967 15.5384H9.91634V17.9999L13.8449 15.5384H14.4997C16.8009 15.5384 18.6663 13.7016 18.6663 11.4358C18.6663 9.17003 16.8009 7.33325 14.4997 7.33325H9.49967ZM9.08577 10.7091C9.58547 11.939 10.7379 12.7336 12.0208 12.7336C13.2643 12.7336 14.4015 11.973 14.9191 10.7959L13.9397 10.3293C13.5973 11.1085 12.844 11.6121 12.0208 11.6121C11.1714 11.6121 10.4087 11.0861 10.0778 10.2721L9.08577 10.7091Z" fill="#00474F"/>
        </svg>
        <span className="gradient-text text-sm font-semibold">AI Assistant</span>
      </div>
      <div className="max-w-lg pl-8">
        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          {parseInlineMarkdown(message.text)}
        </p>
      </div>
      {/* Action icons: copy, like, dislike */}
      <div className="flex items-center gap-3 mt-2 pl-8">
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="4" y="1" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2" y="3" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 6V2.5C4 1.67 4.67 1 5.5 1S7 1.67 7 2.5V6h3.5a1 1 0 011 1v.34l-1.5 5A1 1 0 019.04 13H4V6z" stroke="currentColor" strokeWidth="1.2" />
            <rect x="1" y="6" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10 8V11.5c0 .83-.67 1.5-1.5 1.5S7 12.33 7 11.5V8H3.5a1 1 0 01-1-1v-.34l1.5-5A1 1 0 014.96 1H10v7z" stroke="currentColor" strokeWidth="1.2" />
            <rect x="10" y="1" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>
    </div>
  )
}
