# UI Polish Changelog — Apr 7, 2026

## Summary

Batch of visual refinements to align the chat widget with Figma design specs. Covers border-radius standardization, padding/spacing, button sizing, color unification, input shadow, SVG updates, and miscellaneous fixes across all card components.

## Changes

### 1. Global Border-Radius Standardization

| Element | Before | After |
|---------|--------|-------|
| Card outer corners (ProductCards, CompareProduct, OrderSummary, PaymentSuccess) | `rounded-2xl` / `rounded-xl` (16px / 12px mixed) | `rounded-[12px]` (12px) |
| Image containers | `rounded-xl` (12px) | `rounded-[8px]` (8px) |
| Input field (MessageInput, ChatBubble) | `rounded-full` | `rounded-[12px]` (12px) |

**Files:** `ProductCards.jsx`, `CompareProduct.jsx`, `OrderSummary.jsx`, `PaymentSuccess.jsx`, `MessageInput.jsx`, `ChatBubble.jsx`

### 2. Card Padding & Spacing

- **ProductCards** inner padding: `p-3` (12px) → `p-4` (16px)
- **CompareProduct** inner product cards: `p-3` → `p-4` (16px)
- **OrderSummary** outer padding: `p-6` (24px) → `p-4` (16px)
- **MessageList** container horizontal padding: `px-6` (24px) → `px-15` (60px)

**Files:** `ProductCards.jsx`, `CompareProduct.jsx`, `OrderSummary.jsx`, `MessageList.jsx`

### 3. Button Height Normalization

| Component | Button | Before | After |
|-----------|--------|--------|-------|
| ProductCards | Buy now | 40px | 30px |
| ProductCards | Cart icon | 40×40px | 30×30px |
| CompareProduct | Buy now | 40px | 36px |
| OrderSummary | Checkout | 40px | 36px |

**Files:** `ProductCards.jsx`, `CompareProduct.jsx`, `OrderSummary.jsx`

### 4. Image Background Unification

All product image container backgrounds unified to `#F5F5F5`:

| Component | Before | After |
|-----------|--------|-------|
| ProductCards | `#F3F4F6` | `#F5F5F5` |
| OrderSummary | `#F3F4F6` | `#F5F5F5` |
| CompareProduct | `bg-gray-100` | `#F5F5F5` |
| PaymentSuccess | `bg-gray-50` | `#F5F5F5` |

**Files:** `ProductCards.jsx`, `OrderSummary.jsx`, `CompareProduct.jsx`, `PaymentSuccess.jsx`

### 5. Card Width Alignment

CompareProduct and PaymentSuccess cards now both use `w-4/5` (80%) fixed width (previously `maxWidth: '80%'`), ensuring identical rendered width regardless of content.

**Files:** `CompareProduct.jsx`, `PaymentSuccess.jsx`

### 6. Input Area Updates

- Removed `border-t border-gray-100` separator line above input
- Added Figma-spec box shadow: `shadow-[0px_2px_4px_-1px_rgba(7,16,32,0.06),0px_4px_8px_0px_rgba(7,16,32,0.08)]`
- Replaced send button SVG with Figma version; stroke uses `currentColor` for white-on-dark rendering

**File:** `MessageInput.jsx`

### 7. AI Text Message Area

Removed `max-w-lg` constraint on AI response text, allowing content to expand rightward and align with the full content area.

**File:** `TextMessage.jsx`

### 8. Discount Divider Color

The divider below "Gold member 15% discount" changed from `border-gray-200` / `border-amber-100` to `border-[#D48806]`, matching the discount text color.

**Files:** `OrderSummary.jsx`, `PaymentSuccess.jsx`

### 9. Size Display Fix

- Split `order.size` (`'US Mens: 10'`) into `order.size` (`'US Mens'`) + `order.sizeValue` (`'10'`)
- Display now reads: **Size (US Mens): 10**

**Files:** `user.js`, `OrderSummary.jsx`, `PaymentSuccess.jsx`

### 10. Inline Style → Tailwind CSS Migration

Converted all modified inline styles to Tailwind utility classes:

| Pattern | Tailwind |
|---------|----------|
| `style={{ height: '180px' }}` | `h-[180px]` |
| `style={{ width: '30px', height: '30px' }}` | `w-[30px] h-[30px]` |
| `style={{ maxWidth: '480px' }}` | `max-w-[480px]` |
| `style={{ color: '#D48806' }}` | `text-[#D48806]` |
| `style={{ width: '80%' }}` | `w-4/5` |
| `style={{ borderTop: '1px solid #D48806' }}` | `border-t border-[#D48806]` |

### 11. Miscellaneous

- **Page title** updated to "Pixel Perfect (Trust Me) - Apr 7, 2026"
- **Favicon** replaced with Talkdesk brand icon from CDN

**File:** `index.html`

## Files Changed (12 total)

```
index.html
src/assets/images/RU-MAX-350.png
src/assets/images/Zenith-Pro.png
src/components/ChatBubble.jsx
src/components/MessageInput.jsx
src/components/MessageList.jsx
src/components/messages/CompareProduct.jsx
src/components/messages/OrderSummary.jsx
src/components/messages/PaymentSuccess.jsx
src/components/messages/ProductCards.jsx
src/components/messages/TextMessage.jsx
src/data/user.js
```

## Commits

| Hash | Message |
|------|---------|
| `38870c1` | style: polish widget UI to match Figma design specs |
| `102b471` | chore: update page title to 'Pixel Perfect (Trust Me) - Apr 7, 2026' |
| `9aa5597` | chore: replace favicon with Talkdesk brand icon |
