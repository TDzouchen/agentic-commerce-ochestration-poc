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
      'Ready to checkout? Or would you like to compare this with another product first?',
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
      'Your order is confirmed! Is there anything else I can help you with?',
  },
}

export const greetingMessage = {
  type: 'ai',
  text: 'Hi Alex — how can I help today?',
  component: null,
}
