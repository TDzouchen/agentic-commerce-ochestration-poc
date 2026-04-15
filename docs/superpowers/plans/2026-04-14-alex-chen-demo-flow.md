# Alex Chen Demo Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 5-stage running-shoes demo with a 6-stage Alex Chen work-shoes flow featuring profile-aware recommendations, fit history alerts, product comparison with fit risk assessment, gold member discount confirmation, and payment.

**Architecture:** Update data layer (products, user, conversation scripts), refactor the 5-stage state machine to 6 stages (GREETING → RECOMMEND → COMPARE → CONFIRM_DISCOUNT → CHECKOUT → PAYMENT), and update 4 UI components to display new fields (tags, availability, ownership notes, 9-attribute comparison, fit risk, recommendations).

**Tech Stack:** React 18, JavaScript, Tailwind CSS v3, Vite 6 (no changes to stack)

---

## File Map

| File | Responsibility | Change Type |
|------|---------------|-------------|
| `src/data/products.js` | Product catalog (3 work shoes) | Full rewrite |
| `src/data/user.js` | User profile + order template | Full rewrite |
| `src/data/conversation.js` | 6-stage keyword maps, AI reply text, fallbacks | Full rewrite |
| `src/hooks/useConversation.js` | 6-stage state machine with stage-skipping | Major refactor |
| `src/components/messages/ProductCards.jsx` | Product cards with tags, color, ownership | Significant update |
| `src/components/messages/CompareProduct.jsx` | 9-attribute comparison + fit risk + recommendations | Major rewrite |
| `src/components/messages/OrderSummary.jsx` | Order card, rename button to "Pay Now" | Minor update |
| `src/components/messages/PaymentSuccess.jsx` | Payment receipt with updated data | Minor update |
| `src/components/MessageList.jsx` | Rename `onCheckout` prop to `onPayNow` | Minor update |
| `src/App.jsx` | Rename `handleCheckout` to `handlePayNow` in wiring | Minor update |

**No changes:** `ChatBubble.jsx`, `ChatWidget.jsx`, `ChatHeader.jsx`, `MessageInput.jsx`, `TextMessage.jsx`, `config.js`, `index.css`, `main.jsx`

---

### Task 1: Update Product Data

**Files:**
- Modify: `src/data/products.js`

- [ ] **Step 1: Replace product data with 3 work shoes**

Replace the entire contents of `src/data/products.js` with:

```js
import forgeDerby from '../assets/images/FORGE-DERBY.png'
import vaultCourtSneaker from '../assets/images/VAULT-COURT-SNEAKER.png'
import shiftRunner from '../assets/images/SHIFT-RUNNER.png'

export const products = [
  {
    id: 1,
    name: 'Forge Derby',
    price: 575,
    tags: ['work', 'wide', 'fit'],
    availableColor: 'Noir',
    owned: false,
    ownershipNote: null,
    image: forgeDerby,
    description: 'Durable construction with all-day comfort for work.',
  },
  {
    id: 2,
    name: 'Vault Court Sneaker',
    price: 390,
    tags: ['travel', 'wide', 'fit'],
    availableColor: 'Ivory',
    owned: true,
    ownershipNote: 'You own this in Ivory — consider other colors for rotation.',
    image: vaultCourtSneaker,
    description: 'Lightweight and cushioned for travel comfort.',
  },
  {
    id: 3,
    name: 'Shift Runner',
    price: 420,
    tags: ['travel', 'wide', 'fit'],
    availableColor: 'Bone',
    owned: true,
    ownershipNote: 'You own this in Bone — consider other colors for rotation.',
    image: shiftRunner,
    description: 'Breathable and supportive for demanding days.',
  },
]
```

- [ ] **Step 2: Verify no import errors**

```bash
npm run dev
```

Expected: Dev server starts without errors. No runtime errors in browser console (products aren't rendered yet with new fields but data shape is valid).

- [ ] **Step 3: Commit**

```bash
git add src/data/products.js
git commit -m "feat: replace running shoes with work shoes product data"
```

---

### Task 2: Update User Profile and Order Data

**Files:**
- Modify: `src/data/user.js`

- [ ] **Step 1: Replace user and order data**

Replace the entire contents of `src/data/user.js` with:

```js
export const user = {
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  address: '2118 Thornridge Cir, Syracuse, Connecticut 35624',
  phone: '(209) 555-0104',
  memberTier: 'Gold',
  discount: 0.15,
  size: 'US 10.5',
  width: 'Wide',
  style: 'Technical, performance, minimal',
  returns: '30-day returns',
  fitHistory: 'Carbon Loafer returned — "Too narrow across forefoot" — significant discomfort by end of day',
}

export const order = {
  id: '#127896394',
  productId: 3,
  productName: 'Shift Runner',
  color: 'Bone',
  size: 'US 10.5',
  quantity: 1,
  subtotal: 420,
  discount: 63,
  tax: 0,
  shipping: 0,
  total: 357,
  estimatedDelivery: 'Wed, Apr 22',
}
```

- [ ] **Step 2: Verify no import errors**

```bash
npm run dev
```

Expected: No errors. Components that import `user` and `order` may show different data but should not crash.

- [ ] **Step 3: Commit**

```bash
git add src/data/user.js
git commit -m "feat: replace user profile with Alex Chen and update order for Shift Runner"
```

---

### Task 3: Update Conversation Flow Data

**Files:**
- Modify: `src/data/conversation.js`

- [ ] **Step 1: Replace conversation stages with 6-stage flow**

Replace the entire contents of `src/data/conversation.js` with:

```js
export const stages = {
  GREETING: {
    keywords: ['work', 'shoe', 'comfortable', 'wide', 'budget', 'email', 'alex'],
    aiReply:
      'Welcome back, Alex! As a gold member, I\'ve matched your preferences to our catalog.\n\n**Your Profile**\n• Size: US 10.5  |  Width: Wide  |  Style: Technical, performance, minimal\n• Gold member — 30-day returns\n\n⚠ **Fit Alert**\nYou returned the Carbon Loafer — "Too narrow across forefoot" — significant discomfort by end of day. I\'ve excluded narrow-fit styles from your results.\n\n**Recommended for You**',
    component: 'ProductCards',
    fallback:
      "I can help with footwear recommendations. Could you tell me what type of shoes you're looking for?",
  },
  RECOMMEND: {
    keywords: ['compare', 'shift runner', 'vault court', 'vs', 'difference', 'side-by-side'],
    aiReply: "Here's a side-by-side comparison of the Shift Runner and Vault Court Sneaker:",
    component: 'CompareProduct',
    fallback:
      'Would you like to compare any of these, or add one to your cart?',
  },
  COMPARE: {
    keywords: ['buy', 'shift runner', 'bone', 'order', 'purchase', 'like to buy'],
    aiReply:
      'Great choice! As a gold member, you get 15% discount. Shall I place the order for the Shift Runner in Bone with your discount applied?',
    component: null,
    fallback:
      'Would you like to add one of these to your cart?',
  },
  CONFIRM_DISCOUNT: {
    keywords: ['yes', 'sure', 'please', 'go ahead', 'confirm', 'ok'],
    aiReply: '',
    component: 'OrderSummary',
    fallback:
      'Would you like me to proceed with the order?',
  },
  CHECKOUT: {
    keywords: [],
    aiReply: '',
    component: 'PaymentSuccess',
    fallback:
      "Let me know once you've completed the payment!",
  },
  PAYMENT: {
    keywords: [],
    aiReply: '',
    component: null,
    fallback:
      'Your order is confirmed!',
  },
}

export const greetingMessage = {
  type: 'ai',
  text: 'Hello! Welcome to Vault Noir AI Concierge. How can I assist you with your footwear needs today? If you have an email address, please provide it so I can access your profile and personalize your experience.',
  component: null,
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/conversation.js
git commit -m "feat: replace 5-stage running shoes flow with 6-stage Alex Chen work shoes flow"
```

---

### Task 4: Refactor Conversation State Machine

**Files:**
- Modify: `src/hooks/useConversation.js`

- [ ] **Step 1: Update to 6-stage flow with handleBuyNow at multiple stages and handlePayNow**

Replace the entire contents of `src/hooks/useConversation.js` with:

```js
import { useState, useCallback } from 'react'
import { stages, greetingMessage } from '../data/conversation'
import { config } from '../data/config'

const STAGE_ORDER = ['GREETING', 'RECOMMEND', 'COMPARE', 'CONFIRM_DISCOUNT', 'CHECKOUT', 'PAYMENT']

function matchKeywords(text, keywords) {
  const lower = text.toLowerCase()
  return keywords.some((kw) => lower.includes(kw.toLowerCase()))
}

function randomDelay() {
  return config.typingDelayMin + Math.random() * (config.typingDelayMax - config.typingDelayMin)
}

export function useConversation() {
  const [stageIndex, setStageIndex] = useState(0)
  const [messages, setMessages] = useState([greetingMessage])
  const [isTyping, setIsTyping] = useState(false)

  const currentStage = STAGE_ORDER[stageIndex]

  const addAiResponse = useCallback(
    (nextStageIndex) => {
      setIsTyping(true)
      const stageData = stages[STAGE_ORDER[nextStageIndex - 1]] ?? stages[STAGE_ORDER[nextStageIndex]]

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
      }, randomDelay())
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
        }, randomDelay())
      }
    },
    [currentStage, stageIndex, isTyping, addAiResponse]
  )

  const handleBuyNow = useCallback(
    (product) => {
      if (isTyping) return

      if (currentStage === 'RECOMMEND') {
        // From ProductCards: skip COMPARE, jump to CONFIRM_DISCOUNT
        const userMsg = { type: 'user', text: `I would like to buy the ${product.name} in ${product.availableColor}.` }
        setMessages((prev) => [...prev, userMsg])
        // Skip to CONFIRM_DISCOUNT (index 3)
        const confirmIndex = STAGE_ORDER.indexOf('CONFIRM_DISCOUNT')
        setStageIndex(confirmIndex)
        addAiResponse(confirmIndex)
      } else if (currentStage === 'COMPARE') {
        // From CompareProduct: advance to CONFIRM_DISCOUNT
        const userMsg = { type: 'user', text: `I would like to buy the ${product.name} in ${product.availableColor}.` }
        setMessages((prev) => [...prev, userMsg])
        const nextIndex = stageIndex + 1
        setStageIndex(nextIndex)
        addAiResponse(nextIndex)
      }
    },
    [currentStage, stageIndex, isTyping, addAiResponse]
  )

  const handlePayNow = useCallback(() => {
    if (isTyping) return
    if (currentStage !== 'CHECKOUT') return

    const userMsg = { type: 'user', text: 'Payment confirmed.' }
    setMessages((prev) => [...prev, userMsg])
    const nextIndex = stageIndex + 1
    setStageIndex(nextIndex)
    addAiResponse(nextIndex)
  }, [currentStage, stageIndex, isTyping, addAiResponse])

  return {
    messages,
    isTyping,
    currentStage,
    sendMessage,
    handleBuyNow,
    handlePayNow,
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useConversation.js
git commit -m "feat: refactor state machine to 6-stage Alex Chen flow with handlePayNow"
```

---

### Task 5: Update App.jsx Wiring

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `handleCheckout` with `handlePayNow`**

In `src/App.jsx`, change the destructured export and prop name.

Find:
```js
  const { messages, isTyping, currentStage, sendMessage, handleBuyNow, handleCheckout } = useConversation()
```

Replace with:
```js
  const { messages, isTyping, currentStage, sendMessage, handleBuyNow, handlePayNow } = useConversation()
```

Find:
```jsx
          onCheckout={handleCheckout}
```

Replace with:
```jsx
          onPayNow={handlePayNow}
```

- [ ] **Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: rename handleCheckout to handlePayNow in App wiring"
```

---

### Task 6: Update MessageList Prop Routing

**Files:**
- Modify: `src/components/MessageList.jsx`

- [ ] **Step 1: Rename `onCheckout` prop to `onPayNow`**

In `src/components/MessageList.jsx`:

Find (line 31):
```jsx
export default function MessageList({ messages, isTyping, onBuyNow, onCheckout }) {
```

Replace with:
```jsx
export default function MessageList({ messages, isTyping, onBuyNow, onPayNow }) {
```

Find (line 47):
```jsx
          return <Comp key={i} onBuyNow={onBuyNow} onCheckout={onCheckout} />
```

Replace with:
```jsx
          return <Comp key={i} onBuyNow={onBuyNow} onPayNow={onPayNow} />
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MessageList.jsx
git commit -m "refactor: rename onCheckout to onPayNow in MessageList"
```

---

### Task 7: Update ProductCards Component

**Files:**
- Modify: `src/components/messages/ProductCards.jsx`

- [ ] **Step 1: Add tags, available color, and ownership note display**

Replace the entire contents of `src/components/messages/ProductCards.jsx` with:

```jsx
import { products } from '../../data/products'

export default function ProductCards({ onBuyNow }) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-[12px] overflow-hidden p-4"
        >
          {/* Product image */}
          <div className="bg-[#F5F5F5] rounded-[8px] flex items-center justify-center h-[180px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[90%] max-w-[90%] object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect fill="%23f3f4f6" width="120" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Product</text></svg>'
              }}
            />
          </div>
          {/* Product info */}
          <div className="pt-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-900 leading-tight">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{product.description}</p>
              </div>
            </div>
            {/* Tags */}
            <div className="mt-2">
              <span className="text-xs text-gray-400">
                {product.tags.join(' | ')}
              </span>
            </div>
            {/* Available color */}
            <div className="mt-1.5 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                <path d="M2 6l3 3 5-5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-gray-600">{product.availableColor}</span>
            </div>
            {/* Ownership note */}
            {product.owned && product.ownershipNote && (
              <p className="text-xs text-gray-400 italic mt-1">{product.ownershipNote}</p>
            )}
            <div className="mt-3 mb-3">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              <span className="text-xs text-gray-500 ml-1">USD</span>
            </div>
            <div className="flex gap-2 items-stretch">
              <button
                onClick={() => onBuyNow(product)}
                className="flex-1 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors h-[30px]"
              >
                Buy now
              </button>
              <button className="flex items-center justify-center rounded-lg overflow-hidden flex-shrink-0 w-[30px] h-[30px]">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H26C28.2091 0 30 1.79086 30 4V26C30 28.2091 28.2091 30 26 30H4C1.79086 30 0 28.2091 0 26V4Z" fill="#CCE4C9"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.4404 8.61985C14.7004 8.22665 15.2802 8.22665 15.5469 8.61985L18.4736 12.9997H21.667C22.0337 12.9997 22.334 13.3001 22.334 13.6667L22.3135 13.8464L20.6201 20.0271C20.46 20.5867 19.947 20.9996 19.334 20.9997H10.667C10.0538 20.9997 9.54018 20.5869 9.38672 20.0271L7.69336 13.8464C7.67344 13.7865 7.667 13.7266 7.66699 13.6667C7.66699 13.3001 7.96732 12.9997 8.33398 12.9997H11.5137L14.4404 8.61985ZM15 15.6667C14.2669 15.6669 13.6671 16.2666 13.667 16.9997C13.667 17.733 14.2668 18.3335 15 18.3337C15.7333 18.3337 16.334 17.7331 16.334 16.9997C16.3339 16.2665 15.7333 15.6667 15 15.6667ZM13.1201 12.9997H16.8672L14.9941 10.1931L13.1201 12.9997Z" fill="#1F1F1F"/>
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

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Product cards show 3 work shoes with tags, available color with checkmark, and ownership notes for owned products.

- [ ] **Step 3: Commit**

```bash
git add src/components/messages/ProductCards.jsx
git commit -m "feat: add tags, available color, and ownership notes to product cards"
```

---

### Task 8: Rewrite CompareProduct Component

**Files:**
- Modify: `src/components/messages/CompareProduct.jsx`

- [ ] **Step 1: Update to 9-attribute comparison with fit risk and recommendation sections**

Replace the entire contents of `src/components/messages/CompareProduct.jsx` with:

```jsx
import { products } from '../../data/products'

const compareProducts = [products[2], products[1]] // Shift Runner vs Vault Court Sneaker

const comparisonData = {
  'Price': ['$195', '$175'],
  'Width': ['Wide', 'Wide'],
  'Toe Shape': ['Rounded toe', 'Rounded toe'],
  'Construction': ['Stitchdown construction', 'Vulcanized rubber sole'],
  'Break-in': ['Moderate break-in period', 'Minimal break-in period'],
  'All-day Comfort': ['8+ hours', '6-8 hours'],
  'Weather': ['Weather-resistant leather upper', 'Weather-resistant canvas upper'],
  'Resolable': ['Yes, up to 3 years', 'No'],
  'Fit Risk': ['LOW', 'LOW'],
}

const comparisonFields = Object.keys(comparisonData)

const fitRiskAssessment = [
  { name: 'Shift Runner', risk: 'LOW', note: 'wide fit and you own this product without return.' },
  { name: 'Vault Court Sneaker', risk: 'LOW', note: 'wide fit and you own this product without return.' },
]

const recommendations = [
  { name: 'Shift Runner', note: 'Best for durability, resolability, and longer all-day comfort.' },
  { name: 'Vault Court Sneaker', note: 'Better for casual wear and minimal break-in period.' },
]

export default function CompareProduct({ onBuyNow }) {
  return (
    <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4 mb-4 w-4/5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.66667 14.6667V13.3333H1.33333C0.966667 13.3333 0.652778 13.2028 0.391667 12.9417C0.130556 12.6806 0 12.3667 0 12V2.66667C0 2.3 0.130556 1.98611 0.391667 1.725C0.652778 1.46389 0.966667 1.33333 1.33333 1.33333H4.66667V0H6V14.6667H4.66667ZM1.33333 11.3333H4.66667V7.33333L1.33333 11.3333ZM7.33333 13.3333V7.33333L10.6667 11.3333V2.66667H7.33333V1.33333H10.6667C11.0333 1.33333 11.3472 1.46389 11.6083 1.725C11.8694 1.98611 12 2.3 12 2.66667V12C12 12.3667 11.8694 12.6806 11.6083 12.9417C11.3472 13.2028 11.0333 13.3333 10.6667 13.3333H7.33333Z" fill="#1F1F1F"/>
        </svg>
        <h3 className="text-lg font-bold text-gray-900">Compare Product</h3>
      </div>

      {/* Product cards row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {compareProducts.map((product, idx) => (
          <div
            key={product.id}
            className={`rounded-[12px] p-4 pb-4 ${
              idx === 0
                ? 'border border-transparent'
                : 'border border-gray-200'
            }`}
            style={
              idx === 0
                ? {
                    background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(20.41deg, rgba(15, 176, 234, 0.64) -2.26%, rgba(244, 255, 223, 0.8) 107.78%) border-box',
                    border: '1px solid transparent',
                  }
                : undefined
            }
          >
            {/* Image area */}
            <div className="bg-[#F5F5F5] rounded-[8px] p-4 flex items-center justify-center relative w-full h-[246px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect fill="%23f3f4f6" width="120" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Product</text></svg>'
                }}
              />
              {idx === 0 && (
                <span
                  className="absolute bottom-3 right-3 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(98.73deg, #0FB0EA -10.9%, #F4FFDF 139.61%)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1l1.5 3.5L12 5.5l-2.5 2.5L10 12l-3-2-3 2 .5-4L2 5.5l3.5-1L7 1z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
                  </svg>
                  AI recommended
                </span>
              )}
            </div>
            {/* Product name & description */}
            <div className="mt-3 px-1">
              <h4 className="text-sm font-bold text-gray-900">{product.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison rows — 9 attributes */}
      <div className="space-y-3">
        {comparisonFields.map((field) => (
          <div key={field}>
            <div className="grid grid-cols-2 gap-4">
              {compareProducts.map((product, idx) => (
                <div key={product.id}>
                  <p className="text-xs text-gray-400 mb-1">{field}</p>
                  <div
                    className="rounded-lg px-3 py-2.5"
                    style={{ background: idx === 0 ? 'rgba(15, 176, 234, 0.06)' : '#f9fafb' }}
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {comparisonData[field][idx]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fit Risk Assessment */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Fit Risk Assessment</h4>
        <div className="space-y-2">
          {fitRiskAssessment.map((item) => (
            <div key={item.name} className="flex items-start gap-2">
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded flex-shrink-0">
                {item.risk}
              </span>
              <p className="text-sm text-gray-700">
                <span className="font-medium">{item.name}</span> — {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Recommendation</h4>
        <div className="space-y-2">
          {recommendations.map((item) => (
            <p key={item.name} className="text-sm text-gray-700">
              <span className="font-medium">{item.name}</span> — {item.note}
            </p>
          ))}
        </div>
      </div>

      {/* Buy now buttons */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        {compareProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => onBuyNow(product)}
            className="w-full bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors h-[36px]"
          >
            Buy now
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Comparison component shows Shift Runner vs Vault Court Sneaker with 9 attribute rows, Fit Risk Assessment section, and Recommendation section. AI recommended badge on Shift Runner.

- [ ] **Step 3: Commit**

```bash
git add src/components/messages/CompareProduct.jsx
git commit -m "feat: expand comparison to 9 attributes with fit risk and recommendations"
```

---

### Task 9: Update OrderSummary Component

**Files:**
- Modify: `src/components/messages/OrderSummary.jsx`

- [ ] **Step 1: Rename button text and prop, update data display**

In `src/components/messages/OrderSummary.jsx`, make these changes:

Find (line 4):
```jsx
export default function OrderSummary({ onCheckout }) {
```

Replace with:
```jsx
export default function OrderSummary({ onPayNow }) {
```

Find (line 24):
```jsx
          <p className="text-sm text-gray-900 mt-3">Size ({order.size}): {order.sizeValue}</p>
```

Replace with:
```jsx
          <p className="text-sm text-gray-900 mt-3">Size: {order.size}</p>
          <p className="text-sm text-gray-900 mt-0.5">Color: {order.color}</p>
```

Find (lines 48-55):
```jsx
          <span className="text-sm flex items-center gap-1.5 text-[#D48806]">
```
_This is the discount line. The data fields need to change from `order.memberDiscount` to `order.discount`._

Find:
```jsx
            {user.memberTier} member {Math.round(user.discount * 100)}% discount
          </span>
          <span className="text-sm text-[#D48806]">-${Math.abs(order.memberDiscount)}</span>
```

Replace with:
```jsx
            {user.memberTier} member {Math.round(user.discount * 100)}% discount
          </span>
          <span className="text-sm text-[#D48806]">-${order.discount}</span>
```

Find (lines 76-81):
```jsx
      <button
        onClick={onCheckout}
        className="w-full mt-6 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors h-[36px]"
      >
        Checkout
      </button>
```

Replace with:
```jsx
      <button
        onClick={onPayNow}
        className="w-full mt-6 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors h-[36px]"
      >
        Pay Now
      </button>
```

- [ ] **Step 2: Verify in browser**

Expected: OrderSummary shows "Pay Now" button, Shift Runner order data with size US 10.5, color Bone, $420 subtotal, -$63 discount, $357 total.

- [ ] **Step 3: Commit**

```bash
git add src/components/messages/OrderSummary.jsx
git commit -m "feat: rename Checkout to Pay Now and update order data display"
```

---

### Task 10: Update PaymentSuccess Component

**Files:**
- Modify: `src/components/messages/PaymentSuccess.jsx`

- [ ] **Step 1: Update size/color display to use new order fields**

In `src/components/messages/PaymentSuccess.jsx`:

Find (line 59):
```jsx
            <p className="text-sm text-gray-700 mt-1">Size ({order.size}): {order.sizeValue}</p>
```

Replace with:
```jsx
            <p className="text-sm text-gray-700 mt-1">Size: {order.size}</p>
            <p className="text-sm text-gray-700">Color: {order.color}</p>
```

Find (line 85):
```jsx
            <span className="text-sm text-[#D48806]">-${Math.abs(order.memberDiscount)}</span>
```

Replace with:
```jsx
            <span className="text-sm text-[#D48806]">-${order.discount}</span>
```

- [ ] **Step 2: Verify in browser**

Expected: PaymentSuccess shows Shift Runner, size US 10.5, color Bone, -$63 discount, $357 total, Alex Chen shipping info.

- [ ] **Step 3: Commit**

```bash
git add src/components/messages/PaymentSuccess.jsx
git commit -m "feat: update PaymentSuccess for Shift Runner order data"
```

---

### Task 11: Smoke Test Full 6-Stage Flow

**Files:**
- Possibly modify: any files with issues found during testing

- [ ] **Step 1: Full flow walkthrough**

```bash
npm run dev
```

Walk through the complete 6-stage flow:

1. **Page loads** → Chat bubble visible in bottom-right
2. **Click bubble** → Widget opens with greeting: "Hello! Welcome to Vault Noir AI Concierge..."
3. **Type "I need comfortable work shoes"** → AI responds with profile summary, fit alert, "Recommended for You" + 3 ProductCards (Forge Derby, Vault Court Sneaker, Shift Runner) with tags, colors, ownership notes
4. **Type "Compare the Shift Runner vs Vault Court"** → CompareProduct renders with 9 attributes, fit risk, recommendations
5. **Type "I'd like to buy the Shift Runner"** → AI responds: "Great choice! As a gold member, you get 15% discount..."
6. **Type "Yes, go ahead"** → OrderSummary renders with Shift Runner, Bone, $420, -$63, $357 total, "Pay Now" button
7. **Click "Pay Now"** → PaymentSuccess renders with order confirmation, input disabled

Also test:
- **Buy Now from ProductCards** (step 3): Click "Buy now" on Shift Runner → should skip COMPARE, show CONFIRM_DISCOUNT text
- **Buy Now from CompareProduct** (step 4): Click "Buy now" on Shift Runner → should advance to CONFIRM_DISCOUNT
- **Fallback messages**: Type unrecognized text at each stage → get stage-appropriate fallback
- **Minimize and re-open**: Conversation state persists

- [ ] **Step 2: Fix any issues found**

Address any visual or behavioral issues discovered during testing.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Alex Chen 6-stage demo flow"
```
