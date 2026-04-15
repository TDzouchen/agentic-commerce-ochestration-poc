# Alex Chen Demo Flow — Design Spec

**Date:** 2026-04-14
**Scope:** Replace the current running-shoes demo flow with the Alex Chen work-shoes script. Reuse existing rich UI component styling, update data and content structure.

## Overview

Replace the 5-stage running-shoes POC demo with a 6-stage work-shoes flow for Alex Chen, a Gold Tier customer. The new flow demonstrates reactive discovery to frictionless transactional execution, including profile-aware recommendations, fit history alerts, product comparison, gold member discount confirmation, cart, and payment.

## Stage Flow

```
GREETING → RECOMMEND → COMPARE → CONFIRM_DISCOUNT → CHECKOUT → PAYMENT
```

| # | Stage | Trigger Keywords | AI Response | Rich UI Component |
|---|-------|-----------------|-------------|-------------------|
| 1 | `GREETING` | `work`, `shoe`, `comfortable`, `wide`, `budget`, `email`, `alex` | Welcome message, ask for email/preferences | None (text only) |
| 2 | `RECOMMEND` | `compare`, `shift runner`, `vault court`, `vs`, `difference`, `side-by-side` | Profile summary + Fit Alert + "Recommended for You" | **ProductCards** |
| 3 | `COMPARE` | `buy`, `shift runner`, `bone`, `order`, `purchase`, `like to buy` | "Here's a side-by-side comparison..." | **CompareProduct** |
| 4 | `CONFIRM_DISCOUNT` | `yes`, `sure`, `please`, `go ahead`, `confirm`, `ok` | "Great choice! As a gold member, you get 15% discount..." | None (text only) |
| 5 | `CHECKOUT` | Button click "Pay Now" (auto-sends message) | None | **OrderSummary** |
| 6 | `PAYMENT` | (terminal — demo ends, input disabled) | None | **PaymentSuccess** |

**Fallbacks per stage:**
1. GREETING: "I can help with footwear recommendations. Could you tell me what type of shoes you're looking for?"
2. RECOMMEND: "Would you like to compare any of these, or add one to your cart?"
3. COMPARE: "Would you like to add one of these to your cart?"
4. CONFIRM_DISCOUNT: "Would you like me to proceed with the order?"
5. CHECKOUT: "Let me know once you've completed the payment!"
6. PAYMENT: "Your order is confirmed!"

## Data

### Products (`products.js`)

| Field | Forge Derby | Vault Court Sneaker | Shift Runner |
|-------|------------|-------------------|--------------|
| id | 1 | 2 | 3 |
| name | Forge Derby | Vault Court Sneaker | Shift Runner |
| price | $575 | $390 | $420 |
| tags | `work`, `wide`, `fit` | `travel`, `wide`, `fit` | `travel`, `wide`, `fit` |
| availableColor | Noir | Ivory | Bone |
| owned | false | true (Ivory) | true (Bone) |
| ownershipNote | — | "You own this in Ivory — consider other colors for rotation." | "You own this in Bone — consider other colors for rotation." |
| image | FORGE-DERBY.png | VAULT-COURT-SNEAKER.png | SHIFT-RUNNER.png |
| description | Durable construction with all-day comfort for work. | Lightweight and cushioned for travel comfort. | Breathable and supportive for demanding days. |

### Comparison Attributes (Shift Runner vs Vault Court Sneaker)

| Attribute | Shift Runner | Vault Court Sneaker |
|-----------|-------------|-------------------|
| Price | $195 | $175 |
| Width | Wide | Wide |
| Toe Shape | Rounded toe | Rounded toe |
| Construction | Stitchdown construction | Vulcanized rubber sole |
| Break-in | Moderate break-in period | Minimal break-in period |
| All-day Comfort | 8+ hours | 6-8 hours |
| Weather | Weather-resistant leather upper | Weather-resistant canvas upper |
| Resolable | Yes, up to 3 years | No |
| Fit Risk | LOW | LOW |

**Fit Risk Assessment (below table):**
- Shift Runner: LOW — wide fit and you own this product without return.
- Vault Court Sneaker: LOW — wide fit and you own this product without return.

**Recommendation (below fit risk):**
- Shift Runner — Best for durability, resolability, and longer all-day comfort.
- Vault Court Sneaker — Better for casual wear and minimal break-in period.

### User Profile (`user.js`)

| Field | Value |
|-------|-------|
| name | Alex Chen |
| email | alex.chen@example.com |
| tier | Gold |
| size | US 10.5 |
| width | Wide |
| style | Technical, performance, minimal |
| discount | 15% |
| returns | 30-day returns |
| fitHistory | Carbon Loafer returned — "Too narrow across forefoot" — significant discomfort by end of day |

### Order

| Field | Value |
|-------|-------|
| product | Shift Runner |
| color | Bone |
| size | US 10.5 |
| subtotal | $420 |
| discount | 15% Gold member (-$63) |
| tax | $0 |
| shipping | Free |
| total | $357 |

## UI Component Changes

### TextMessage.jsx
No structural changes. Reused as-is.

### ProductCards.jsx
- Replace product data with 3 new work shoes
- Add **tags** display below product name (e.g., `work | wide | fit`)
- Add **available color** with checkmark (e.g., "Noir ✅")
- Add **ownership note** for owned products (italic text below availability)
- Update category/description text per product
- Keep "Buy now" button and cart icon button

### CompareProduct.jsx
- Update products to Shift Runner vs Vault Court Sneaker
- Expand comparison rows from 5 to 9 (Price, Width, Toe Shape, Construction, Break-in, All-day Comfort, Weather, Resolable, Fit Risk)
- Add **Fit Risk Assessment** section below the comparison table
- Add **Recommendation** section below Fit Risk Assessment
- Keep gradient "AI recommended" badge on Shift Runner (first product)

### OrderSummary.jsx
- Update product to Shift Runner in Bone, size US 10.5
- Update price: subtotal $420, Gold member 15% discount (-$63), total $357
- Rename button from "Checkout" to "Pay Now"
- Keep existing amber/gold discount line styling

### PaymentSuccess.jsx
- Update order details to match Shift Runner order
- Update shipping address for Alex Chen
- Update delivery date to a reasonable future date

## Conversation Hook Changes (`useConversation.js`)

- Update from 5 stages to 6 stages
- Stage indices: GREETING=0, RECOMMEND=1, COMPARE=2, CONFIRM_DISCOUNT=3, CHECKOUT=4, PAYMENT=5
- `handleBuyNow(product)`: Works at RECOMMEND stage (index 1), auto-generates "I would like to buy the {name} in {color}" — skips COMPARE, jumps to CONFIRM_DISCOUNT
- Keep `handleBuyNow` also working from COMPARE stage (index 2) for the "Buy now" buttons on comparison cards
- Rename `handleCheckout()` to `handlePayNow()`: Works at CHECKOUT stage (index 4), auto-generates payment confirmation message
- CONFIRM_DISCOUNT stage (index 3): Text-only AI response, no rich UI component, advances on keyword match

## AI Response Text

### GREETING (initial message, shown on widget open):
```
Hello! Welcome to Vault Noir AI Concierge. How can I assist you with your footwear needs today? If you have an email address, please provide it so I can access your profile and personalize your experience.
```

### RECOMMEND (after keyword match):
```
Welcome back, Alex! As a gold member, I've matched your preferences to our catalog.

**Your Profile**
• Size: US 10.5  |  Width: Wide  |  Style: Technical, performance, minimal
• Gold member — 30-day returns

⚠ **Fit Alert**
You returned the Carbon Loafer — "Too narrow across forefoot" — significant discomfort by end of day. I've excluded narrow-fit styles from your results.

**Recommended for You**
```
Then ProductCards component renders below.

### COMPARE:
```
Here's a side-by-side comparison of the Shift Runner and Vault Court Sneaker:
```
Then CompareProduct component renders below.

### CONFIRM_DISCOUNT:
```
Great choice! As a gold member, you get 15% discount. The Shift Runner is $420, and with your discount you save $63 — your price is **$357**. Shall I place the order for the Shift Runner in Bone with your discount applied?
```

### CHECKOUT:
No text. OrderSummary component renders.

### PAYMENT:
No text. PaymentSuccess component renders. Input disabled.

## Files to Modify

1. `src/data/products.js` — Replace 3 products with new data
2. `src/data/user.js` — Replace user profile and order data
3. `src/data/conversation.js` — Replace 5-stage flow with 6-stage flow
4. `src/hooks/useConversation.js` — Update state machine for 6 stages
5. `src/components/messages/ProductCards.jsx` — Add tags, availability, ownership notes
6. `src/components/messages/CompareProduct.jsx` — 9 attributes, fit risk, recommendation sections
7. `src/components/messages/OrderSummary.jsx` — Update data, rename button to "Pay Now"
8. `src/components/messages/PaymentSuccess.jsx` — Update order details
9. `src/components/MessageList.jsx` — Ensure componentMap still works (no changes expected)

## No Changes Expected

- `App.jsx`, `ChatBubble.jsx`, `ChatWidget.jsx`, `ChatHeader.jsx`, `MessageInput.jsx` — No changes
- `src/data/config.js` — No changes
- `src/index.css` — No changes
- Background image (`1-bg.png`) — No changes
