import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle, RefreshCw, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

interface AiAdvisorProps {
  platform: "google" | "apple";
}

const PRESET_QUESTIONS_GOOGLE = [
  "كيف أحصل على رقم D-U-N-S مجاناً للشركة؟",
  "ما هي شروط الـ 20 مختبراً للحساب الشخصي؟",
  "لماذا يرفض جوجل كشف الحساب البنكي لإثبات العنوان؟",
  "كيف أتجنب إغلاق الحساب بسبب ارتباطه بحسابات محظورة؟"
];

const PRESET_QUESTIONS_APPLE = [
  "كيف أسجل كشركة بدون بريد مجاني (Gmail) في آبل؟",
  "ما هي متطلبات مكالمة التفعيل الهاتفية من آبل للشركات؟",
  "كيف أسجل من تطبيق Apple Developer لتفادي الرفض؟",
  "هل يمكن نقل التطبيقات بين الحسابات الفردية وحسابات الشركات في آبل؟"
];

export default function AiAdvisor({ platform }: AiAdvisorProps) {
  const isGoogle = platform === "google";
  const presets = isGoogle ? PRESET_QUESTIONS_GOOGLE : PRESET_QUESTIONS_APPLE;

  const getWelcomeMessage = () => {
    if (isGoogle) {
      return "أهلاً بك! أنا مستشارك الذكي لمنصة جوجل بلاي للمطورين. 🧠\n\nيمكنني إرشادك خطوة بخطوة لكيفية صياغة بياناتك، وتوضيح المستندات المطلوبة لكل دولة عربية، وكيفية تصويرها بالشكل الذي يقبله الذكاء الاصطناعي الخاص بجوجل فوراً وبدون تعقيدات.\n\nتفضل بطرح أي سؤال أو اضغط على أحد الأسئلة الشائعة في الأسفل!";
    } else {
      return "أهلاً بك! أنا مستشارك الذكي لبرنامج مطوري آبل (Apple Developer Program). 🍎\n\nيمكنني إرشادك بالتفصيل حول إعداد الـ Apple ID والمصادقة الثنائية، وكيفية التسجيل الذاتي السريع من تطبيق الهاتف للأفراد، ومساعدتك في تلبية متطلبات الشركات الصارمة مثل رقم DUNS والبريد الإلكتروني المخصص ومكالمات التحقق الدولية.\n\nتفضل بطرح أي استفسار أو استخدم أحد الأسئلة المقترحة في الأسفل!";
    }
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset or change messages when platform changes
  useEffect(() => {
    setMessages([
      {
        role: "model",
        text: getWelcomeMessage()
      }
    ]);
  }, [platform]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Gather chat history (excluding the first welcome message for simplicity)
      const history = messages.slice(1).map((msg) => ({
        role: msg.role,
        text: msg.text
      }));

      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history,
          platform // Send selected platform to the backend!
        })
      });

      if (!response.ok) {
        throw new Error("فشل الاتصال بخادم المستشار الذكي.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "حدث خطأ غير متوقع أثناء مراسلة المستشار.");
    } finally {
      setIsLoading(false);
    }
  };

  // Styles based on platform
  const headerBg = isGoogle ? "from-blue-600 to-indigo-500" : "from-gray-900 via-gray-800 to-black";
  const botIconBg = isGoogle ? "bg-[#1A73E8]" : "bg-black";
  const userBubbleBg = isGoogle ? "bg-[#1A73E8]" : "bg-black";
  const ringColorFocus = isGoogle ? "focus:border-blue-500 focus:ring-blue-500" : "focus:border-black focus:ring-black";
  const btnActiveBg = isGoogle ? "bg-[#1A73E8] hover:bg-blue-700" : "bg-black hover:bg-gray-800";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[650px]" id="ai-advisor">
      {/* Header */}
      <div className={`p-6 bg-gradient-to-r ${headerBg} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-right">
            <h3 className="font-extrabold text-white text-sm sm:text-base">
              المستشار الذكي لحسابات {isGoogle ? "جوجل بلاي" : "مطور آبل"}
            </h3>
            <span className="text-[10px] text-green-300 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block animate-ping"></span> متصل ومدعوم بـ Gemini 2.5
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F8F9FA] custom-scrollbar flex flex-col">
        {messages.map((msg, idx) => {
          const isAi = msg.role === "model";
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 max-w-[85%] ${
                isAi ? "self-start text-right" : "self-end flex-row-reverse text-right"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isAi
                    ? `${botIconBg} text-white`
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  isAi
                    ? "bg-white border border-gray-200 text-gray-800 rounded-tr-none shadow-sm"
                    : `${userBubbleBg} text-white rounded-tl-none shadow-sm`
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex items-start gap-3 max-w-[85%] self-start text-right">
            <div className={`w-8 h-8 rounded-lg ${botIconBg} text-white flex items-center justify-center`}>
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 text-gray-500 rounded-tr-none flex items-center gap-2 shadow-sm">
              <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
              <span className="text-xs">جاري التفكير وصياغة الإجابة...</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Preset Questions */}
      <div className="p-4 bg-white border-t border-gray-200">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-2 pr-1">أسئلة مقترحة سريعة:</span>
        <div className="flex flex-wrap gap-2">
          {presets.map((q, idx) => (
            <button
              id={`preset-question-${idx}`}
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 disabled:opacity-50 text-gray-700 text-xs font-semibold text-right transition-colors border border-gray-200 hover:border-gray-300 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            id="advisor-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={`اسأل المستشار عن أي شيء يخص حساب ${isGoogle ? "جوجل بلاي" : "آبل"}...`}
            className={`flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm outline-none ${ringColorFocus} focus:bg-white focus:ring-1 transition-all placeholder:text-gray-400 text-right`}
          />
          <button
            id="send-message-btn"
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`px-5 py-3.5 ${btnActiveBg} disabled:opacity-50 text-white rounded-xl font-bold transition-all flex items-center justify-center shrink-0 active:scale-95 cursor-pointer`}
            aria-label="إرسال"
          >
            <Send className="w-4 h-4 transform rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
}
