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
          aria-label="Minimize"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8337 10.8333H4.16699V9.16663H15.8337V10.8333Z" fill="#1F1F1F"/>
          </svg>
        </button>
        {/* Maximize/Restore button */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Maximize"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 2.5C18.4165 2.50017 19.166 3.23383 19.166 4.15039V15.833C19.166 16.7496 18.4165 17.4998 17.5 17.5H2.5C1.58333 17.5 0.833008 16.7497 0.833008 15.833V4.15039C0.833008 3.23372 1.58333 2.5 2.5 2.5H17.5ZM2.5 4.1416V15.8496H17.5V4.1416H2.5ZM15.833 9.16699V14.167H9.16602V9.16699H15.833Z" fill="#1F1F1F"/>
          </svg>
        </button>
        {/* More options button */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="More options"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.99967 6.66671C10.9163 6.66671 11.6663 5.91671 11.6663 5.00004C11.6663 4.08337 10.9163 3.33337 9.99967 3.33337C9.08301 3.33337 8.33301 4.08337 8.33301 5.00004C8.33301 5.91671 9.08301 6.66671 9.99967 6.66671ZM9.99967 8.33337C9.08301 8.33337 8.33301 9.08337 8.33301 10C8.33301 10.9167 9.08301 11.6667 9.99967 11.6667C10.9163 11.6667 11.6663 10.9167 11.6663 10C11.6663 9.08337 10.9163 8.33337 9.99967 8.33337ZM8.33301 15C8.33301 14.0834 9.08301 13.3334 9.99967 13.3334C10.9163 13.3334 11.6663 14.0834 11.6663 15C11.6663 15.9167 10.9163 16.6667 9.99967 16.6667C9.08301 16.6667 8.33301 15.9167 8.33301 15Z" fill="#1F1F1F"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
