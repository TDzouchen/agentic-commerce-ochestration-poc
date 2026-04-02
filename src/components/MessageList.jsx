import { useEffect, useRef } from 'react'
import TextMessage from './messages/TextMessage'
import ProductCards from './messages/ProductCards'
import OrderSummary from './messages/OrderSummary'
import CompareProduct from './messages/CompareProduct'
import PaymentSuccess from './messages/PaymentSuccess'

const componentMap = {
  ProductCards,
  OrderSummary,
  CompareProduct,
  PaymentSuccess,
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        <img
          src="/images/ai-avatar.png"
          alt="AI"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>
      <div className="flex gap-1 px-4 py-3 bg-gray-100 rounded-2xl">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

export default function MessageList({ messages, isTyping, onBuyNow }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {messages.map((msg, index) => {
        const RichComponent = msg.component ? componentMap[msg.component] : null

        return (
          <div key={index}>
            {msg.text && <TextMessage message={msg} />}
            {RichComponent && <RichComponent onBuyNow={onBuyNow} />}
          </div>
        )
      })}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
