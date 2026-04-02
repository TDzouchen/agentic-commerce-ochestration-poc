import { useState } from 'react'
import ChatBubble from './components/ChatBubble'
import ChatWidget from './components/ChatWidget'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
import { useConversation } from './hooks/useConversation'
import { config } from './data/config'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isTyping, currentStage, sendMessage, handleBuyNow } = useConversation()

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background slot */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : 'none',
          backgroundColor: '#1a1a1a',
        }}
      />

      {/* Chat bubble */}
      {!isOpen && <ChatBubble onOpen={() => setIsOpen(true)} />}

      {/* Chat widget */}
      {isOpen && (
        <ChatWidget onMinimize={() => setIsOpen(false)}>
          <MessageList
            messages={messages}
            isTyping={isTyping}
            onBuyNow={handleBuyNow}
          />
          <MessageInput
            onSend={sendMessage}
            disabled={isTyping || currentStage === 'PAYMENT'}
          />
        </ChatWidget>
      )}
    </div>
  )
}

export default App
