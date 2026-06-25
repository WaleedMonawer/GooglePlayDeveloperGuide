import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Layers, 
  FileText, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  ChevronLeft, 
  PhoneCall, 
  Lock,
  Building2,
  Smartphone,
  Linkedin,
  Facebook,
  MessageCircle,
  User,
  Mail,
  Youtube
} from "lucide-react";

import AccountTypeComparison from "./components/AccountTypeComparison";
import DocumentChecklist from "./components/DocumentChecklist";
import WizardSimulator from "./components/WizardSimulator";
import AiAdvisor from "./components/AiAdvisor";
import FaqSection from "./components/FaqSection";
import DunsGuide from "./components/DunsGuide";

// Asset paths generated in step 1
const heroImg = "/src/assets/images/play_developer_hero_1782396250010.jpg";

export default function App() {
  const [platform, setPlatform] = useState<"google" | "apple">("google");
  const [activeModule, setActiveModule] = useState<"comparison" | "checklist" | "simulator" | "advisor" | "duns">("comparison");

  const isGoogle = platform === "google";

  // Navigation handlers
  const handlePlatformChange = (plat: "google" | "apple") => {
    setPlatform(plat);
  };

  return (
    <div className="min-h-screen bg-[#F1F3F4] text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900" dir="rtl">
      
      {/* Header Notification bar */}
      <div className={`text-white text-center py-2.5 px-4 text-xs sm:text-sm font-bold shadow-sm relative z-50 flex items-center justify-center gap-2 transition-colors duration-500 ${
        isGoogle ? "bg-gradient-to-r from-[#1A73E8] to-[#4285F4]" : "bg-gradient-to-r from-gray-900 via-gray-800 to-black"
      }`}>
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
        <span>
          {isGoogle 
            ? "تحديثات عام 2026: تم تزويد الدليل بأحدث متطلبات التحقق وقواعد الـ 20 مختبر للأفراد ورقم DUNS للشركات في جوجل!"
            : "تحديثات عام 2026: تم تحديث خطوات التسجيل عبر تطبيق Apple Developer للأفراد وشروط DUNS والموقع الرسمي للشركات!"
          }
        </span>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-xl shadow-sm transition-all duration-500 ${
              isGoogle ? "bg-[#4285F4]" : "bg-black"
            }`}>
              {isGoogle ? "G" : ""}
            </div>
            <div className="text-right">
              <h1 className="font-extrabold text-gray-800 text-sm sm:text-lg leading-tight transition-all">
                {isGoogle ? "دليل إنشاء حساب مطور Google Play" : "دليل إنشاء حساب مطور Apple (App Store)"}
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                المرشد التفاعلي للتسجيل والتحقق بدون عقبات لعام 2026
              </p>
            </div>
          </div>

          {/* Quick Stats Grid Header */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-left border-l border-gray-200 pl-6">
              <span className="text-[10px] font-bold text-gray-400 block uppercase">رسوم التسجيل المتوقعة</span>
              <span className="text-sm font-extrabold text-gray-700">{isGoogle ? "25$ لمرة واحدة" : "99$ سنوياً"}</span>
            </div>
            <div className="text-left border-l border-gray-200 pl-6">
              <span className="text-[10px] font-bold text-gray-400 block uppercase">نسبة قبول التحقق</span>
              <span className="text-sm font-extrabold text-green-600">100% مع الدليل</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-gray-400 block uppercase">نسخة الدليل الحالية</span>
              <span className="text-sm font-extrabold text-gray-700">v4.5 ثنائية المنصة</span>
            </div>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Platform Switcher Section */}
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">اختر منصتك المستهدفة للبدء:</span>
            <div className="flex bg-gray-200/60 p-1.5 rounded-3xl w-full max-w-lg border border-gray-300/40">
              <button
                id="platform-google-btn"
                onClick={() => handlePlatformChange("google")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  isGoogle
                    ? "bg-white text-[#1A73E8] shadow-md border border-gray-100"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">G</div>
                <span>جوجل بلاي (Android)</span>
              </button>
              <button
                id="platform-apple-btn"
                onClick={() => handlePlatformChange("apple")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  !isGoogle
                    ? "bg-black text-white shadow-md border border-gray-800"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <span className="text-lg leading-none shrink-0 text-white"></span>
                <span>متجر آبل (iOS)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content Column */}
            <div className="lg:col-span-7 text-right flex flex-col gap-6">
              <span className={`inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isGoogle 
                  ? "bg-blue-50 text-[#1A73E8] border-blue-100" 
                  : "bg-gray-100 text-gray-900 border-gray-300"
              }`}>
                <BookOpen className="w-3.5 h-3.5" /> الدليل المصور المتكامل المحدث
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
                طريقك المختصر لامتلاك وتوثيق حساب المطور بنجاح
              </h2>
              
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                {isGoogle ? (
                  <>
                    هل تواجه صعوبة في فهم تعقيدات التحقق من الهوية لـ Google Play؟ هل تتساءل عن الفرق بين الحساب الشخصي وحساب الشركة ومستندات كل منهما؟ 
                    هذا الدليل التفاعلي صُمّم خصيصاً للمطورين وأصحاب الشركات في الوطن العربي لتبسيط الإجراءات، وتجنب حظر الحسابات، بمساعدة مستشار ذكي متاح لخدمتك دائماً.
                  </>
                ) : (
                  <>
                    هل تبحث عن الطريقة الصحيحة لإنشاء حساب مطور آبل (Apple Developer Program)؟ هل يقلقك رفض طلب شركتك بسبب رقم الـ DUNS أو عدم تطابق الاسم؟
                    نوفر لك دليلاً شاملاً يغطي خطوات التسجيل عبر تطبيق الهاتف، ومتطلبات الشركات مثل الموقع الإلكتروني والبريد الرسمي ومكالمة التحقق بنسبة نجاح 100%.
                  </>
                )}
              </p>

              {/* Quick Start official registration links */}
              <div className="my-2 p-5 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-right flex-1">
                  <span className="text-[10px] font-extrabold text-amber-600 uppercase block mb-1">🚀 رابط الانطلاق والبدء الفعلي</span>
                  <h4 className="font-bold text-gray-850 text-xs sm:text-sm">
                    {isGoogle ? "البدء المباشر في التسجيل الرسمي كونسول Google Play" : "البدء المباشر في التسجيل الرسمي لبرنامج مطوري Apple"}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {isGoogle ? "رابط مباشر آمن لبدء الدفع وإنشاء ملف الدفع" : "رابط مباشر آمن لبوابة الانضمام والدفع السنوي"}
                  </p>
                </div>
                <a
                  href={isGoogle ? "https://play.google.com/console/signup" : "https://developer.apple.com/programs/enroll/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-5 py-3 rounded-xl text-xs font-black shadow-md flex items-center gap-2 hover:-translate-y-0.5 transition-all text-white shrink-0 ${
                    isGoogle ? "bg-[#1A73E8] hover:bg-blue-750" : "bg-black hover:bg-gray-850"
                  }`}
                >
                  <span>اضغط للبدء بالتسجيل الآن ↗</span>
                </a>
              </div>

              {/* Quick Hero Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-gray-200 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold ${
                    isGoogle ? "bg-blue-50 text-[#1A73E8]" : "bg-gray-100 text-gray-900"
                  }`}>1</div>
                  <div className="text-right">
                    <h4 className="font-bold text-gray-800 text-xs sm:text-sm">قارن بدقة</h4>
                    <p className="text-[10px] text-gray-500">اختر نوع حسابك</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0 font-bold">2</div>
                  <div className="text-right">
                    <h4 className="font-bold text-gray-800 text-xs sm:text-sm">تأكد من وثائقك</h4>
                    <p className="text-[10px] text-gray-500">قبل دفع الرسوم</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 font-bold">3</div>
                  <div className="text-right">
                    <h4 className="font-bold text-gray-800 text-xs sm:text-sm">استشر الذكاء الاصطناعي</h4>
                    <p className="text-[10px] text-gray-500">لحل أي عقبة</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Image Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
                {/* Decorative glow */}
                <div className={`absolute -inset-1 rounded-2xl opacity-40 blur-2xl ${
                  isGoogle ? "bg-[#4285F4]/10" : "bg-black/10"
                }`}></div>
                
                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white p-1 shadow-lg">
                  <img 
                    src={heroImg} 
                    alt={`مطور ينشر تطبيقه على كونسول ${isGoogle ? "جوجل بلاي" : "آبل"}`} 
                    className="w-full h-auto rounded-xl object-cover max-h-[380px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Interactive Guide Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Module Switcher Buttons */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-10 bg-gray-200/60 p-1.5 rounded-2xl max-w-4xl mx-auto">
          <button
            id="module-comparison-btn"
            onClick={() => setActiveModule("comparison")}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeModule === "comparison"
                ? isGoogle 
                  ? "bg-white text-[#1A73E8] shadow-sm border border-gray-200"
                  : "bg-white text-gray-950 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. الفردي مقارنة بـ حساب شركة</span>
          </button>
          
          <button
            id="module-checklist-btn"
            onClick={() => setActiveModule("checklist")}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeModule === "checklist"
                ? isGoogle
                  ? "bg-white text-green-600 shadow-sm border border-gray-200"
                  : "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/40"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2. وثائق الدول والتحقق</span>
          </button>

          <button
            id="module-simulator-btn"
            onClick={() => setActiveModule("simulator")}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeModule === "simulator"
                ? isGoogle
                  ? "bg-white text-purple-600 shadow-sm border border-gray-200"
                  : "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/40"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>3. محاكي التسجيل</span>
          </button>

          <button
            id="module-advisor-btn"
            onClick={() => setActiveModule("advisor")}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeModule === "advisor"
                ? isGoogle
                  ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                  : "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/40"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>4. المستشار الذكي AI</span>
          </button>

          <button
            id="module-duns-btn"
            onClick={() => setActiveModule("duns")}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeModule === "duns"
                ? isGoogle
                  ? "bg-white text-blue-700 shadow-sm border border-gray-200"
                  : "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/40"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>5. دليل رقم D-U-N-S</span>
          </button>
        </div>

        {/* Dynamic Display Area */}
        <div className="mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule + platform}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeModule === "comparison" && <AccountTypeComparison platform={platform} />}
              {activeModule === "checklist" && <DocumentChecklist platform={platform} />}
              {activeModule === "simulator" && <WizardSimulator platform={platform} />}
              {activeModule === "advisor" && <AiAdvisor platform={platform} />}
              {activeModule === "duns" && <DunsGuide platform={platform} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Golden Rules Bento Grid Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-4 ${
              isGoogle 
                ? "bg-blue-50 text-[#1A73E8] border-blue-100" 
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}>
              <ShieldCheck className={`w-4 h-4 ${isGoogle ? "text-[#1A73E8]" : "text-black"}`} /> ممارسات الأمان والقبول المتقدمة
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3">
              القواعد الذهبية الأربعة لتفادي تجميد وحظر حساب {isGoogle ? "جوجل بلاي" : "مطور آبل"}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              تقوم الخوارزميات الأمنية بمراقبة الحسابات الجديدة بدقة فائقة. الالتزام بهذه القواعد هو صمام الأمان الوحيد لحسابك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {isGoogle ? (
              <>
                {/* Rule 1 */}
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200 hover:border-blue-200 hover:bg-blue-50/5 transition-all flex items-start gap-4 text-right">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1A73E8] flex items-center justify-center shrink-0 text-sm font-bold font-mono">01</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">الاسم المطابق تماماً (Literal Name Match)</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      يجب تطابق اسمك في Payments Profile وحساب المطور مع وثيقتك الرسمية حرفاً بحرف. أي زيادة في الحروف أو اختصار للاسم الأوسط سيؤدي لرفض التحقق فوراً.
                    </p>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200 hover:border-blue-200 hover:bg-blue-50/5 transition-all flex items-start gap-4 text-right">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0 text-sm font-bold font-mono">02</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">بطاقة الدفع الموثوقة الشخصية</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      يجب دفع رسوم التسجيل (25$) ببطاقة ائتمانية حقيقية باسم صاحب الحساب نفسه. دفع الرسوم ببطاقة باسم شخص آخر أو بطاقات افتراضية مؤقتة يتم اعتباره احتيالاً مالياً.
                    </p>
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200 hover:border-blue-200 hover:bg-blue-50/5 transition-all flex items-start gap-4 text-right">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-sm font-bold font-mono">03</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">دقة ومحيط صور المستندات المرفوعة</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      عند تصوير جواز السفر أو الهوية، التقط الصورة في إضاءة ممتازة دون لمعان واحرص على بقاء الزوايا الأربعة للوثيقة ظاهرة بالكامل داخل الصورة بلا أي قص أو تعديل ببرامج التصميم.
                    </p>
                  </div>
                </div>

                {/* Rule 4 */}
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200 hover:border-blue-200 hover:bg-blue-50/5 transition-all flex items-start gap-4 text-right">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-sm font-bold font-mono">04</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">النظافة الرقمية للبيانات والأجهزة (No Suspension Linkage)</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      إذا كان لديك حساب سابق تم إغلاقه أو حظره، فلا تحاول فتح الحساب الجديد من نفس الجهاز أو على نفس خط الإنترنت أو رقم الهاتف. ستقوم جوجل بربط الحسابات وحظر الجديد فوراً.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Rule 1 */}
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200 hover:border-gray-900/10 hover:bg-gray-50/5 transition-all flex items-start gap-4 text-right">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 text-sm font-bold font-mono">01</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">الاسم المطابق بالإنجليزية (English Legal Name)</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      يجب أن يتطابق الاسم بالإنجليزية في الـ Apple ID وجواز السفر حرفاً بحرف. للأفراد الاسم الشخصي وللشركات اسم الكيان المسجل بالكامل في السجلات الرسمية.
                    </p>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200 hover:border-gray-900/10 hover:bg-gray-50/5 transition-all flex items-start gap-4 text-right">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 text-sm font-bold font-mono">02</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">بطاقة الدفع والاشتراكات المتكررة</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      يجب دفع الرسوم السنوية (99$) ببطاقة ائتمانية دولية تدعم ميزة الدفع المتكرر والمستمر وتكون باسمك لتفادي إلغاء تفعيل حساب المطور وتعطيل تطبيقاتك.
                    </p>
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200 hover:border-gray-900/10 hover:bg-gray-50/5 transition-all flex items-start gap-4 text-right">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 text-sm font-bold font-mono">03</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">دقة التسجيل والتحقق عبر تطبيق الهاتف</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      سجل دائماً من خلال تطبيق Apple Developer للأجهزة الذكية (آيفون/آيباد) فهو يسهل التحقق المباشر من ملامح الوجه (Face ID) ومسح الوثائق بدون تدخل يدوي طويل وعقبات.
                    </p>
                  </div>
                </div>

                {/* Rule 4 */}
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200 hover:border-gray-900/10 hover:bg-gray-50/5 transition-all flex items-start gap-4 text-right">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 text-sm font-bold font-mono">04</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">موقع ويب وبريد الشركة الرسمي (لا يقبل Gmail)</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      لحسابات الشركات والمؤسسات، تفرض آبل تواجد موقع ويب رسمي حقيقي ونشط وبريد تحت نطاق الشركة نفسه (مثل support@company.com) وترفض البريد المجاني فوراً.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <div className="mt-16">
          <FaqSection platform={platform} />
        </div>

        {/* Developer Info Section */}
        <section id="developer-info" className="mt-20 relative overflow-hidden rounded-3xl bg-white border border-gray-200/80 shadow-xl p-8 sm:p-12">
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 text-right">
            
            {/* Developer Details & Bio */}
            <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">
              {/* Animated Avatar/Initials */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg border-2 border-white">
                  WM
                </div>
                {/* Active Indicator dot */}
                <span className="absolute bottom-1 right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                </span>
              </div>

              {/* Text content */}
              <div className="text-center sm:text-right flex-1">
                <span className="text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block mb-2 border border-blue-100">
                  مطور الدليل ومستشار التسجيل
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-gray-800 mb-2">
                  م. وليد عبد الله منور
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                  تم تطوير هذا الدليل بواسطة المطور لمساعدتكم في اجتياز خطوات التحقق بنجاح. للتواصل والاستفسارات يمكنك عبر القنوات التالية:
                </p>
              </div>
            </div>

            {/* Contact Actions Grid */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[280px]">
              
              {/* WhatsApp direct connection button */}
              <a 
                href="https://wa.me/967777812305"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm shadow-md hover:-translate-y-0.5 transition-all w-full text-center"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>تواصل عبر واتساب / اتصل</span>
                <span className="text-xs font-mono font-normal opacity-90 mr-1">(00967777812305)</span>
              </a>

              {/* LinkedIn social button */}
              <a 
                href="https://www.linkedin.com/in/waleed-monawer-481715239?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0077B5] hover:bg-[#006399] text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all w-full text-center"
              >
                <Linkedin className="w-5 h-5 fill-current" />
                <span>الملف الشخصي على LinkedIn</span>
              </a>

              {/* Facebook social button */}
              <a 
                href="https://www.facebook.com/share/1Efr7LsuuJ/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all w-full text-center"
              >
                <Facebook className="w-5 h-5 fill-current" />
                <span>الصفحة الشخصية على Facebook</span>
              </a>

              {/* YouTube Channel button */}
              <a 
                href="https://youtube.com/@waleedmonawer8146?si=u3XE6OklSDV41u4j"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FF0000] hover:bg-[#E60000] text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all w-full text-center"
              >
                <Youtube className="w-5 h-5 fill-current" />
                <span>قناتنا التعليمية على YouTube</span>
              </a>

            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg text-white flex items-center justify-center font-bold text-xl shadow-sm transition-all duration-500 ${
              isGoogle ? "bg-[#4285F4]" : "bg-black"
            }`}>
              {isGoogle ? "G" : ""}
            </div>
            <span className="font-extrabold text-gray-800 text-sm">مركز مساعدة مطوري المتاجر الذكية - دليل تفاعلي غير رسمي</span>
          </div>
          <p className="text-gray-450 text-xs leading-relaxed max-w-xl text-center">
            إخلاء مسؤولية: هذا دليل استشاري تعليمي تفاعلي صمم لغرض توجيه المستخدمين لاتباع قواعد Google Play Console و Apple Developer الصارمة. إن قبول حساب المطور أو رفضه يخضع لتقدير المنصات الكامل بناءً على وثائقك وأمان جهازك.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>سياسة الخصوصية</span>
            <span>الدعم الفني</span>
            <span>الشروط والأحكام</span>
          </div>
          <span className="text-[10px] text-gray-300 font-mono">طُوّر بأعلى دقة ومعايير لتجربة مستخدم متميزة © 2026</span>
        </div>
      </footer>

    </div>
  );
}
