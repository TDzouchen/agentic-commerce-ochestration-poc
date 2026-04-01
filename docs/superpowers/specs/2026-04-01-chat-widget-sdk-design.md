# Chat Widget JS-SDK Design Spec

## Overview

A local chat widget JS-SDK POC that simulates the complete flow from opening a chat to placing a product order. Pure frontend implementation with no backend dependencies, driven by keyword-based intent matching.

## Project Structure

```
agentic-commerce-ochestration/
├── design/                    # Design mockups (existing)
├── docs/superpowers/specs/    # Design documents
├── index.html                 # Host page + Widget entry point
├── css/widget.css             # Widget styles
├── js/widget.js               # Widget logic + intent matching + mock data
└── assets/                    # Asset placeholders (logo, product images, etc.)
```

- `index.html`: Host page with background image placeholder, imports CSS and JS
- `css/widget.css`: All widget styles
- `js/widget.js`: Widget core logic, intent matching, and mock data in a single file

## Widget UI Components

### Shell

- **Launcher**: Floating button at bottom-right corner, click to open widget
- **Header**: "Autopilot" + "Powered by Talkdesk" + minimize/fullscreen/more buttons
- **Message area**: Scrollable conversation container
- **Input bar**: Text input with "Ask anything..." placeholder + send button

### Message Types

1. **AI message**: Left-aligned, with "AI Assistant" label + avatar icon
2. **User message**: Right-aligned, dark bubble with white text
3. **Product card list**: 3 cards in horizontal layout
   - Each card contains: product image (placeholder), name, category, stock status ("In-stock"), price, "Buy now" button + cart icon
4. **Order summary card**:
   - Product thumbnail + name + category + size
   - Price breakdown: Subtotal, Estimated Tax, Estimated shipping, Gold member 15% discount (orange), Total
   - Shipping address: name, address, phone
   - Checkout button (black)
5. **Payment success card**:
   - Green checkmark icon
   - "Your payment was successful" title
   - "Your order has been placed successfully. We'll process it shortly and send you a confirmation email with details" description
6. **Timestamps**: Displayed below messages (e.g., 10:30 AM)

## Interaction Flow

### Main Flow

| Step | State | Trigger | Response |
|------|-------|---------|----------|
| 1 | `welcome` | Click launcher | AI: "Hi Alex — how can I help today?" |
| 2 | `product_query` | User types and sends message containing product-related keywords (e.g., "running", "shoes") | AI: Recommendation text + 3 product cards |
| 3 | `product_selected` | User clicks "Buy now" on a product card | Auto-sends "Let's go with the {product name}." + AI: Order summary card |
| 4 | `checkout` | User clicks "Checkout" button | Waits for user to manually type and send message containing keywords like "paid" → AI: Payment success card |

### Intent Matching

- Keyword **contains matching** (exact match not required)
- State machine progression: `welcome → product_query → product_selected → checkout → completed`
- Each state has a set of keywords; if user input contains any keyword, the flow advances to the next step
- Fallback message returned when no keyword is matched

## Mock Data

### Products

| Field | Zenith Pro | RU MAX 350 | AIRSC SPEEDCROSS |
|-------|-----------|------------|-----------------|
| Name | Zenith Pro | RU MAX 350 | AIRSC SPEEDCROSS |
| Category | Performance Running Shoes | Performance Running Shoes | Performance Running Shoes |
| Price | $135 USD | $128 USD | $150 USD |
| Stock | In-stock | In-stock | In-stock |
| Image | assets/zenith-pro.png | assets/ru-max-350.png | assets/airsc-speedcross.png |

### Order

- Size: US Men's 10
- Subtotal: $135
- Estimated Tax: $5
- Estimated shipping: Free
- Gold member 15% discount: -$18
- Total: $122

### User

- Name: ALEX M.
- Address: 2118 Thornridge Cir, Syracuse, Connecticut 35624
- Phone: (209) 555-0104

## Style Guide

### Colors

| Element | Color |
|---------|-------|
| Widget background | White (#FFFFFF) |
| Header background | Black (#000000) |
| Header text | White (#FFFFFF) |
| User message bubble | Dark gray/black (#1A1A1A) |
| User message text | White (#FFFFFF) |
| AI message text | Black (#000000) |
| Buy now button | Black background + white text |
| Checkout button | Black background + white text |
| Gold member discount | Orange |
| Payment success checkmark | Green |

### Layout

- Widget panel: Floating at bottom-right, fixed width/height, rounded corners, drop shadow
- Product cards: 3-column horizontal layout, equal width, cards with light gray border and rounded corners
- Order summary: Single-column card, price info left-right aligned
- Message area scrollable, auto-scrolls to bottom on new messages

### Typography

System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

## Asset Placeholders

All image assets (logo, product images, etc.) use paths under the `assets/` directory. Placeholder blocks will be used until actual assets are provided.

## Technical Constraints

- Pure HTML/CSS/JS, zero dependencies
- Runs via HTTP server (e.g., `npx serve`)
- No build tools required
- No backend or AI API integration
