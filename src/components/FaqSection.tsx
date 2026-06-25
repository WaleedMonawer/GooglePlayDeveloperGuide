import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  Users, 
  CreditCard 
} from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "costs" | "verification" | "rejection" | "rules" | "general";
  categoryLabel: string;
  platform: "google" | "apple" | "both";
  icon: React.ReactNode;
}

interface FaqSectionProps {
  platform: "google" | "apple";
}

export default function FaqSection({ platform }: FaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isGoogle = platform === "google";

  const faqs: FaqItem[] = [
    // --- Google FAQs ---
    {
      id: "cost-recurring",
      question: "ما هي التكلفة الإجمالية لإنشاء حساب مطور Google Play وهل هي دورية؟",
      answer: "الرسوم الأساسية هي 25 دولاراً أمريكياً تُدفع لمرة واحدة فقط مدى الحياة (One-time fee) ولا توجد أي اشتراكات سنوية أو رسوم تجديد دورية للحساب الشخصي أو حساب الشركة. ومع ذلك، قد تطرأ بعض المصاريف غير المباشرة للشركات مثل تكلفة استخراج السجل التجاري أو الحصول على رقم DUNS في حال استخدام جهات خارجية وسيطة لتسريع العملية.",
      category: "costs",
      categoryLabel: "التكاليف والبطاقات",
      platform: "google",
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />
    },
    {
      id: "accepted-cards",
      question: "ما هي نوعية البطاقات الائتمانية المقبولة لدفع رسوم التسجيل الـ $25؟",
      answer: "يجب استخدام بطاقة ائتمانية (Credit Card) أو بطاقة حسم مباشر (Debit Card) حقيقية صادرة عن بنك مرخص وتدعم الشراء الدولي والتعامل بالدولار الأمريكي. يُمنع منعاً باتاً استخدام البطاقات الافتراضية المؤقتة (Virtual Cards) أو بطاقات مسبقة الدفع مجهولة الهوية، حيث تصنفها أنظمة الأمان التابعة لجوجل كمصدر عالي الخطورة، مما يعرض الحساب للإغلاق الفوري بتهمة الاحتيال المالي المزعوم.",
      category: "costs",
      categoryLabel: "التكاليف والبطاقات",
      platform: "google",
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />
    },
    {
      id: "verification-duration",
      question: "كم تستغرق عملية مراجعة وتفعيل حساب المطور من قبل فريق جوجل؟",
      answer: "تختلف المدة الزمنية حسب نوع الحساب:\n• لحسابات الأفراد (Personal): تستغرق المراجعة عادةً من يومين (48 ساعة) إلى 7 أيام عمل في حال وضوح الوثائق.\n• لحسابات الشركات (Organization): تستغرق ما بين 7 أيام إلى 14 يوم عمل، نظراً لحاجة جوجل للتحقق من هوية الشركة القانونية عبر قواعد بيانات D&B الدولية (رقم DUNS) ومطابقة السجلات الوطنية الرسمية.",
      category: "verification",
      categoryLabel: "التحقق والوثائق",
      platform: "google",
      icon: <Clock className="w-5 h-5 text-[#1A73E8]" />
    },
    {
      id: "20-testers-rule",
      question: "ما هي قاعدة الـ 20 مختبراً (20 Testers Rule) المفروضة على الحسابات الشخصية؟",
      answer: "قامت جوجل بتحديث شروطها الأمنية الصارمة في نهاية عام 2023؛ ففرضت على أي مطور يقوم بإنشاء حساب شخصي (Personal) جديد بعد تاريخ 13 نوفمبر 2023 أن يخضع تطبيقه لمرحلة اختبار مغلق (Closed Testing) يشارك فيه ما لا يقل عن 20 مختبراً حقيقياً مسجلين بإيميلاتهم، ويقومون بتحميل التطبيق واستخدامه بشكل يومي متواصل لمدة 14 يوماً على الأقل دون انقطاع. لن يظهر خيار 'النشر للإنتاج' (Production) للعامة إلا بعد اجتياز هذا المطلب بنجاح. يُستثنى من هذه القاعدة حسابات الشركات والمؤسسات القانونية تماماً.",
      category: "rules",
      categoryLabel: "قواعد متقدمة (20 مختبراً)",
      platform: "google",
      icon: <Users className="w-5 h-5 text-purple-600" />
    },

    // --- Apple FAQs ---
    {
      id: "apple-cost",
      question: "ما هي رسوم التسجيل في برنامج مطوري آبل وهل تُدفع لمرة واحدة أم دورية؟",
      answer: "رسوم برنامج مطوري آبل (Apple Developer Program) هي 99 دولاراً أمريكياً تُدفع سنوياً (Annual subscription). في حال عدم التجديد السنوي، سيتم إخفاء تطبيقاتك من متجر App Store ولن يتمكن المستخدمون الجدد من تنزيلها، ولكنها ستبقى تعمل لدى المستخدمين الذين قاموا بتنزيلها مسبقاً لحين تجديد الرسوم.",
      category: "costs",
      categoryLabel: "التكاليف والبطاقات",
      platform: "apple",
      icon: <DollarSign className="w-5 h-5 text-gray-900" />
    },
    {
      id: "apple-gmail-reject",
      question: "لماذا ترفض آبل استخدام إيميل مجاني (مثل Gmail أو Yahoo) عند التسجيل كشركة؟",
      answer: "تطبق آبل شروطاً صارمة للتحقق من الكيان المؤسسي. تتطلب حسابات الشركات والمؤسسات التسجيل باستخدام بريد إلكتروني رسمي يحمل اسم نطاق موقع الشركة الإلكتروني الفعلي (مثل info@company.com). تعتبر آبل استخدام الحسابات المجانية مؤشراً على عدم موثوقية الجهة أو محاولة لإنشاء شركة وهمية.",
      category: "verification",
      categoryLabel: "التحقق والوثائق",
      platform: "apple",
      icon: <ShieldAlert className="w-5 h-5 text-rose-600" />
    },
    {
      id: "apple-2fa",
      question: "لماذا تفرض آبل تفعيل المصادقة الثنائية (2FA) وهل أحتاج جهاز آبل للتسجيل؟",
      answer: "نعم، المصادقة الثنائية (Two-Factor Authentication) شرط إلزامي وأساسي للوصول إلى بوابة المطورين. يتطلب إعدادها امتلاك جهاز آبل حقيقي (مثل iPhone أو iPad أو Mac) مربوط بحساب الـ Apple ID الخاص بك. لا يمكنك إكمال عملية التسجيل أو إدارة الحساب وتطبيقاته بدون هذه الميزة لضمان أقصى حماية أمنية.",
      category: "rules",
      categoryLabel: "قواعد متقدمة",
      platform: "apple",
      icon: <Users className="w-5 h-5 text-indigo-600" />
    },
    {
      id: "apple-phone-call",
      question: "كيف يتم التحقق التليفوني من آبل لتفعيل حساب الشركة وماذا يسألون؟",
      answer: "بعد مراجعة أوراق الشركة ورقم الـ DUNS، سيرسل موظف آبل بريداً لتحديد موعد مكالمة هاتفية دولية أو الاتصال بالرقم المسجل مباشرة. الغرض من المكالمة هو التحقق من أن مقدم الطلب مخول بالتعاقد باسم الشركة. ستكون المكالمة باللغة الإنجليزية، ويسألون عادةً عن اسم الشركة الرسمي، غرض الحساب، منصبك، وتأكيد رغبتكم في تفعيل الاشتراك.",
      category: "verification",
      categoryLabel: "التحقق والوثائق",
      platform: "apple",
      icon: <Clock className="w-5 h-5 text-gray-800" />
    },
    {
      id: "apple-app-transfer",
      question: "هل يمكن نقل ملكية التطبيقات من حساب آبل فردي إلى حساب شركة لاحقاً؟",
      answer: "نعم، تتيح آبل ميزة نقل التطبيقات (App Transfer) بسلاسة كاملة وبلا انقطاع لخدمة التطبيق من المتجر. يمكنك نقل التطبيق من حسابك الفردي إلى حساب شركتك الجديد بمجرد إدخال المعرف المالي للحساب الآخر والموافقة على العقد الرقمي، وهو أمر ممتاز ويبسط رحلتك التقنية من مطور مستقل إلى شركة ناشئة.",
      category: "general",
      categoryLabel: "استفسارات عامة",
      platform: "apple",
      icon: <ShieldAlert className="w-5 h-5 text-blue-600" />
    },

    // --- Both / Common FAQs ---
    {
      id: "duns-number",
      question: "ما هو رقم D-U-N-S ومن يحتاجه في المنصتين؟",
      answer: "رقم الـ DUNS هو رقم تعريفي دولي فريد مكون من 9 خانات تمنحه مؤسسة Dun & Bradstreet للشركات للتحقق من وجودها القانوني والمادي. وهو شرط إجباري وإلزامي بنسبة 100% لكل من يرغب في تسجيل حساب مطور باسم شركة (Organization) في متجر Google Play وكذلك متجر Apple App Store. لا يحتاج مطورو الحسابات الشخصية (Individual) لهذا الرقم نهائياً.",
      category: "verification",
      categoryLabel: "التحقق والوثائق",
      platform: "both",
      icon: <Users className="w-5 h-5 text-teal-600" />
    },
    {
      id: "handling-rejection-general",
      question: "ماذا أفعل إذا تم رفض مستندات الهوية أو إثبات العنوان في كلا المتجرين؟",
      answer: "في حال رفض وثائقك، اتبع الخطوات التالية فوراً وتجنب العشوائية لئلا يُحظر حسابك نهائياً:\n1. لا تقم برفع نفس الصورة المرفوضة مجدداً دون إدخال أي تعديل.\n2. افحص البريد الإلكتروني الوارد بدقة لتحديد السبب بدقة (مثل: اسم غير مطابق، صورة غير واضحة، زوايا مقصوصة).\n3. تأكد أن الاسم في بطاقة الهوية يطابق تماماً حرفاً بحرف الاسم المكتوب في ملف الدفع (Payments Profile).\n4. التقط صورة جديدة عالية الجودة للوثيقة الأصلية (وليس نسخة ضوئية) في إضاءة ممتازة دون فلاش عاكس مع إظهار زوايا المستند الأربعة بشكل كامل داخل إطار الصورة.\n5. في حال طلب إثبات عنوان، ارفع كشف حساب بنكي رسمي أو فاتورة خدمات حديثة باللغة الإنجليزية يطابق عنوانها العنوان المسجل بالحساب تماماً.",
      category: "rejection",
      categoryLabel: "المشاكل والرفض",
      platform: "both",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />
    },
    {
      id: "change-account-type-general",
      question: "هل يمكنني تحويل نوع حسابي لاحقاً من فردي إلى شركة أو العكس؟",
      answer: "نعم، تتيح كل من جوجل وآبل للمطورين تحويل الحساب من شخصي (Individual) إلى شركة (Organization)، لكن ذلك يتطلب تقديم طلب رسمي إلى الدعم الفني وتزويدهم بكافة الوثائق القانونية الجديدة للشركة بما فيها السجل التجاري ورقم الـ DUNS. يُرجى الحذر من أن الحساب قد يخضع لعملية مراجعة أمنية دقيقة وتجميد مؤقت لعمليات النشر أثناء فترة الانتقال، لذا يُنصح بشدة باختيار النوع الملائم منذ البداية لتفادي هذه التعقيدات التقنية.",
      category: "general",
      categoryLabel: "استفسارات عامة",
      platform: "both",
      icon: <ShieldAlert className="w-5 h-5 text-indigo-600" />
    }
  ];

  const categories = [
    { id: "all", label: "جميع الأسئلة" },
    { id: "costs", label: "التكاليف والبطاقات" },
    { id: "verification", label: "التحقق والوثائق" },
    { id: "rejection", label: "المشاكل والرفض" },
    { id: "rules", label: isGoogle ? "قوانين جوجل (20 مختبر)" : "قوانين آبل الصارمة" },
  ];

  // Filter based on active platform and active category and search query
  const filteredFaqs = faqs.filter(item => {
    const matchesPlatform = item.platform === "both" || item.platform === platform;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Adapt category matches
    let matchesCategory = false;
    if (activeCategory === "all") {
      matchesCategory = true;
    } else if (activeCategory === "rules") {
      matchesCategory = item.category === "rules";
    } else {
      matchesCategory = item.category === activeCategory;
    }

    return matchesPlatform && matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const gradientClass = isGoogle ? "from-[#1A73E8] to-[#4285F4]" : "from-gray-900 via-gray-800 to-black";
  const catActiveBg = isGoogle ? "bg-[#1A73E8]" : "bg-black";
  const borderActive = isGoogle ? "border-blue-200 bg-blue-50/5" : "border-gray-900 bg-gray-50/10";
  const iconColor = isGoogle ? "text-[#1A73E8]" : "text-black";

  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden" id="faq-section">
      
      {/* Banner / Header */}
      <div className={`relative h-48 sm:h-56 bg-gradient-to-r ${gradientClass} overflow-hidden flex items-center justify-between p-6 sm:p-8`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-2xl text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> مركز المعرفة الشامل
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-2">
            الأسئلة الشائعة وإرشادات الحماية لـ {isGoogle ? "جوجل" : "آبل"} (FAQ)
          </h2>
          <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
            مستودع إجابات خبراء التطوير المعتمدين لضمان التسجيل الآمن ومواجهة أي سيناريوهات للرفض مع {isGoogle ? "Google Play Console" : "Apple Developer Portal"}.
          </p>
        </div>

        <div className="hidden lg:flex w-24 h-24 bg-white/15 rounded-full items-center justify-center text-white shrink-0">
          <HelpCircle className="w-12 h-12 stroke-[1.5]" />
        </div>
      </div>

      {/* Control Bar: Search & Categories */}
      <div className="p-6 border-b border-gray-200 bg-[#F8F9FA] flex flex-col gap-4">
        
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="ابحث عن سؤالك أو المشكلة التي تواجهك..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-white border border-gray-200 text-gray-800 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 ${isGoogle ? "focus:ring-[#1A73E8] focus:border-[#1A73E8]" : "focus:ring-black focus:border-black"} transition-all`}
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? `${catActiveBg} text-white shadow-sm`
                  : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat.id === "rules" ? (isGoogle ? "قوانين جوجل (20 مختبر)" : "قوانين آبل الصارمة") : cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="p-6">
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`border rounded-2xl transition-all ${
                    isExpanded 
                      ? borderActive 
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-right font-bold text-gray-800 text-sm sm:text-base focus:outline-none gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] border border-gray-100 flex items-center justify-center shrink-0">
                        {faq.icon}
                      </div>
                      <span className={`leading-tight hover:${isGoogle ? "text-[#1A73E8]" : "text-gray-900"} transition-colors`}>{faq.question}</span>
                    </div>
                    <div>
                      {isExpanded ? (
                        <ChevronUp className={`w-5 h-5 ${iconColor} shrink-0`} />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pt-1 border-t border-gray-100/80 mr-14">
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                          <div className="mt-4 flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500 border border-gray-200">
                              {faq.categoryLabel}
                            </span>
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                              <Sparkles className={`w-3 h-3 ${iconColor}`} /> نصيحة موثوقة
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#F8F9FA] rounded-2xl border border-dashed border-gray-200">
            <AlertTriangle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h4 className="font-bold text-gray-700 text-sm mb-1">لم يتم العثور على نتائج</h4>
            <p className="text-gray-400 text-xs">جرب استخدام كلمات بحث أخرى أو اختر تصنيفاً مغايراً.</p>
          </div>
        )}
      </div>

    </section>
  );
}
