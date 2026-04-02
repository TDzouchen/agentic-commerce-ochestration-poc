import ChatHeader from './ChatHeader'
import { config } from '../data/config'

export default function ChatWidget({ isOpen, onMinimize, children }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-400 ease-out"
      style={{
        paddingTop: config.widgetOffsetTop,
        paddingBottom: config.widgetOffsetBottom,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(40px)',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div
        className="widget-border widget-bg flex flex-col"
        style={{
          width: `${config.widgetWidth}px`,
          height: `${config.widgetHeight}px`,
          maxHeight: `calc(100vh - ${config.widgetOffsetTop} - ${config.widgetOffsetBottom})`,
          boxShadow: '0px 4px 8px -2px #00000014, 0px 8px 16px 0px #0000001A',
        }}
      >
        <ChatHeader onMinimize={onMinimize} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
