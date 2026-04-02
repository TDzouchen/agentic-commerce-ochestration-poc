# Chat Widget JS-SDK POC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a front-end POC chat widget that reproduces the Figma design — a 6-stage AI conversational shopping experience with product cards, order summary, comparison, and payment confirmation.

**Architecture:** Single Page App (React + Vite). Host page with configurable background slot. Chat widget opens from a bottom-right bubble into a centered 1000x977px modal. Conversation driven by a 6-stage state machine with keyword matching. All data mocked in `src/data/`.

**Tech Stack:** React 18, JavaScript, Tailwind CSS v3, Vite 6

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/App.jsx` | Host page: background slot + ChatBubble + ChatWidget toggle |
| `src/index.css` | Tailwind directives + custom CSS (gradient border, gradient text) |
| `src/main.jsx` | React entry point |
| `src/data/config.js` | Global config: widget size, typing delay, background image path |
| `src/data/products.js` | Product catalog (3 items) |
| `src/data/user.js` | User profile + order template |
| `src/data/conversation.js` | Per-stage keyword maps, AI reply text, fallback text |
| `src/hooks/useConversation.js` | 6-stage state machine, message history, keyword matching |
| `src/components/ChatBubble.jsx` | Bottom-right floating mini dialog |
| `src/components/ChatWidget.jsx` | Centered modal container with gradient border + layered background |
| `src/components/ChatHeader.jsx` | Top bar: logo, title, subtitle, minimize/more buttons |
| `src/components/MessageList.jsx` | Scrollable message area, auto-scroll on new messages |
| `src/components/MessageInput.jsx` | Text input + send button |
| `src/components/messages/TextMessage.jsx` | AI text (gradient label, avatar, actions) and user text (dark bubble) |
| `src/components/messages/ProductCards.jsx` | 3-column product card grid with Buy now buttons |
| `src/components/messages/OrderSummary.jsx` | Order detail card: product, price breakdown, shipping, Checkout button |
| `src/components/messages/CompareProduct.jsx` | 2-column product comparison with AI recommended badge |
| `src/components/messages/PaymentSuccess.jsx` | Payment confirmation receipt with order summary |
| `public/images/` | Placeholder product images (to be replaced) |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Initialize Vite + React project**

```bash
cd /Users/chenzou/Desktop/Talkdesk/agentic-commerce-ochestration-poc
npm create vite@latest . -- --template react
```

If prompted about existing files, choose to overwrite/ignore as needed. The `design/` and `docs/` folders should remain untouched.

- [ ] **Step 2: Install Tailwind CSS**

```bash
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Vite with Tailwind plugin**

`vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

- [ ] **Step 4: Set up CSS entry point**

`src/index.css`:
```css
@import "tailwindcss";
```

- [ ] **Step 5: Create minimal App.jsx**

`src/App.jsx`:
```jsx
function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background slot — replace backgroundImage in config */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundColor: '#1a1a1a' }}
      />
      {/* Chat widget will mount here */}
    </div>
  )
}

export default App
```

- [ ] **Step 6: Verify dev server runs**

```bash
npm run dev
```

Expected: Browser opens, shows dark background page. No errors in console.

- [ ] **Step 7: Create placeholder images directory**

```bash
mkdir -p public/images
```

Create 3 simple SVG placeholder files for products:

`public/images/zenith-pro.png` — use a 300x200 placeholder (can be any image or empty file, will be replaced)
`public/images/ru-max-350.png` — same
`public/images/airsc-speedcross.png` — same

For now, create simple placeholder text files that will be replaced with real images:

```bash
echo "placeholder" > public/images/.gitkeep
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + Tailwind project"
```

---

### Task 2: Mock Data Layer

**Files:**
- Create: `src/data/config.js`, `src/data/products.js`, `src/data/user.js`, `src/data/conversation.js`

- [ ] **Step 1: Create config.js**

`src/data/config.js`:
```js
export const config = {
  typingDelay: 1500,
  widgetWidth: 1000,
  widgetHeight: 977,
  backgroundImage: '',
}
```

- [ ] **Step 2: Create products.js**

`src/data/products.js`:
```js
export const products = [
  {
    id: 1,
    name: 'Zenith Pro',
    category: 'Performance Running Shoes',
    price: 135,
    image: '/images/zenith-pro.png',
    inStock: true,
    material: 'Premium leather',
    weight: '310g',
    bestFor: 'Gym & streetwear',
    agentAdvice: 'Fits small, order 0.5 size up',
  },
  {
    id: 2,
    name: 'RU MAX 350',
    category: 'Performance Running Shoes',
    price: 128,
    image: '/images/ru-max-350.png',
    inStock: true,
    material: 'Engineered mesh',
    weight: '730g',
    bestFor: 'Work & outdoor',
    agentAdvice: 'True to size, excellent durability',
  },
  {
    id: 3,
    name: 'AIRSC SPEEDCROSSS',
    category: 'Performance Running Shoes',
    price: 150,
    image: '/images/airsc-speedcross.png',
    inStock: true,
    material: null,
    weight: null,
    bestFor: null,
    agentAdvice: null,
  },
]
```

- [ ] **Step 3: Create user.js**

`src/data/user.js`:
```js
export const user = {
  name: 'ALEX M.',
  address: '2118 Thornridge Cir, Syracuse, Connecticut 35624',
  phone: '(209) 555-0104',
  memberTier: 'Gold',
  discount: 0.15,
}

export const order = {
  id: '#127896394',
  productId: 1,
  size: 'US Mens: 10',
  quantity: 1,
  subtotal: 135,
  tax: 5,
  shipping: 0,
  memberDiscount: -18,
  total: 122,
  estimatedDelivery: 'Wed, Apr 8',
}
```

- [ ] **Step 4: Create conversation.js**

`src/data/conversation.js`:
```js
export const stages = {
  GREETING: {
    keywords: ['running', 'shoe', 'runner', 'long-distance', 'sneaker', 'trainer'],
    aiReply:
      "Hi Alex, this is our fastest running shoe.\nHowever, based on your profile, you usually prefer max cushioning. This model is built for speed and performance, so it feels firmer than a typical daily trainer.\nWould you like to see how compares with our **most cushioned option**, the Zenith or view it?",
    component: 'ProductCards',
    fallback:
      "I'd be happy to help you find the perfect shoes! Are you looking for running shoes, casual wear, or something else?",
  },
  RECOMMEND: {
    keywords: ['go with', 'buy', 'zenith', 'select', 'choose', 'order', 'want'],
    aiReply: '',
    component: 'OrderSummary',
    fallback:
      "Great options, right? You can click 'Buy now' on any product, or tell me which one you'd like to go with!",
  },
  CHECKOUT: {
    keywords: ['compare', 'difference', 'vs', 'how do these', 'diff', 'versus'],
    aiReply: '',
    component: 'CompareProduct',
    fallback:
      "Ready to checkout? Or would you like to compare this with another product first?",
  },
  COMPARE: {
    keywords: [],
    aiReply: '',
    component: 'OrderSummary',
    fallback:
      "Take your time comparing! Click 'Buy now' when you've decided, or ask me anything about these products.",
  },
  ORDER: {
    keywords: ['paid', 'pay', 'already paid', 'payment', 'done', 'completed'],
    aiReply: '',
    component: 'PaymentSuccess',
    fallback:
      "Whenever you're ready, just let me know once you've completed the payment!",
  },
  PAYMENT: {
    keywords: [],
    aiReply: '',
    component: null,
    fallback:
      "Your order is confirmed! Is there anything else I can help you with?",
  },
}

export const greetingMessage = {
  type: 'ai',
  text: '👋 Hi Alex — how can I help today?',
  component: null,
}
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add mock data layer (products, user, conversation scripts, config)"
```

---

### Task 3: Conversation State Machine Hook

**Files:**
- Create: `src/hooks/useConversation.js`

- [ ] **Step 1: Implement useConversation hook**

`src/hooks/useConversation.js`:
```js
import { useState, useCallback } from 'react'
import { stages, greetingMessage } from '../data/conversation'
import { config } from '../data/config'

const STAGE_ORDER = ['GREETING', 'RECOMMEND', 'CHECKOUT', 'COMPARE', 'ORDER', 'PAYMENT']

function matchKeywords(text, keywords) {
  const lower = text.toLowerCase()
  return keywords.some((kw) => lower.includes(kw.toLowerCase()))
}

export function useConversation() {
  const [stageIndex, setStageIndex] = useState(0)
  const [messages, setMessages] = useState([greetingMessage])
  const [isTyping, setIsTyping] = useState(false)

  const currentStage = STAGE_ORDER[stageIndex]

  const addAiResponse = useCallback(
    (nextStageIndex) => {
      setIsTyping(true)
      const nextStage = STAGE_ORDER[nextStageIndex]
      const stageData = stages[STAGE_ORDER[nextStageIndex - 1]] ?? stages[nextStage]

      setTimeout(() => {
        const aiMsg = {
          type: 'ai',
          text: stageData.aiReply || '',
          component: stageData.component,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
        }
        setMessages((prev) => [...prev, aiMsg])
        setIsTyping(false)
      }, config.typingDelay)
    },
    []
  )

  const sendMessage = useCallback(
    (text) => {
      if (isTyping) return
      if (currentStage === 'PAYMENT') return

      const userMsg = { type: 'user', text }
      setMessages((prev) => [...prev, userMsg])

      const stageData = stages[currentStage]
      if (matchKeywords(text, stageData.keywords)) {
        const nextIndex = stageIndex + 1
        setStageIndex(nextIndex)
        addAiResponse(nextIndex)
      } else {
        setIsTyping(true)
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { type: 'ai', text: stageData.fallback, component: null },
          ])
          setIsTyping(false)
        }, config.typingDelay)
      }
    },
    [currentStage, stageIndex, isTyping, addAiResponse]
  )

  const handleBuyNow = useCallback(
    (product) => {
      if (isTyping) return

      if (currentStage === 'RECOMMEND') {
        const userMsg = { type: 'user', text: `Let's go with the ${product.name}.` }
        setMessages((prev) => [...prev, userMsg])
        const nextIndex = stageIndex + 1
        setStageIndex(nextIndex)
        addAiResponse(nextIndex)
      } else if (currentStage === 'COMPARE') {
        const userMsg = { type: 'user', text: `I'd like to order the ${product.name}.` }
        setMessages((prev) => [...prev, userMsg])
        const nextIndex = stageIndex + 1
        setStageIndex(nextIndex)
        addAiResponse(nextIndex)
      }
    },
    [currentStage, stageIndex, isTyping, addAiResponse]
  )

  return {
    messages,
    isTyping,
    currentStage,
    sendMessage,
    handleBuyNow,
  }
}
```

- [ ] **Step 2: Verify no import errors**

```bash
npm run dev
```

Expected: No errors. The hook is not yet used in the UI but should have no syntax issues.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useConversation state machine hook with 6-stage flow"
```

---

### Task 4: ChatWidget Container + ChatHeader

**Files:**
- Create: `src/components/ChatWidget.jsx`, `src/components/ChatHeader.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Add custom CSS for gradient border and gradient text**

Append to `src/index.css`:
```css
@import "tailwindcss";

.widget-border {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.widget-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 4px;
  border-radius: 20px;
  background: linear-gradient(226.31deg, #0FB0EA 0.56%, #F4FFDF 100%);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 10;
}

.widget-bg {
  background:
    linear-gradient(170.07deg, #F8F8F8 0%, #F8F8F8 50.14%, rgba(248,248,248,0.95) 65%, rgba(248,248,248,0.9) 85%, rgba(248,248,248,0.85) 90%, rgba(248,248,248,0.8) 95%, rgba(248,248,248,0.8) 100%),
    linear-gradient(279.67deg, #0088FF 1.6%, #6FB0B9 28.41%, #35903C 61.37%, #079010 99.05%);
}

.gradient-text {
  background: linear-gradient(90deg, #00474F 0%, #BAE0FF 127.54%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 2: Create ChatHeader.jsx**

`src/components/ChatHeader.jsx`:
```jsx
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
            <rect x="2" y="12" width="12" height="1.5" rx="0.75" fill="#6B7280" />
            <rect x="2" y="2" width="12" height="1.5" rx="0.75" fill="#6B7280" />
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
```

- [ ] **Step 3: Create ChatWidget.jsx**

`src/components/ChatWidget.jsx`:
```jsx
import ChatHeader from './ChatHeader'
import { config } from '../data/config'

export default function ChatWidget({ onMinimize, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="widget-border widget-bg flex flex-col"
        style={{
          width: `${config.widgetWidth}px`,
          height: `${config.widgetHeight}px`,
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
```

- [ ] **Step 4: Wire into App.jsx temporarily to verify**

`src/App.jsx`:
```jsx
import { useState } from 'react'
import ChatWidget from './components/ChatWidget'
import { config } from './data/config'

function App() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : 'none',
          backgroundColor: '#1a1a1a',
        }}
      />
      {isOpen && (
        <ChatWidget onMinimize={() => setIsOpen(false)}>
          <div className="flex-1 p-6 text-gray-500">Messages will appear here</div>
        </ChatWidget>
      )}
    </div>
  )
}

export default App
```

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Expected: Centered modal with gradient border, correct dimensions (1000x977), header with "Autopilot / Powered by Talkdesk", layered gradient background visible at the bottom area. Clicking minimize hides the widget.

- [ ] **Step 6: Commit**

```bash
git add src/components/ChatWidget.jsx src/components/ChatHeader.jsx src/index.css src/App.jsx
git commit -m "feat: add ChatWidget container with gradient border and ChatHeader"
```

---

### Task 5: ChatBubble

**Files:**
- Create: `src/components/ChatBubble.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create ChatBubble.jsx**

`src/components/ChatBubble.jsx`:
```jsx
export default function ChatBubble({ onOpen }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-40 bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
      style={{ width: '320px' }}
      onClick={onOpen}
    >
      <div className="flex items-center gap-2 mb-3">
        {/* AI avatar placeholder */}
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
        <span className="gradient-text text-sm font-medium">AI Assistant</span>
      </div>
      <div className="text-sm text-gray-700 mb-3">
        Hi Alex — how can I help today?
      </div>
      <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.5" />
        </svg>
        <span className="text-sm text-gray-400">Ask anything...</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update App.jsx with bubble ↔ widget toggle**

`src/App.jsx`:
```jsx
import { useState } from 'react'
import ChatBubble from './components/ChatBubble'
import ChatWidget from './components/ChatWidget'
import { config } from './data/config'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : 'none',
          backgroundColor: '#1a1a1a',
        }}
      />
      {!isOpen && <ChatBubble onOpen={() => setIsOpen(true)} />}
      {isOpen && (
        <ChatWidget onMinimize={() => setIsOpen(false)}>
          <div className="flex-1 p-6 text-gray-500">Messages will appear here</div>
        </ChatWidget>
      )}
    </div>
  )
}

export default App
```

- [ ] **Step 3: Verify in browser**

Expected: Page loads with dark background. Bottom-right shows the chat bubble with greeting text and input placeholder. Clicking bubble opens the centered widget. Clicking minimize returns to bubble.

- [ ] **Step 4: Commit**

```bash
git add src/components/ChatBubble.jsx src/App.jsx
git commit -m "feat: add ChatBubble with bubble-to-widget toggle"
```

---

### Task 6: MessageInput Component

**Files:**
- Create: `src/components/MessageInput.jsx`

- [ ] **Step 1: Create MessageInput.jsx**

`src/components/MessageInput.jsx`:
```jsx
import { useState } from 'react'

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-gray-100">
      <div className="flex items-center gap-3 bg-white rounded-full border border-gray-200 px-4 py-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything..."
          disabled={disabled}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
        />
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1L7 13M7 1L2 6M7 1L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MessageInput.jsx
git commit -m "feat: add MessageInput component with send button"
```

---

### Task 7: TextMessage Component

**Files:**
- Create: `src/components/messages/TextMessage.jsx`

- [ ] **Step 1: Create TextMessage.jsx**

`src/components/messages/TextMessage.jsx`:
```jsx
export default function TextMessage({ message }) {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-gray-800 text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-md">
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start mb-4">
      <div className="flex items-center gap-2 mb-2">
        {/* AI avatar placeholder */}
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
        <span className="gradient-text text-sm font-semibold">AI Assistant</span>
      </div>
      <div className="max-w-lg">
        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          {message.text}
        </p>
        {message.timestamp && (
          <span className="text-xs text-gray-400 mt-1 block">{message.timestamp}</span>
        )}
      </div>
      {/* Action icons: copy, like, dislike */}
      <div className="flex items-center gap-3 mt-2">
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/messages/TextMessage.jsx
git commit -m "feat: add TextMessage component for AI and user messages"
```

---

### Task 8: MessageList + Typing Indicator

**Files:**
- Create: `src/components/MessageList.jsx`

- [ ] **Step 1: Create MessageList.jsx**

`src/components/MessageList.jsx`:
```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MessageList.jsx
git commit -m "feat: add MessageList with typing indicator and component routing"
```

---

### Task 9: ProductCards Component

**Files:**
- Create: `src/components/messages/ProductCards.jsx`

- [ ] **Step 1: Create ProductCards.jsx**

Reference design: `design/welcome-product-cards-list.png`

`src/components/messages/ProductCards.jsx`:
```jsx
import { products } from '../../data/products'

export default function ProductCards({ onBuyNow }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden"
        >
          {/* Product image */}
          <div className="bg-gray-50 p-4 flex items-center justify-center h-40">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect fill="%23f3f4f6" width="120" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Product</text></svg>'
              }}
            />
          </div>
          {/* Product info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              {product.inStock && (
                <span className="text-xs text-gray-500 whitespace-nowrap">In-stock</span>
              )}
            </div>
            <div className="mt-3 mb-4">
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
              <span className="text-xs text-gray-500 ml-1">USD</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onBuyNow(product)}
                className="flex-1 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                Buy now
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M5 1L3 4H1v2h1l1.5 7h7L12 6h1V4h-2L9 1H5zm0 1.5h4L10.5 5h-7L5 2.5zM4 8h6l-1 4H5L4 8z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/messages/ProductCards.jsx
git commit -m "feat: add ProductCards component with 3-column grid layout"
```

---

### Task 10: OrderSummary Component

**Files:**
- Create: `src/components/messages/OrderSummary.jsx`

- [ ] **Step 1: Create OrderSummary.jsx**

Reference design: `design/zenith-pro-order-detail-card.png`

`src/components/messages/OrderSummary.jsx`:
```jsx
import { products } from '../../data/products'
import { user, order } from '../../data/user'

export default function OrderSummary() {
  const product = products.find((p) => p.id === order.productId)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 max-w-md">
      {/* Product info */}
      <div className="flex gap-4 mb-4">
        <div className="w-28 h-28 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="%23f3f4f6" width="80" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="10">Product</text></svg>'
            }}
          />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-sm text-gray-700 mt-1">Size ({order.size})</p>
        </div>
      </div>

      {/* Price */}
      <div className="text-right mb-4">
        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
        <span className="text-sm text-gray-500 ml-1">USD</span>
      </div>

      {/* Price breakdown */}
      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-semibold text-gray-900">Subtotal</span>
          <span className="text-sm text-gray-900">${order.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Estimated Tax</span>
          <span className="text-sm text-gray-700">${order.tax}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Estimated shipping</span>
          <span className="text-sm text-gray-700">{order.shipping === 0 ? 'Free' : `$${order.shipping}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-amber-500 flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 7l1.5 1.5L9 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {user.memberTier} member {Math.round(user.discount * 100)}% discount
          </span>
          <span className="text-sm text-amber-500">-${Math.abs(order.memberDiscount)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between">
        <span className="text-base font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">${order.total}</span>
      </div>

      {/* Shipping to */}
      <div className="border-t border-gray-100 mt-4 pt-4">
        <h4 className="text-sm font-bold text-gray-900 mb-2">Shipping to</h4>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-600">{user.address}</p>
          <p className="text-sm text-gray-600">{user.phone}</p>
        </div>
      </div>

      {/* Checkout button */}
      <button className="w-full mt-6 bg-gray-900 text-white text-sm font-semibold py-3.5 rounded-full hover:bg-gray-800 transition-colors">
        Checkout
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/messages/OrderSummary.jsx
git commit -m "feat: add OrderSummary component with price breakdown and shipping"
```

---

### Task 11: CompareProduct Component

**Files:**
- Create: `src/components/messages/CompareProduct.jsx`

- [ ] **Step 1: Create CompareProduct.jsx**

Reference design: `design/diff-product-card-list.png`

`src/components/messages/CompareProduct.jsx`:
```jsx
import { products } from '../../data/products'

const compareProducts = [products[0], products[1]]

const comparisonFields = [
  { label: 'Price', key: 'price', format: (v) => `$${v} USD` },
  { label: 'Material', key: 'material' },
  { label: 'Weight', key: 'weight' },
  { label: 'Best for', key: 'bestFor' },
  { label: 'Agent advice', key: 'agentAdvice' },
]

export default function CompareProduct({ onBuyNow }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M10 4v12M2 7l2 3-2 3M18 7l-2 3 2 3" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-base font-bold text-gray-900">Compare Product</h3>
      </div>

      {/* Product images row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {compareProducts.map((product, idx) => (
          <div key={product.id}>
            <div
              className={`rounded-xl p-4 flex items-center justify-center h-44 relative ${
                idx === 0 ? 'border-2 border-blue-200 bg-blue-50/30' : 'bg-gray-50'
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect fill="%23f3f4f6" width="120" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Product</text></svg>'
                }}
              />
              {idx === 0 && (
                <span className="absolute bottom-3 left-3 bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  AI recommended
                </span>
              )}
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison rows */}
      <div className="space-y-4">
        {comparisonFields.map((field) => (
          <div key={field.key}>
            <div className="grid grid-cols-2 gap-4">
              {compareProducts.map((product) => (
                <div key={product.id}>
                  <p className="text-xs text-gray-500 mb-1">{field.label}</p>
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {field.format
                        ? field.format(product[field.key])
                        : product[field.key] || '—'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Buy now buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {compareProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => onBuyNow(product)}
            className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            Buy now
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/messages/CompareProduct.jsx
git commit -m "feat: add CompareProduct component with side-by-side comparison"
```

---

### Task 12: PaymentSuccess Component

**Files:**
- Create: `src/components/messages/PaymentSuccess.jsx`

- [ ] **Step 1: Create PaymentSuccess.jsx**

Reference design: `design/pay-success-order-detail-card.png`

`src/components/messages/PaymentSuccess.jsx`:
```jsx
import { products } from '../../data/products'
import { user, order } from '../../data/user'

export default function PaymentSuccess() {
  const product = products.find((p) => p.id === order.productId)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
      {/* Success header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10l3.5 3.5L15 7"
              stroke="#06B6D4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Payment success</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Your order has been received and is being processed
      </p>

      {/* Order summary card */}
      <div className="border border-gray-200 rounded-xl p-5">
        {/* Order header */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Order summary</h3>
          <span className="text-sm text-gray-500">{order.id}</span>
        </div>

        {/* Product */}
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect fill="%23f3f4f6" width="60" height="60"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="8">Product</text></svg>'
              }}
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-sm text-gray-700 mt-1">Size ({order.size})</p>
            <p className="text-sm text-gray-700">Quantity: {order.quantity}</p>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-gray-900">Subtotal</span>
            <span className="text-sm text-gray-900">${order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Estimated Tax</span>
            <span className="text-sm text-gray-700">${order.tax}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Estimated shipping</span>
            <span className="text-sm text-gray-700">{order.shipping === 0 ? 'Free' : `$${order.shipping}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-amber-500 flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 7l1.5 1.5L9 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {user.memberTier} member {Math.round(user.discount * 100)}% discount
            </span>
            <span className="text-sm text-amber-500">-${Math.abs(order.memberDiscount)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-amber-100 mt-4 pt-4 flex justify-between">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">${order.total}</span>
        </div>

        {/* Shipping to */}
        <div className="border-t border-gray-100 mt-4 pt-4">
          <h4 className="text-sm font-bold text-gray-900 mb-2">Shipping to</h4>
          <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
              <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" fill="#6B7280" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.address}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="border-t border-gray-100 mt-4 pt-4">
          <h4 className="text-sm font-bold text-gray-900 mb-2">Delivery</h4>
          <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M2 4h8l4 3v5h-2a2 2 0 01-4 0H6a2 2 0 01-4 0H1V6l1-2zm3 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" fill="#6B7280" />
            </svg>
            <p className="text-sm text-gray-700">Est. delivery: {order.estimatedDelivery}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/messages/PaymentSuccess.jsx
git commit -m "feat: add PaymentSuccess component with order receipt"
```

---

### Task 13: Wire Everything Together in App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update App.jsx to connect all components**

`src/App.jsx`:
```jsx
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
```

- [ ] **Step 2: Verify full flow in browser**

```bash
npm run dev
```

Test the complete 6-stage flow:
1. Page loads → see bubble in bottom-right
2. Click bubble → widget opens with greeting
3. Type "I'm looking for long-distance runners" → AI shows 3 product cards
4. Click "Buy now" on Zenith Pro → user message auto-sent → OrderSummary appears
5. Type "How do these compare to my old Zenith pair?" → CompareProduct appears
6. Click "Buy now" on Zenith Pro in compare → user message auto-sent → OrderSummary appears again
7. Type "I have already paid" → PaymentSuccess appears

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire all components together for complete conversation flow"
```

---

### Task 14: Visual Polish Pass

**Files:**
- Modify: Various components as needed based on design comparison

- [ ] **Step 1: Compare each component against design screenshots**

Open the app and compare side-by-side with each design file:
- `design/1.user-open-customer-website.png` — bubble position and style
- `design/2.user-open-chat-widget-conversation-ui-center-position.png` — widget layout, product cards
- `design/3.user-select-first-product-details-for-step2.png` — order summary
- `design/4.user-self-send-diff-product-message.png` — compare product
- `design/5.user-select-first-product-for-step4-and-check-pay-status.png` — payment success
- `design/welcome-product-cards-list.png` — product card detail
- `design/zenith-pro-order-detail-card.png` — order detail
- `design/diff-product-card-list.png` — compare detail
- `design/pay-success-order-detail-card.png` — payment detail

- [ ] **Step 2: Fix spacing, colors, font sizes, border radii**

Adjust any mismatches found in Step 1. Focus on:
- Card padding and margins
- Font weights and sizes
- Color values (especially grays, amber/gold for discount text)
- Border radii consistency
- Button sizes and styles
- Gradient border rendering

- [ ] **Step 3: Verify all fixes in browser**

Walk through the full 6-stage flow again to confirm visual fidelity.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "style: visual polish pass to match Figma design"
```

---

### Task 15: Final Smoke Test + Cleanup

**Files:**
- Possibly modify: any files with issues found during testing

- [ ] **Step 1: Full flow walkthrough**

Start from `npm run dev`. Complete the entire 6-stage journey:
1. Bubble → open widget
2. Ask about running shoes → product cards
3. Select product → order summary
4. Ask to compare → comparison card
5. Buy from comparison → order summary again
6. Confirm payment → payment success

Also test edge cases:
- Type unrecognized text at each stage → should get fallback nudge
- Rapid clicking → should not break state
- Minimize and re-open → conversation should persist

- [ ] **Step 2: Clean up any unused imports or files**

Check for:
- Unused Vite boilerplate files (e.g., `src/App.css`, `src/assets/`)
- Any console.log statements
- Default Vite favicon

```bash
rm -f src/App.css src/assets/react.svg
```

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup and smoke test pass"
```
