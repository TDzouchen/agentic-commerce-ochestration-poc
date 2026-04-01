# Chat Widget JS-SDK Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local chat widget JS-SDK POC that simulates a complete product discovery to checkout flow via keyword-based intent matching.

**Architecture:** Single-page app with a floating chat widget injected into a host page. One JS file handles all logic: state machine, intent matching, message rendering, and mock data. One CSS file handles all styling. The widget progresses through states (`welcome → product_query → product_selected → checkout → completed`) driven by user input keyword matching and button clicks.

**Tech Stack:** Pure HTML, CSS, vanilla JavaScript. Zero dependencies. Served via `npx serve`.

---

## File Structure

| File | Responsibility |
|------|---------------|
| `index.html` | Host page with background image placeholder, imports CSS/JS |
| `css/widget.css` | All widget styles: shell, messages, cards, responsive layout |
| `js/widget.js` | Widget logic: DOM creation, state machine, intent matching, message rendering, mock data |
| `assets/` | Directory for product images, logo (placeholders until provided) |

---

### Task 1: Host Page & Project Scaffold

**Files:**
- Create: `index.html`
- Create: `css/widget.css` (empty scaffold)
- Create: `js/widget.js` (empty scaffold)
- Create: `assets/.gitkeep`

- [ ] **Step 1: Create `assets/.gitkeep`**

Create the assets directory with a `.gitkeep` file to preserve the empty directory.

- [ ] **Step 2: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agentic Commerce</title>
  <link rel="stylesheet" href="css/widget.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 100vw;
      height: 100vh;
      background-color: #1a1a1a;
      background-image: url('assets/background.png');
      background-size: cover;
      background-position: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  </style>
</head>
<body>
  <script src="js/widget.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create empty `css/widget.css`**

```css
/* Chat Widget Styles */
```

- [ ] **Step 4: Create empty `js/widget.js`**

```js
// Chat Widget JS-SDK
```

- [ ] **Step 5: Verify scaffold loads**

Run: `cd /Users/chenzou/Desktop/Talkdesk/agentic-commerce-ochestration && npx serve . -l 3000`

Open `http://localhost:3000` — should see a dark page with no errors in console.

- [ ] **Step 6: Commit**

```bash
git add index.html css/widget.css js/widget.js assets/.gitkeep
git commit -m "feat: scaffold project structure with host page"
```

---

### Task 2: Widget Shell — Launcher, Header, Message Area, Input Bar

**Files:**
- Modify: `js/widget.js`
- Modify: `css/widget.css`

- [ ] **Step 1: Add widget shell DOM creation in `js/widget.js`**

Replace the entire file with:

```js
// ============================================================
// Mock Data
// ============================================================
const PRODUCTS = [
  {
    id: 'zenith-pro',
    name: 'Zenith Pro',
    category: 'Performance Running Shoes',
    price: 135,
    stock: 'In-stock',
    image: 'assets/zenith-pro.png',
  },
  {
    id: 'ru-max-350',
    name: 'RU MAX 350',
    category: 'Performance Running Shoes',
    price: 128,
    stock: 'In-stock',
    image: 'assets/ru-max-350.png',
  },
  {
    id: 'airsc-speedcross',
    name: 'AIRSC SPEEDCROSS',
    category: 'Performance Running Shoes',
    price: 150,
    stock: 'In-stock',
    image: 'assets/airsc-speedcross.png',
  },
];

const ORDER = {
  size: 'US Men\'s 10',
  subtotal: 135,
  tax: 5,
  shipping: 'Free',
  discount: 18,
  discountLabel: 'Gold member 15% discount',
  total: 122,
};

const USER = {
  name: 'ALEX M.',
  address: '2118 Thornridge Cir, Syracuse, Connecticut 35624',
  phone: '(209) 555-0104',
};

// ============================================================
// State Machine
// ============================================================
const STATES = {
  WELCOME: 'welcome',
  PRODUCT_QUERY: 'product_query',
  PRODUCT_SELECTED: 'product_selected',
  CHECKOUT: 'checkout',
  COMPLETED: 'completed',
};

const INTENT_KEYWORDS = {
  [STATES.WELCOME]: ['running', 'shoes', 'sneakers', 'trainer', 'long-distance', 'marathon', 'jogging'],
  [STATES.CHECKOUT]: ['paid', 'pay', 'payment', 'done', 'completed', 'transferred'],
};

let currentState = STATES.WELCOME;
let selectedProduct = null;

// ============================================================
// Widget DOM
// ============================================================
function createWidget() {
  // Launcher button
  const launcher = document.createElement('div');
  launcher.id = 'widget-launcher';
  launcher.innerHTML = `
    <div class="launcher-btn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>
  `;
  document.body.appendChild(launcher);

  // Widget panel
  const widget = document.createElement('div');
  widget.id = 'widget-panel';
  widget.classList.add('hidden');
  widget.innerHTML = `
    <div class="widget-header">
      <div class="header-left">
        <div class="header-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
        <div class="header-info">
          <span class="header-title">Autopilot</span>
          <span class="header-subtitle">Powered by Talkdesk</span>
        </div>
      </div>
      <div class="header-actions">
        <button class="header-btn" id="btn-minimize" title="Minimize">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M5 12h14"/>
          </svg>
        </button>
        <button class="header-btn" id="btn-fullscreen" title="Fullscreen">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
          </svg>
        </button>
        <button class="header-btn" id="btn-more" title="More">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="5" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="12" cy="19" r="1.5"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="widget-messages" id="messages-container"></div>
    <div class="widget-input">
      <input type="text" id="message-input" placeholder="Ask anything..." />
      <button id="send-btn" class="send-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    </div>
  `;
  document.body.appendChild(widget);

  // Event listeners
  launcher.addEventListener('click', openWidget);
  document.getElementById('btn-minimize').addEventListener('click', closeWidget);
  document.getElementById('send-btn').addEventListener('click', handleSend);
  document.getElementById('message-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}

// ============================================================
// Widget Open / Close
// ============================================================
function openWidget() {
  document.getElementById('widget-panel').classList.remove('hidden');
  document.getElementById('widget-launcher').classList.add('hidden');
  if (currentState === STATES.WELCOME) {
    addAIMessage('👋 Hi Alex — how can I help today?');
  }
}

function closeWidget() {
  document.getElementById('widget-panel').classList.add('hidden');
  document.getElementById('widget-launcher').classList.remove('hidden');
}

// ============================================================
// Message Rendering
// ============================================================
function getTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function scrollToBottom() {
  const container = document.getElementById('messages-container');
  container.scrollTop = container.scrollHeight;
}

function addAIMessage(text) {
  const container = document.getElementById('messages-container');
  const wrapper = document.createElement('div');
  wrapper.className = 'message-wrapper ai';
  wrapper.innerHTML = `
    <div class="message-label">
      <span class="ai-dot"></span>
      AI Assistant
    </div>
    <div class="message-bubble ai">${text}</div>
    <div class="message-time">${getTimestamp()}</div>
  `;
  container.appendChild(wrapper);
  scrollToBottom();
}

function addUserMessage(text) {
  const container = document.getElementById('messages-container');
  const wrapper = document.createElement('div');
  wrapper.className = 'message-wrapper user';
  wrapper.innerHTML = `
    <div class="message-bubble user">${text}</div>
    <div class="message-time">${getTimestamp()}</div>
  `;
  container.appendChild(wrapper);
  scrollToBottom();
}

// ============================================================
// Intent Matching & Flow
// ============================================================
function handleSend() {
  const input = document.getElementById('message-input');
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = '';

  const lowerText = text.toLowerCase();

  switch (currentState) {
    case STATES.WELCOME:
      if (matchesKeywords(lowerText, INTENT_KEYWORDS[STATES.WELCOME])) {
        currentState = STATES.PRODUCT_QUERY;
        setTimeout(() => {
          addAIMessage(
            'Hi Alex, this is our fastest running shoe. ' +
            'However, based on your profile, you usually prefer max cushioning. ' +
            'This model is built for speed and performance, so it feels firmer than a typical daily trainer. ' +
            'Would you like to see how compares with our most cushioned option, the Zenith or view it?'
          );
          addProductCards();
        }, 500);
      } else {
        addAIFallback();
      }
      break;

    case STATES.CHECKOUT:
      if (matchesKeywords(lowerText, INTENT_KEYWORDS[STATES.CHECKOUT])) {
        currentState = STATES.COMPLETED;
        setTimeout(() => addPaymentSuccessCard(), 500);
      } else {
        addAIFallback();
      }
      break;

    default:
      addAIFallback();
      break;
  }
}

function matchesKeywords(text, keywords) {
  return keywords.some((kw) => text.includes(kw));
}

function addAIFallback() {
  setTimeout(() => {
    addAIMessage("I'm not sure I understand. Could you rephrase?");
  }, 500);
}

// ============================================================
// Product Cards
// ============================================================
function addProductCards() {
  const container = document.getElementById('messages-container');
  const wrapper = document.createElement('div');
  wrapper.className = 'message-wrapper ai';

  let cardsHTML = '<div class="product-cards">';
  PRODUCTS.forEach((product) => {
    cardsHTML += `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'" />
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-category">${product.category}</div>
          <div class="product-stock">${product.stock}</div>
          <div class="product-price">$${product.price}<span class="price-currency">USD</span></div>
        </div>
        <div class="product-actions">
          <button class="buy-now-btn" data-product-id="${product.id}">Buy now</button>
          <button class="cart-icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  });
  cardsHTML += '</div>';

  wrapper.innerHTML = cardsHTML;
  container.appendChild(wrapper);
  scrollToBottom();

  // Bind Buy now buttons
  wrapper.querySelectorAll('.buy-now-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.productId;
      selectedProduct = PRODUCTS.find((p) => p.id === productId);
      handleBuyNow(selectedProduct);
    });
  });
}

function handleBuyNow(product) {
  currentState = STATES.PRODUCT_SELECTED;
  addUserMessage(`Let's go with the ${product.name}.`);
  setTimeout(() => {
    addOrderSummaryCard(product);
    currentState = STATES.CHECKOUT;
  }, 500);
}

// ============================================================
// Order Summary Card
// ============================================================
function addOrderSummaryCard(product) {
  const container = document.getElementById('messages-container');
  const wrapper = document.createElement('div');
  wrapper.className = 'message-wrapper ai';
  wrapper.innerHTML = `
    <div class="message-label">
      <span class="ai-dot"></span>
      AI Assistant
    </div>
    <div class="order-card">
      <div class="order-product">
        <div class="order-product-image">
          <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'" />
        </div>
        <div class="order-product-info">
          <div class="order-product-name">${product.name}</div>
          <div class="order-product-category">${product.category}</div>
          <div class="order-product-size">Size (${ORDER.size})</div>
        </div>
        <div class="order-product-price">$${product.price}<span class="price-currency">USD</span></div>
      </div>
      <div class="order-divider"></div>
      <div class="order-line"><span>Subtotal</span><span>$${ORDER.subtotal}</span></div>
      <div class="order-line"><span>Estimated Tax</span><span>$${ORDER.tax}</span></div>
      <div class="order-line"><span>Estimated shipping</span><span>${ORDER.shipping}</span></div>
      <div class="order-line discount"><span>&#9670; ${ORDER.discountLabel}</span><span>-$${ORDER.discount}</span></div>
      <div class="order-divider"></div>
      <div class="order-line total"><span>Total</span><span>$${ORDER.total}</span></div>
      <div class="order-divider"></div>
      <div class="order-shipping">
        <div class="order-shipping-title">Shipping to</div>
        <div class="order-shipping-name">${USER.name}</div>
        <div class="order-shipping-address">${USER.address}</div>
        <div class="order-shipping-phone">${USER.phone}</div>
      </div>
      <button class="checkout-btn" id="checkout-btn">Checkout</button>
    </div>
    <div class="message-time">${getTimestamp()}</div>
  `;
  container.appendChild(wrapper);
  scrollToBottom();

  // Checkout button — no auto-send, just wait for user to type "paid"
  // The Checkout button is visual only in this flow; user types "I have already paid."
}

// ============================================================
// Payment Success Card
// ============================================================
function addPaymentSuccessCard() {
  const container = document.getElementById('messages-container');
  const wrapper = document.createElement('div');
  wrapper.className = 'message-wrapper ai';
  wrapper.innerHTML = `
    <div class="payment-success-card">
      <div class="success-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" stroke="#22c55e" stroke-width="2" fill="none"/>
          <path d="M7 13l3 3 7-7" stroke="#22c55e" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="success-title">Your payment was successful</div>
      <div class="success-desc">Your order has been placed successfully. We'll process it shortly and send you a confirmation email with details</div>
    </div>
    <div class="message-time">${getTimestamp()}</div>
  `;
  container.appendChild(wrapper);
  scrollToBottom();
}

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', createWidget);
```

- [ ] **Step 2: Add all styles in `css/widget.css`**

Replace the entire file with:

```css
/* ============================================================
   Widget Shell
   ============================================================ */

/* Launcher */
#widget-launcher {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  cursor: pointer;
}

#widget-launcher.hidden {
  display: none;
}

.launcher-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}

.launcher-btn:hover {
  transform: scale(1.05);
}

/* Panel */
#widget-panel {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 520px;
  height: 600px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 10000;
  overflow: hidden;
}

#widget-panel.hidden {
  display: none;
}

/* ============================================================
   Header
   ============================================================ */
.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #000;
  color: #fff;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.header-title {
  font-size: 14px;
  font-weight: 600;
}

.header-subtitle {
  font-size: 11px;
  color: #aaa;
}

.header-actions {
  display: flex;
  gap: 4px;
}

.header-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ============================================================
   Messages
   ============================================================ */
.widget-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
}

.message-wrapper.ai {
  align-items: flex-start;
}

.message-wrapper.user {
  align-items: flex-end;
}

.message-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.ai-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #000;
  display: inline-block;
}

.message-bubble {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.message-bubble.ai {
  background: #f5f5f5;
  color: #000;
  border-radius: 12px 12px 12px 4px;
}

.message-bubble.user {
  background: #1a1a1a;
  color: #fff;
  border-radius: 12px 12px 4px 12px;
}

.message-time {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
}

/* ============================================================
   Input Bar
   ============================================================ */
.widget-input {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  gap: 8px;
  flex-shrink: 0;
}

#message-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: inherit;
  background: transparent;
}

#message-input::placeholder {
  color: #999;
}

.send-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.send-btn:hover {
  background: #f0f0f0;
}

/* ============================================================
   Product Cards
   ============================================================ */
.product-cards {
  display: flex;
  gap: 12px;
  width: 100%;
}

.product-card {
  flex: 1;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 100px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-info {
  padding: 10px;
  flex: 1;
}

.product-name {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
}

.product-category {
  font-size: 11px;
  color: #888;
}

.product-stock {
  font-size: 11px;
  color: #888;
  margin-top: 2px;
}

.product-price {
  font-size: 16px;
  font-weight: 700;
  margin-top: 6px;
}

.price-currency {
  font-size: 11px;
  font-weight: 400;
  color: #888;
  margin-left: 2px;
}

.product-actions {
  padding: 8px 10px;
  display: flex;
  gap: 6px;
}

.buy-now-btn {
  flex: 1;
  padding: 8px 0;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.buy-now-btn:hover {
  background: #333;
}

.cart-icon-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cart-icon-btn:hover {
  background: #f5f5f5;
}

/* ============================================================
   Order Summary Card
   ============================================================ */
.order-card {
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
}

.order-product {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.order-product-image {
  width: 60px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.order-product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.order-product-info {
  flex: 1;
}

.order-product-name {
  font-size: 14px;
  font-weight: 600;
}

.order-product-category {
  font-size: 12px;
  color: #888;
}

.order-product-size {
  font-size: 12px;
  color: #888;
}

.order-product-price {
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.order-divider {
  height: 1px;
  background: #eee;
  margin: 12px 0;
}

.order-line {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 3px 0;
  color: #333;
}

.order-line.discount {
  color: #e67e22;
}

.order-line.total {
  font-weight: 700;
  font-size: 14px;
}

.order-shipping {
  margin-bottom: 12px;
}

.order-shipping-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.order-shipping-name {
  font-size: 13px;
  font-weight: 600;
}

.order-shipping-address,
.order-shipping-phone {
  font-size: 12px;
  color: #666;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.checkout-btn:hover {
  background: #333;
}

/* ============================================================
   Payment Success Card
   ============================================================ */
.payment-success-card {
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 24px;
  background: #fff;
  text-align: center;
}

.success-icon {
  margin-bottom: 12px;
}

.success-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
}

.success-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}
```

- [ ] **Step 3: Open browser, verify widget**

Run: `npx serve . -l 3000`

Open `http://localhost:3000`:
1. See a black circular launcher button at bottom-right
2. Click it — widget panel opens with header "Autopilot / Powered by Talkdesk"
3. AI welcome message appears: "Hi Alex — how can I help today?"
4. Input bar with "Ask anything..." placeholder visible at bottom
5. Click minimize — widget closes, launcher re-appears

- [ ] **Step 4: Test full flow**

In the widget:
1. Type "I'm looking for long-distance runners" → press Enter → AI text + 3 product cards appear
2. Click "Buy now" on Zenith Pro → user message "Let's go with the Zenith Pro." + order summary card
3. Type "I have already paid." → press Enter → payment success card with green checkmark

- [ ] **Step 5: Commit**

```bash
git add js/widget.js css/widget.css
git commit -m "feat: implement complete chat widget with product cards, order summary, and payment flow"
```

---

### Task 3: Visual Polish & Design Fidelity

**Files:**
- Modify: `css/widget.css`
- Modify: `js/widget.js`

This task is for fine-tuning visual details after the functional flow works. Compare each screen against the design images and adjust:

- [ ] **Step 1: Compare Screen 1 — Launcher**

Open `design/1-chat-widget-injector-customer-website.png`. Compare launcher position, size, and the minimized chat preview bubble. Adjust CSS as needed.

- [ ] **Step 2: Compare Screen 2 — Product Cards**

Open `design/2-ai-send-welcome-product-cards.png`. Compare:
- Card layout and spacing
- Product image area proportions
- Font sizes, weights, and colors
- "Buy now" button and cart icon alignment
- "In-stock" label placement (next to category, right-aligned)

Adjust CSS to match.

- [ ] **Step 3: Compare Screen 3 — Order Summary**

Open `design/3-contact-query-product.png`. Compare:
- Product thumbnail + info layout
- Price breakdown spacing and alignment
- Discount line color (orange)
- Shipping address block
- Checkout button style

Adjust CSS to match.

- [ ] **Step 4: Compare Screen 5 — Payment Success**

Open `design/5-contact-checkout-product.png`. Compare:
- Checkmark icon size and color
- Title and description text
- Card padding and spacing

Adjust CSS to match.

- [ ] **Step 5: Verify full flow visually**

Run through the complete flow once more, visually comparing each step against the design images.

- [ ] **Step 6: Commit**

```bash
git add css/widget.css js/widget.js
git commit -m "style: polish widget visuals to match design mockups"
```
