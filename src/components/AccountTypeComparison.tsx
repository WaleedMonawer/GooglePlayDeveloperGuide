import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Users, DollarSign, Clock, HelpCircle, CheckCircle, AlertTriangle, ArrowLeftRight } from "lucide-react";
import { 
  individualDetails, 
  organizationDetails,
  appleIndividualDetails,
  appleOrganizationDetails
} from "../data";

interface AccountTypeComparisonProps {
  platform: "google" | "apple";
}

// Asset path generated in step 1
import accountTypesImg from "../assets/images/account_types_comparison_1782396268265.jpg";

export default function AccountTypeComparison({ platform }: AccountTypeComparisonProps) {
  const [activeTab, setActiveTab] = useState<"individual" | "organization">("individual");

  const isGoogle = platform === "google";
  
  const current = isGoogle
    ? (activeTab === "individual" ? individualDetails : organizationDetails)
    : (activeTab === "individual" ? appleIndividualDetails : appleOrganizationDetails);

  // Dynamic style configs based on platform
  const themeColor = isGoogle ? "#1A73E8" : "#000000";
  const btnActiveBg = isGoogle ? "text-blue-700" : "text-gray-900 border-gray-900";
  const gradientClass = isGoogle 
    ? "from-[#1A73E8] to-[#4285F4]" 
    : "from-gray-900 via-gray-800 to-black";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden" id="account-comparison">
      {/* Visual Header Banner */}
      <div className={`relative h-64 sm:h-80 bg-gradient-to-r ${gradientClass} overflow-hidden flex items-center justify-between p-8`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-xl text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md mb-3">
            <ArrowLeftRight className="w-3 h-3" /> خطوة حاسمة لمتجر {isGoogle ? "Google Play" : "Apple App Store"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
            مقارنة أنواع حسابات {isGoogle ? "جوجل" : "آبل"} بالتفصيل
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            اختيار نوع الحساب (شخصي أم شركة) هو أول خطوة ويحدد الشروط والمتطلبات ومستقبل تطبيقاتك على المتجر. قارن بينهما واختر بدقة.
          </p>
        </div>

        {/* Generated Visual illustration */}
        <div className="hidden md:block w-72 h-44 rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0">
          <img 
            src={accountTypesImg} 
            alt="الحساب الفردي مقارنة بـ حساب شركة" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Segmented Control Navigation */}
      <div className="p-6 border-b border-gray-200 bg-[#F8F9FA] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex bg-gray-200/60 p-1 rounded-2xl w-full sm:w-auto">
          <button
            id="tab-individual-btn"
            onClick={() => setActiveTab("individual")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "individual"
                ? `bg-white ${btnActiveBg} shadow-sm border border-gray-100`
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>حساب فردي (Individual)</span>
          </button>
          <button
            id="tab-organization-btn"
            onClick={() => setActiveTab("organization")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "organization"
                ? `bg-white ${btnActiveBg} shadow-sm border border-gray-100`
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>حساب شركة (Organization)</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>الرسوم: {current.fees}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>المدة: {current.duration}</span>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Content */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + platform}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Overview & Suitability Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-200 flex flex-col gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">نظرة عامة</span>
                <h3 className="text-xl font-bold text-gray-800">{current.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{current.description}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs font-bold text-gray-400 block mb-2">الفئة المستهدفة:</span>
                  <div className={`p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs font-medium leading-relaxed ${isGoogle ? "text-[#1A73E8]" : "text-gray-900 bg-gray-100/60 border-gray-200"}`}>
                    💡 {current.suitability}
                  </div>
                </div>
              </div>

              {/* Requirements & Obligations */}
              <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-4">الالتزامات الأساسية</span>
                <ul className="flex flex-col gap-3">
                  {current.obligations.map((ob, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold mt-0.5 text-[10px] ${
                        isGoogle ? "bg-blue-50 text-[#1A73E8] border border-blue-100" : "bg-gray-100 text-gray-800 border border-gray-300"
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{ob}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pros and Cons Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Pros */}
              <div className="bg-green-50/40 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center gap-2 mb-4 text-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  <h4 className="font-bold text-base">المزايا والإيجابيات (Pros)</h4>
                </div>
                <ul className="flex flex-col gap-3">
                  {current.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                      <span className="text-green-500 font-extrabold text-base shrink-0 select-none mt-0.5">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons / Challenges */}
              <div className="bg-rose-50/40 p-6 rounded-2xl border border-rose-200">
                <div className="flex items-center gap-2 mb-4 text-rose-800">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  <h4 className="font-bold text-base">التحديات والعيوب (Cons)</h4>
                </div>
                <ul className="flex flex-col gap-3">
                  {current.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                      <span className="text-rose-500 font-extrabold text-lg shrink-0 select-none leading-none mt-1">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pro Recommendation summary box */}
        <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-200/60 flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="text-right">
            <h5 className="font-bold text-amber-900 text-sm mb-1">نصيحة ذهبية للاختيار:</h5>
            <p className="text-amber-800 text-xs sm:text-sm leading-relaxed">
              {isGoogle ? (
                <>
                  إذا كنت تملك رخصة تجارية أو سجلاً تجارياً، فنوصيك وبشدة باختيار <strong>حساب الشركات</strong>. على الرغم من أنه يتطلب استخراج رقم DUNS، إلا أنه يعفيك تماماً من شرط Google المعقد بضرورة توفير 20 مختبراً حقيقياً لتطبيقك قبل نشره، وهو العائق الأكبر للمطورين الأفراد حالياً.
                </>
              ) : (
                <>
                  في منصة آبل، إذا كنت ترغب في إظهار <strong>اسم شركتك التجاري</strong> كجهة مطورة على المتجر، أو تود إضافة مبرمجين ومصممين بصلات متعددة داخل حسابك، فاختر <strong>حساب الشركة</strong>. أما إذا كنت مطوراً فردياً مستقلاً وتبحث عن طريق سريع للتسجيل بدون متطلبات DUNS وموقع ويب خاص، فإن <strong>الحساب الفردي</strong> هو الأسهل والأنسب للبدء.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
