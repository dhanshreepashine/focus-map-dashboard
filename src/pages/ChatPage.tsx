import { useState, useCallback } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ChatArea from "@/components/chat/ChatArea";
import { Message, CardType } from "@/components/chat/ChatMessage";
import { supabase } from "@/integrations/supabase/client";

const SUGGESTION_CARDS: Record<string, CardType[]> = {
  productive: [{ kind: "focus-score" }, { kind: "app-usage" }],
  wasting: [{ kind: "app-usage" }, { kind: "insight", type: "warning", title: "High distraction pattern", description: "Your behavioral data shows elevated distraction counts in the evenings. Consider a screen-free wind-down routine." }],
  score: [{ kind: "focus-score" }, { kind: "weekly-trend" }],
  tip: [
    { kind: "insight", type: "tip", title: "Protect your peak hours", description: "Your focus data shows you perform best in the morning. Block distracting apps before noon." },
    { kind: "insight", type: "positive", title: "Progress matters", description: "Small daily improvements compound into big results over weeks." },
  ],
};

function pickCards(message: string): CardType[] | undefined {
  const m = message.toLowerCase();
  if (m.includes("productive") || m.includes("today")) return SUGGESTION_CARDS.productive;
  if (m.includes("wasting") || m.includes("distract")) return SUGGESTION_CARDS.wasting;
  if (m.includes("score") || m.includes("weekly")) return SUGGESTION_CARDS.score;
  if (m.includes("tip") || m.includes("advice") || m.includes("suggest")) return SUGGESTION_CARDS.tip;
  return undefined;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/focusai-chat`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          "Apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ message: content }),
      });

      let responseText = "I'm having a moment — try asking me again shortly!";
      if (response.ok) {
        const data = await response.json();
        responseText = data.message || responseText;
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        cards: pickCards(content),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having a moment — try asking me again shortly!",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
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
