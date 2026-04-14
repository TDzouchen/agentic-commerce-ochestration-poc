import { useState, useCallback } from 'react'
import ChatBubble from './components/ChatBubble'
import ChatWidget from './components/ChatWidget'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
import { useConversation } from "./hooks/useConversation";
import bgMain from './assets/images/1-bg.png'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isTyping, currentStage, sendMessage, handleBuyNow, handleCheckout } = useConversation()

  const handleBubbleSend = useCallback((text) => {
    setIsOpen(true)
    // Small delay so widget opens before message is sent
    setTimeout(() => sendMessage(text), 100)
  }, [sendMessage])

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background image - unified for both minimized and maximized states */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `url(${bgMain}) lightgray top center / cover no-repeat`,
        }}
      />

      {/* Chat bubble */}
      {!isOpen && <ChatBubble onOpen={() => setIsOpen(true)} onSend={handleBubbleSend} />}

      {/* Chat widget - always mounted for animation */}
      <ChatWidget isOpen={isOpen} onMinimize={() => setIsOpen(false)}>
        <MessageList
          messages={messages}
          isTyping={isTyping}
          onBuyNow={handleBuyNow}
          onCheckout={handleCheckout}
        />
        <MessageInput
          onSend={sendMessage}
          disabled={isTyping || currentStage === "PAYMENT"}
        />
      </ChatWidget>
    </div>
  );
}

export default App
