import { useState, useCallback } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ChatArea from "@/components/chat/ChatArea";
import { Message, CardType } from "@/components/chat/ChatMessage";
import { todayData } from "@/lib/mockData";

const mockResponses: Record<string, { content: string; cards?: CardType[] }> = {
  "How productive was I today?": {
    content: `You've had a decent day! Your focus score is ${todayData.focusScore}/100. Here's a quick breakdown:`,
    cards: [
      { kind: "focus-score" },
      { kind: "app-usage" },
    ],
  },
  "Where am I wasting time?": {
    content: "Looking at your app usage, here are some areas where you could improve:",
    cards: [
      { kind: "app-usage" },
      { kind: "insight", type: "warning", title: "Instagram overuse", description: "You spent 68 minutes on Instagram today — that's 22% of your screen time." },
      { kind: "insight", type: "tip", title: "Try a focus block", description: "Block social media from 9 AM – 12 PM to boost your morning productivity." },
    ],
  },
  "Show my focus score": {
    content: "Here's your focus score for today along with your weekly trend:",
    cards: [
      { kind: "focus-score" },
      { kind: "weekly-trend" },
    ],
  },
  "Give me a focus tip": {
    content: "Here are some personalized tips based on your usage patterns:",
    cards: [
      { kind: "insight", type: "tip", title: "The 2-minute rule", description: "If a task takes less than 2 minutes, do it immediately instead of switching to a distracting app." },
      { kind: "insight", type: "positive", title: "Your best hours", description: "You're most focused between 10 AM – 1 PM. Schedule deep work during this window." },
      { kind: "insight", type: "warning", title: "Late night scrolling", description: "Your peak distraction is 9–11 PM. Consider setting a screen time limit after 9 PM." },
    ],
  },
};

const defaultResponse: { content: string; cards?: CardType[] } = {
  content: "I can help you understand your focus patterns! Try asking about your productivity, where you're wasting time, your focus score, or ask for a focus tip.",
  cards: [
    { kind: "insight", type: "tip", title: "Quick tip", description: "Start by checking your focus score to see how your day is going." },
  ],
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback((content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const response = mockResponses[content] || defaultResponse;
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        cards: response.cards,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <ChatArea messages={messages} isLoading={isLoading} onSend={handleSend} />
      </main>
    </div>
  );
};

export default ChatPage;
