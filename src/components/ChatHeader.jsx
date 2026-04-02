export default function ChatHeader({ onMinimize }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        {/* Autopilot logo placeholder */}
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">A</span>
        </div>
        <div>
          <div className="text-base font-semibold text-gray-900">Autopilot</div>
          <div className="text-xs text-gray-400">Powered by Talkdesk</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Minimize button */}
        <button
          onClick={onMinimize}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="7" width="12" height="1.5" rx="0.75" fill="#6B7280" />
          </svg>
        </button>
        {/* More options button */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="3" r="1.5" fill="#6B7280" />
            <circle cx="8" cy="8" r="1.5" fill="#6B7280" />
            <circle cx="8" cy="13" r="1.5" fill="#6B7280" />
          </svg>
        </button>
      </div>
    </div>
  )
}
