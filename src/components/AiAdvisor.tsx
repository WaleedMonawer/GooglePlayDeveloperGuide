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
      console.warn("API Error, falling back to local responsive guide engine:", err);
      
      // Highly-detailed offline fallback answers
      const lowerText = textToSend.toLowerCase();
      let localAnswer = "";
      
      if (isGoogle) {
        if (lowerText.includes("duns") || lowerText.includes("دانز") || lowerText.includes("d-u-n-s") || lowerText.includes("شركة")) {
          localAnswer = `رقم الـ D-U-N-S (مؤسسة Dun & Bradstreet) إلزامي تماماً لحسابات الشركات في جوجل بلاي.
إليك طريقة الحصول عليه مجاناً:
1. اذهب لموقع Dun & Bradstreet الرسمي لطلب رقم DUNS للمطورين.
2. أدخل السجل التجاري لشركتك وتأكد من مطابقة الاسم بالإنجليزية حرفياً لما هو مكتوب في شهادة التسجيل.
3. يستغرق الاستخراج المجاني من 5 إلى 30 يوماً. وتأكد من كتابة البريد الرسمي للشركة والهاتف الفعال.
4. بمجرد استلام الرقم، انتظر من 3 إلى 5 أيام عمل حتى تقوم أنظمة جوجل بمزامنة قاعدة البيانات مع D&B قبل محاولة إدخاله في الكونسول لتفادي خطأ عدم التطابق.`;
        } else if (lowerText.includes("مختبر") || lowerText.includes("20") || lowerText.includes("تجربة") || lowerText.includes("فحص")) {
          localAnswer = `شرط الـ 20 مختبراً هو أكبر عقبة تواجه المطورين الأفراد في كونسول جوجل بلاي الجديد:
1. الشروط: يجب أن يشترك 20 شخصاً حقيقياً في اختبار تطبيقك المغلق (Closed Testing) دفعة واحدة.
2. الاستمرارية: يجب أن يظلوا مسجلين ومثبتين للتطبيق على هواتفهم لمدة 14 يوماً متواصلة دون انقطاع.
3. التفاعل: يفضل تفاعلهم البسيط اليومي لضمان جودة الاختبار وإقناع خوارزميات جوجل.
4. كيف تتجاوز ذلك؟ يمكنك الاستعانة بأصدقائك، مجموعات المطورين، أو الاستعانة بخدمات مخصصة موثوقة لتوفير المختبرين وتجنب رفض النشر النهائي.`;
        } else if (lowerText.includes("بنك") || lowerText.includes("كشف") || lowerText.includes("عنوان") || lowerText.includes("هوية") || lowerText.includes("وثائق")) {
          localAnswer = `الرفض بسبب كشف الحساب البنكي أو إثبات العنوان شائع جداً بسبب التفاصيل الصغيرة. اتبع القواعد الذهبية للقبول:
1. مطابقة الاسم والعنوان: يجب أن يتطابق الاسم المدخل في حقل حساب المطور مع الاسم المكتوب في كشف الحساب البنكي حرفياً (مثال: Waleed Al-Monawer).
2. لغة المستند: يجب أن يكون كشف الحساب باللغة الإنجليزية ومستخرجاً بصيغة PDF أصلية من تطبيق بنكك (لا تصور شاشة الهاتف).
3. الحداثة: لا تتجاوز مدة إصدار كشف الحساب 90 يوماً.
4. العنوان: يجب أن تظهر تفاصيل العنوان (المدينة، الشارع، الرمز البريدي) وتطابق بيانات جوجل تماماً.`;
        } else if (lowerText.includes("حظر") || lowerText.includes("اغلاق") || lowerText.includes("إغلاق") || lowerText.includes("مرتبط")) {
          localAnswer = `سياسة "الحسابات المرتبطة" (Associated Accounts) هي أكثر سبب يتم بموجبه إغلاق الحسابات الجديدة فوراً:
1. لتفادي ذلك: إذا كنت تمتلك حساباً سابقاً تم حظره، فلا تفتح حساباً جديداً من نفس جهاز الكمبيوتر، أو نفس شبكة الواي فاي (IP)، أو نفس رقم الهاتف، أو نفس بطاقة الدفع.
2. تتبع البصمة الرقمية: تستخدم جوجل الذكاء الاصطناعي لربط الحسابات عبر المعرفات مثل الماك أدريس لجهازك، بصمة المتصفح (Browser Fingerprint)، وملفات كوكيز المتصفح.
3. الحل السليم: استخدم جهازاً جديداً كلياً، شريحة إنترنت مخصصة (4G/5G) غير مشتركة، بطاقة دفع ببيانات جديدة كلياً، ورقم هاتف نظيف تماماً لم يستخدم من قبل.`;
        } else if (lowerText.includes("هاتف") || lowerText.includes("رقم") || lowerText.includes("اتصال") || lowerText.includes("جوال")) {
          localAnswer = `كتابة رقم الهاتف في حساب مطور جوجل تخضع لقواعد دولية صارمة:
1. الصيغة الصحيحة: اكتب الرمز الدولي يليه رقم هاتفك مباشرة بدون أصفار إضافية (مثال: +966501234567).
2. الشروط: يجب أن يكون رقم جوالك مسجلاً باسمك لدى شركة الاتصالات بشكل رسمي، لتفادي الرفض عند طلب مستندات ملكية الخط.
3. الاستخدام: لا تستخدم رقماً سبق ربطه بحساب مطور تم حظره أو تعليقه لكي لا يتم ربط الحسابات وإغلاق حسابك الجديد.
4. تأكد من قدرة الرقم على استقبال الرسائل الدولية فوراً لتلقي رمز التوثيق (OTP).`;
        } else if (lowerText.includes("دفع") || lowerText.includes("بطاقة") || lowerText.includes("فيزا") || lowerText.includes("مستر") || lowerText.includes("رسوم")) {
          localAnswer = `تنبيهات دفع رسوم جوجل بلاي (25$ لمرة واحدة):
1. نوع البطاقة: يجب أن تكون بطاقة ائتمانية حقيقية (Credit Card) أو بطاقة خصم مباشر (Debit Card) تدعم المشتريات الدولية عبر الإنترنت.
2. الاسم المكتوب: يجب أن يكون اسم حامل البطاقة مطابقاً تماماً لاسم صاحب حساب المطور المدخل في الطلب.
3. قيود البطاقات: تجنب تماماً استخدام بطاقات الدفع الافتراضية (Virtual Cards) مثل أبل باي المؤقت، أو البطاقات مسبقة الدفع مجهولة الهوية، حيث تعتبرها جوجل احتيالاً وتغلق الحساب فوراً.
4. تأكد من وجود رصيد كافٍ (لا يقل عن 30$) وتفعيل الشراء الدولي قبل التقديم.`;
        } else {
          localAnswer = `أهلاً بك! يرجى اتباع الشروط الذهبية لفتح حساب مطور جوجل بلاي:
1. دفع رسوم $25 لمرة واحدة ببطاقة فيزا/ماستركارد حقيقية باسمك الشخصي.
2. مطابقة اسمك وعنوانك في الكونسول مع مستندات الهوية وكشف الحساب البنكي حرفاً بحرف.
3. تفعيل التحقق بخطوتين (2-Step Verification) على حساب جوجل قبل بدء الإعداد.
4. استخدام هاتف حقيقي ونظيف لتلقي رمز التحقق، والابتعاد عن العناوين والبطاقات الوهمية لتفادي الحظر الفوري بسبب الحسابات المرتبطة.`;
        }
      } else {
        // Apple Fallback
        if (lowerText.includes("duns") || lowerText.includes("دانز") || lowerText.includes("d-u-n-s") || lowerText.includes("شركة")) {
          localAnswer = `رقم الـ D-U-N-S هو حجر الأساس للتسجيل كشركة أو مؤسسة في برنامج مطوري آبل:
1. مجاني بالكامل: يمكنك طلبه عبر موقع D&B المخصص لمطوري آبل.
2. الشروط: يجب تطابق اسم شركتك المسجل بالإنجليزية مع الاسم المسجل في السجل التجاري والـ DUNS بنسبة 100%.
3. الموقع والبريد: ترفض آبل الشركات التي لا تمتلك موقعاً إلكترونياً نشطاً وموثقاً، أو تستخدم بريداً مجانياً (مثل Gmail). يجب أن يكون بريدك مخصصاً بنطاق شركتك (مثال: admin@yourcompany.com).
4. تفعيل الرقم: بمجرد استلام الـ DUNS، انتظر 7 أيام حتى تقوم آبل بتحديث قواعد بياناتها قبل استخدامه في التسجيل لتجنب خطأ الرفض التلقائي.`;
        } else if (lowerText.includes("هاتف") || lowerText.includes("رقم") || lowerText.includes("اتصال") || lowerText.includes("مكالمة")) {
          localAnswer = `مكالمة التحقق من آبل وكتابة رقم الهاتف:
1. صيغة الهاتف: أدخل رقم الجوال بصيغته الدولية النظيفة التي تبدأ بـ (+) ثم رمز الدولة ورقم الهاتف بدون الصفر الأول (مثل: +966501234567).
2. مكالمة التحقق للشركات: بمجرد إرسال طلب تفعيل الشركة، سيقوم موظف من دعم آبل (غالباً من أيرلندا أو الولايات المتحدة) بالاتصال برقم هاتفك المسجل.
3. المتحدث واللغة: يجب أن يكون المتحدث متمكناً من الإنجليزية ولديه تفويض كامل بالحديث باسم الشركة لتأكيد منصبك وغرض الحساب.
4. فشل المكالمة: تجاهل الاتصال أو تقديم هاتف مغلق يؤدي لتعليق الطلب بشكل كامل وإلغاء المعاملة المالية. ابقَ متيقظاً وجاهزاً للاتصال الهاتفي الدولي.`;
        } else if (lowerText.includes("تطبيق") || lowerText.includes("آيفون") || lowerText.includes("هاتف") || lowerText.includes("developer")) {
          localAnswer = `إذا كنت تسجل كفرد (Individual)، فإن آبل تلزمك بالتسجيل عبر تطبيق "Apple Developer" على الآيفون أو الآيباد:
1. الطريقة: قم بتحميل التطبيق من متجر App Store، وسجل الدخول بحساب الـ Apple ID الخاص بك.
2. التفعيل الأمني: يجب تفعيل المصادقة الثنائية (Two-Factor Authentication) على الـ Apple ID وجهازك أولاً.
3. التوثيق المباشر: التسجيل عبر التطبيق يوفر تحققاً حيوياً فائق السرعة عبر الكاميرا والـ Face ID وتصوير الهوية، ويتم قبول الحساب الفردي وتنشيطه تلقائياً خلال دقائق من الدفع مقارنة بالتسجيل الويب الذي قد يستغرق أسابيع للتحقق اليدوي.`;
        } else if (lowerText.includes("دفع") || lowerText.includes("بطاقة") || lowerText.includes("فيزا") || lowerText.includes("مستر") || lowerText.includes("رسوم") || lowerText.includes("سنويا")) {
          localAnswer = `رسوم مطور آبل هي 99 دولاراً تدفع سنوياً لتجنب تعطيل تطبيقاتك على المتجر:
1. نوع البطاقة: يجب أن تكون بطاقة ائتمانية دولية تدعم ميزة الدفع المتكرر والمستمر (Recurring Payments).
2. الاسم والبيانات: يجب أن تتطابق بيانات الفوترة (Billing Address) للبطاقة والاسم المطبوع عليها مع اسم وعنوان حساب مطور آبل المدخل بالطلب لتفادي الإغلاق المباشر للاشتباه الأمني.
3. قيود آبل الشديدة: يمنع استخدام بطاقات الدفع الافتراضية المؤقتة، أو بطاقة شخص آخر، أو بطاقة من بلد يختلف عن بلد حساب الـ Apple ID المختار.`;
        } else {
          localAnswer = `أهلاً بك! يرجى الالتزام بالخطوات المعتمدة للتسجيل في برنامج مطوري آبل بنجاح:
1. تفعيل التحقق بخطوتين (2FA) لـ Apple ID الخاص بك على هاتف آيفون أو جهاز ماك.
2. للأفراد: سجل حصرياً عبر تطبيق Apple Developer على هاتف آيفون للحصول على تفعيل آلي وسريع بالتعرف على الوجه.
3. للشركات: وفر رقم DUNS مطابق لاسم شركتك، وبريد إلكتروني بنطاق الشركة الرسمي (وليس Gmail)، مع الاستعداد التام لمكالمة تفعيل هاتفية دولية باللغة الإنجليزية من موظف آبل.
4. ادفع الاشتراك السنوي ($99) باستخدام بطاقة ائتمانية دولية مطابقة لاسم صاحب الحساب تماماً.`;
        }
      }

      setMessages((prev) => [
        ...prev, 
        { 
          role: "model", 
          text: `💡 (وضع التشغيل المباشر/المحلي المستقل):\n\n${localAnswer}` 
        }
      ]);
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
