"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Languages, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Language = "English" | "Hindi" | "Bengali" | "Nepali";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("English");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your NatureStay assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(m => ({ role: m.role, content: m.content })),
          language: language
        })
      });

      const data = await res.json();

      let response = "";
      if (data.fallback || data.error) {
        // Basic fallback logic if OpenAI is not configured
        const lowerInput = currentInput.toLowerCase();
        if (lowerInput.includes("price") || lowerInput.includes("cost")) {
          response = "Our stays range from ₹3,800 to ₹7,500 per night depending on the property and season.";
        } else if (lowerInput.includes("location") || lowerInput.includes("where")) {
          response = "We are located in the beautiful North Bengal hill stations, surrounded by lush forests and mountain views.";
        } else if (lowerInput.includes("food") || lowerInput.includes("meal")) {
          response = "We serve authentic local organic food. Breakfast is included in most stays!";
        } else if (lowerInput.includes("book")) {
          response = "You can book directly via WhatsApp from any property page. Just select your dates and click 'Book via WhatsApp'!";
        } else {
          response = "That's a great question! For specific details about our homestay and availability, I recommend checking our stays page or messaging us on WhatsApp for a quick response.";
        }

        // Language adaptation (UI level mock for fallback)
        if (language === "Hindi") response = "[Hindi] " + response;
        if (language === "Bengali") response = "[Bengali] " + response;
        if (language === "Nepali") response = "[Nepali] " + response;
      } else {
        response = data.content;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const languages: Language[] = ["English", "Hindi", "Bengali", "Nepali"];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] flex flex-col"
          >
            <Card className="flex-1 shadow-2xl border-primary/20 overflow-hidden flex flex-col rounded-3xl">
              <CardHeader className="bg-primary text-white p-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">AI Assistant</CardTitle>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-[10px] text-white/70">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <PopoverMenu
                     languages={languages}
                     current={language}
                     onSelect={setLanguage}
                   />
                   <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-8 w-8"
                    onClick={() => setIsOpen(false)}
                   >
                     <X className="w-4 h-4" />
                   </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/10">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-2 max-w-[85%]",
                      m.role === "user" ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1",
                      m.role === "assistant" ? "bg-primary text-white" : "bg-earth-brown text-white"
                    )}>
                      {m.role === "assistant" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm",
                      m.role === "assistant"
                        ? "bg-white text-foreground rounded-tl-none border border-border"
                        : "bg-primary text-white rounded-tr-none"
                    )}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-border">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              <CardFooter className="p-3 bg-white border-t border-border">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex w-full gap-2"
                >
                  <input
                    placeholder="Type your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-secondary/50 border-none rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button type="submit" size="icon" className="rounded-xl h-10 w-10 shrink-0" disabled={!input.trim() || isLoading}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-white p-0 overflow-hidden group"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-primary"></span>
          </div>
        )}
      </Button>
    </div>
  );
};

// Simplified Popover for Language Selection
const PopoverMenu = ({ languages, current, onSelect }: { languages: Language[], current: Language, onSelect: (l: Language) => void }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/10 h-8 w-8"
        onClick={() => setShow(!show)}
      >
        <Languages className="w-4 h-4" />
      </Button>
      {show && (
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-border p-1 w-32 z-50 overflow-hidden">
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => { onSelect(lang); setShow(false); }}
              className={cn(
                "w-full text-left px-3 py-2 text-xs font-medium hover:bg-primary/5 rounded-lg transition-colors",
                current === lang ? "text-primary bg-primary/10" : "text-foreground/70"
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIChat;
