import { useState } from "react"

export interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp?: string
}

export function useAiChat(documentId: string) {
  const [messages, _setMessages] = useState<Message[]>([])
  const [streaming, setStreaming] = useState(false)

  async function send(userMessage: string) {
    setStreaming(true)
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ documentId, messages, userMessage }),
      })
      // Read SSE stream, append to messages
      if (res.body) {
        // Stream handling would go here
        // const reader = res.body.getReader()
        // ... stream handling
      }
    } finally {
      setStreaming(false)
    }
  }

  return { messages, send, streaming }
}