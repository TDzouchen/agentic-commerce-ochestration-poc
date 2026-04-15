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
      'Great choice! As a gold member, you get ~~15%~~ discount. The Shift Runner is $420, and with your discount you save **$63** — your price is **$357**. Shall I place the order for the Shift Runner in Bone with your discount applied?',
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
