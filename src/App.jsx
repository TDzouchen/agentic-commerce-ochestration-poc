import { useState } from 'react'
import ChatBubble from './components/ChatBubble'
import ChatWidget from './components/ChatWidget'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
import { useConversation } from "./hooks/useConversation";

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isTyping, currentStage, sendMessage, handleBuyNow } = useConversation()

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background images - both preloaded, toggled via opacity */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "url(/images/1-bg.png) lightgray top center / cover no-repeat",
          opacity: isOpen ? 0 : 1,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{
          background:
            "url(/images/other-bg.png) lightgray top center / cover no-repeat",
          opacity: isOpen ? 1 : 0,
        }}
      />

      {/* Chat bubble */}
      {!isOpen && <ChatBubble onOpen={() => setIsOpen(true)} />}

      {/* Chat widget - always mounted for animation */}
      <ChatWidget isOpen={isOpen} onMinimize={() => setIsOpen(false)}>
        <MessageList
          messages={messages}
          isTyping={isTyping}
          onBuyNow={handleBuyNow}
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
