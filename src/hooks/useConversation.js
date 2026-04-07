import { useState, useCallback } from 'react'
import { stages, greetingMessage } from '../data/conversation'
import { config } from '../data/config'

const STAGE_ORDER = ['GREETING', 'COMPARE', 'ORDER', 'CHECKOUT', 'PAYMENT']

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
      if (currentStage !== 'ORDER') return

      const userMsg = { type: 'user', text: `I'd like to order the ${product.name}.` }
      setMessages((prev) => [...prev, userMsg])
      const nextIndex = stageIndex + 1
      setStageIndex(nextIndex)
      addAiResponse(nextIndex)
    },
    [currentStage, stageIndex, isTyping, addAiResponse]
  )

  const handleCheckout = useCallback(() => {
    if (isTyping) return
    if (currentStage !== 'CHECKOUT') return

    const userMsg = { type: 'user', text: 'I have already paid.' }
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
    handleCheckout,
  }
}
