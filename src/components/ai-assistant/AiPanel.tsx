import { useState } from "react"
import { Send, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp?: string
}

export function AiPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "user",
      content: "What is the primary impact mentioned on Amazon species?",
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: "2",
      type: "assistant",
      content: 'Based on page 14 of "Global Biodiversity Decline...", the primary impact is accelerated species extinction rates, particularly affecting endemic birds and primates, due to rapid primary forest loss in the Amazon Basin (estimated at 1.8 million hectares annually).',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: "3",
      type: "assistant",
      content: '[Highlighted: "The rapid loss of primary forests in the Amazon Basin, endemic species extinction rates, particularly affecting endemic birds and primates."]',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "This is a sample AI response. In a real implementation, this would connect to your backend API.",
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
            AI
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              AI Research Assistant
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ask anything about documents
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          title="More options"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  AI
                </div>
              )}

              <div
                className={`max-w-xs lg:max-w-sm px-3 py-2 rounded-lg text-sm leading-relaxed ${
                  message.type === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                {message.content.includes("[Highlighted:") ? (
                  <>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Highlighted text:
                    </p>
                    <p className="text-xs bg-yellow-100 dark:bg-yellow-900 bg-opacity-30 px-2 py-1 rounded border border-yellow-200 dark:border-yellow-700">
                      {message.content.replace("[Highlighted: ", "").replace('"]', "")}
                    </p>
                  </>
                ) : (
                  message.content
                )}
              </div>

              {message.type === "user" && (
                <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs font-bold">
                  U
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                AI
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Ask a question..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="text-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Relevant Options */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p className="font-semibold mb-2">Relevant options</p>
          <div className="space-y-1">
            <button className="block text-left text-blue-600 dark:text-blue-400 hover:underline text-xs max-h-8 overflow-hidden text-ellipsis">
              • What are the economic impacts?
            </button>
            <button className="block text-left text-blue-600 dark:text-blue-400 hover:underline text-xs max-h-8 overflow-hidden text-ellipsis">
              • Which species are most affected?
            </button>
            <button className="block text-left text-blue-600 dark:text-blue-400 hover:underline text-xs max-h-8 overflow-hidden text-ellipsis">
              • What are proposed solutions?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
