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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        <circle cx="12" cy="12" r="12" fill="#BAE0FF"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.49967 7.33325C7.19849 7.33325 5.33301 9.17003 5.33301 11.4358C5.33301 13.7016 7.19849 15.5384 9.49967 15.5384H9.91634V17.9999L13.8449 15.5384H14.4997C16.8009 15.5384 18.6663 13.7016 18.6663 11.4358C18.6663 9.17003 16.8009 7.33325 14.4997 7.33325H9.49967ZM9.08577 10.7091C9.58547 11.939 10.7379 12.7336 12.0208 12.7336C13.2643 12.7336 14.4015 11.973 14.9191 10.7959L13.9397 10.3293C13.5973 11.1085 12.844 11.6121 12.0208 11.6121C11.1714 11.6121 10.4087 11.0861 10.0778 10.2721L9.08577 10.7091Z" fill="#00474F"/>
      </svg>
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
