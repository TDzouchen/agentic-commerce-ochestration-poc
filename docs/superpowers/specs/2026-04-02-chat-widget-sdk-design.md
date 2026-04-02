# Chat Widget JS-SDK POC Design Spec

## Overview

A front-end POC demonstrating an AI-powered chat widget for e-commerce. The widget embeds into a host page and guides users through a conversational shopping experience: product discovery, comparison, ordering, and payment confirmation. All data is mocked; no backend required.

Target audience: PM demo. Goal: faithfully reproduce the Figma design and interactive flow.

## Tech Stack

- React 18 + JavaScript + Tailwind CSS
- Vite (build tool)
- No external dependencies beyond these
- Desktop-only, English-only

## Architecture

Single Page Application. The host page provides a configurable background slot; the chat widget renders on top.

```
┌──────────────────────────────────────────┐
│  Host Page (App.jsx)                     │
│  ┌──────────────────────────────────────┐│
│  │  Background Slot (configurable)      ││
│  │  - background image / custom HTML    ││
│  └──────────────────────────────────────┘│
│                                          │
│  ┌────────┐    ┌───────────────────────┐ │
│  │ Chat   │ →  │ Chat Widget (centered │ │
│  │ Bubble │    │ modal)                │ │
│  └────────┘    └───────────────────────┘ │
└──────────────────────────────────────────┘
```

## Project Structure

```
src/
├── App.jsx                 # Host page + widget container
├── components/
│   ├── ChatBubble.jsx      # Bottom-right floating bubble
│   ├── ChatWidget.jsx      # Centered dialog main container
│   ├── ChatHeader.jsx      # Top bar: Autopilot / Powered by Talkdesk
│   ├── MessageList.jsx     # Scrollable message area
│   ├── MessageInput.jsx    # Bottom input field
│   └── messages/
│       ├── TextMessage.jsx       # Plain text (AI / user)
│       ├── ProductCards.jsx      # 3-column product recommendation cards
│       ├── OrderSummary.jsx      # Order details + Checkout button
│       ├── CompareProduct.jsx    # Side-by-side product comparison
│       └── PaymentSuccess.jsx    # Payment confirmation receipt
├── data/
│   ├── products.js          # Product catalog
│   ├── user.js              # User profile + order template
│   ├── conversation.js      # Dialog scripts, keyword maps, AI reply text
│   └── config.js            # Global POC config (delays, widget size, etc.)
└── hooks/
    └── useConversation.js   # Conversation state machine hook
public/
└── images/                  # Product placeholder images (to be replaced)
```

## Conversation Flow Engine

### 6-Stage State Machine

```
GREETING → RECOMMEND → CHECKOUT → COMPARE → ORDER → PAYMENT
```

### Stage Transitions

| # | From | To | Trigger | AI Response |
|---|------|----|---------|-------------|
| 1 | GREETING | RECOMMEND | User input matches: running, shoe, runner, long-distance | Text reply + ProductCards (3 products) |
| 2 | RECOMMEND | CHECKOUT | User input matches: go with, buy, zenith, select, choose — OR user clicks "Buy now" on a card | Text reply + OrderSummary card |
| 3 | CHECKOUT | COMPARE | User input matches: compare, difference, vs, how do these | CompareProduct card (2 products) |
| 4 | COMPARE | ORDER | User clicks "Buy now" on first product in compare card → system auto-sends a user message (e.g. "I'd like to order the Zenith Pro") | OrderSummary card (same component as step 2) |
| 5 | ORDER | PAYMENT | User input matches: paid, pay, already paid, payment | PaymentSuccess card |

### Interaction Details

- After user sends a message, show "AI is typing..." animation (1-2s delay), then render AI response
- Keyword matching is case-insensitive
- If user input matches no keywords, AI replies with a contextual nudge text, stays in current stage
- "Buy now" buttons on ProductCards (step 2) and CompareProduct (step 4) also trigger stage transitions

## UI Component Specifications

### ChatBubble (bottom-right)

- Fixed position, bottom-right corner of host page
- Small dialog style showing: AI avatar + greeting text "Hi Alex — how can I help today?" + mini input field
- Clicking opens the centered ChatWidget and hides the bubble

### ChatWidget (centered modal)

- Centered on screen, 1000px wide x 977px tall
- Border radius: 20px
- Gradient border: `border: 4px solid; border-image-source: linear-gradient(226.31deg, #0FB0EA 0.56%, #F4FFDF 100%)`
- Dual box shadow: `0px 4px 8px -2px #00000014`, `0px 8px 16px 0px #0000001A`
- Bottom gradient background (layered):
  - Layer 1: `linear-gradient(279.67deg, #0088FF 1.6%, #6FB0B9 28.41%, #35903C 61.37%, #079010 99.05%)`
  - Layer 2: `linear-gradient(170.07deg, #F8F8F8 0%, #F8F8F8 50.14%, rgba(248,248,248,0.95) 65%, rgba(248,248,248,0.9) 85%, rgba(248,248,248,0.85) 90%, rgba(248,248,248,0.8) 95%, rgba(248,248,248,0.8) 100%)`
- Three zones: ChatHeader / MessageList / MessageInput

### ChatHeader

- Left: Black circular Autopilot logo + "Autopilot" title + "Powered by Talkdesk" subtitle
- Right: Minimize button, more options button (three dots)

### TextMessage

- **AI messages**: Left-aligned, "AI Assistant" label with blue text + orange dot avatar. Copy/like/dislike icons below the message. Timestamp shown on some messages (e.g. "10:30 AM").
- **User messages**: Right-aligned, dark background rounded bubble, white text.

### ProductCards

- 3-column grid layout inside a card container
- Each card: product image (placeholder) + product name + category ("Performance Running Shoes") + "In-stock" green label + price (e.g. "$135 USD") + black "Buy now" button with cart icon
- Cards have light border, rounded corners

### OrderSummary

- Single column card with sections:
  - Product: thumbnail image + name + category + size info
  - Price breakdown: Subtotal, Estimated Tax, Estimated shipping (Free), Gold member 15% discount (green text, negative amount)
  - Total (bold)
  - Shipping to: name, address, phone
  - Black "Checkout" button, full width

### CompareProduct

- Header: "Compare Product" with compare icon
- 2-column layout, each column is a product card
- First product: "AI recommended" green badge on image
- Comparison rows: Price, Material, Weight, Best for, Agent advice
- Each column has its own "Buy now" black button at bottom

### PaymentSuccess

- Green checkmark circle + "Payment success" title + subtitle
- Order summary section: order number, product thumbnail + name + size + quantity
- Price breakdown: same structure as OrderSummary
- Shipping to: address with location pin icon
- Delivery: estimated delivery date with clock icon

### MessageInput

- Fixed at bottom of ChatWidget
- Rounded input field, placeholder: "Ask anything..."
- Right side: circular send button (arrow icon)

## Mock Data

All mock data lives in `src/data/` for easy modification.

### Products (products.js)

```js
[
  {
    id: 1,
    name: "Zenith Pro",
    category: "Performance Running Shoes",
    price: 135,
    image: "/images/zenith-pro.png",
    inStock: true,
    material: "Premium leather",
    weight: "310g",
    bestFor: "Gym & streetwear",
    agentAdvice: "Fits small, order 0.5 size up"
  },
  {
    id: 2,
    name: "RU MAX 350",
    category: "Performance Running Shoes",
    price: 128,
    image: "/images/ru-max-350.png",
    inStock: true,
    material: "Engineered mesh",
    weight: "730g",
    bestFor: "Work & outdoor",
    agentAdvice: "True to size, excellent durability"
  },
  {
    id: 3,
    name: "AIRSC SPEEDCROSSS",
    category: "Performance Running Shoes",
    price: 150,
    image: "/images/airsc-speedcross.png",
    inStock: true
  }
]
```

### User & Order (user.js)

```js
user = {
  name: "ALEX M.",
  address: "2118 Thornridge Cir, Syracuse, Connecticut 35624",
  phone: "(209) 555-0104",
  memberTier: "Gold",
  discount: 0.15
}

order = {
  id: "#127896394",
  productId: 1,
  size: "US Mens: 10",
  quantity: 1,
  subtotal: 135,
  tax: 5,
  shipping: 0,
  memberDiscount: -18,
  total: 122,
  estimatedDelivery: "Wed, Apr 8"
}
```

### Conversation Scripts (conversation.js)

Each stage defines:
- `keywords`: array of trigger strings (case-insensitive partial match)
- `aiReply`: text content for AI response
- `component`: which message component to render
- `fallback`: text to show when no keyword matches

### Config (config.js)

- `typingDelay`: 1500ms (AI typing animation duration)
- `widgetWidth`: 1000px
- `widgetHeight`: 977px
- `backgroundImage`: configurable path (slot for host page background)

## POC Strategy

1. **Demo path first** — Only implement the 6-step flow from design, no extra features (no login, no real API, no persistence)
2. **Visual fidelity first** — Maximum effort to reproduce design mockups (gradient borders, card styles, spacing, colors). Product images use placeholders, ready for replacement
3. **Graceful fallback** — Unmatched user input gets a contextual nudge reply, conversation never gets stuck
4. **One-command start** — `npm install && npm run dev`, no env vars or backend needed
5. **Easy replacement** — Product images, copy, prices, user info all editable in data files. Host page background via config slot

## Out of Scope

- Mobile / responsive design
- Multi-language / i18n
- Real AI / LLM integration
- Backend services / API calls
- Authentication / user sessions
- Persistent storage
- SDK packaging / script tag embedding
- Accessibility (a11y)
