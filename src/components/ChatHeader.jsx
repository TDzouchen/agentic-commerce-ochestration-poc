export default function ChatHeader({ onMinimize }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        {/* Autopilot logo */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="black"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M7.66602 15.2948C7.66602 12.4626 9.99787 10.1666 12.8743 10.1666H19.1243C22.0008 10.1666 24.3327 12.4626 24.3327 15.2948C24.3327 18.1271 22.0008 20.423 19.1243 20.423H18.3059L13.3952 23.5V20.423H12.8743C9.99787 20.423 7.66602 18.1271 7.66602 15.2948ZM13.5484 15.3853C13.5484 15.9184 13.1094 16.3506 12.568 16.3506C12.0265 16.3506 11.5876 15.9184 11.5876 15.3853C11.5876 14.8522 12.0265 14.42 12.568 14.42C13.1094 14.42 13.5484 14.8522 13.5484 15.3853ZM16.9797 15.3853C16.9797 15.9184 16.5408 16.3506 15.9993 16.3506C15.4579 16.3506 15.0189 15.9184 15.0189 15.3853C15.0189 14.8522 15.4579 14.42 15.9993 14.42C16.5408 14.42 16.9797 14.8522 16.9797 15.3853ZM19.4307 16.3506C19.9722 16.3506 20.4111 15.9184 20.4111 15.3853C20.4111 14.8522 19.9722 14.42 19.4307 14.42C18.8893 14.42 18.4503 14.8522 18.4503 15.3853C18.4503 15.9184 18.8893 16.3506 19.4307 16.3506Z" fill="white"/>
        </svg>
        <div>
          <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '142%' }}>Autopilot</div>
          <div className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 400, lineHeight: '20px' }}>Powered by Talkdesk</div>
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
