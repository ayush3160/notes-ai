import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ChatSummary() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I can help summarize your notes." },
  ]);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Here’s a quick summary of your notes." },
      ]);
    }, 1000);

    setInput("");
  }

  return (
    <div className="flex flex-col">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 max-h-[calc(97vh-100px)]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-600 items-end ml-auto text-white"
                : "bg-gray-600 self-start ml-1"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center border-t pt-2 fixed bottom-0 w-full py-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask something..."
          className="flex-1 p-2 border rounded mx-1"
        />
        <Button
          onClick={handleSend}
          className="bg-blue-600 text-white mr-1 px-3 py-2 rounded hover:bg-blue-700"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
