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
