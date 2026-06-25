import React, { useState } from "react";
import { motion } from "motion/react";
import { FileText, CheckSquare, Square, Check, AlertCircle, Info, Landmark } from "lucide-react";
import { 
  documentsData, 
  appleDocumentsData, 
  countriesConfig 
} from "../data";

interface DocumentChecklistProps {
  platform: "google" | "apple";
}

// Asset path generated in step 1
import verificationImg from "../assets/images/verification_process_1782396285315.jpg";

export default function DocumentChecklist({ platform }: DocumentChecklistProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("SA");
  const [accountType, setAccountType] = useState<"individual" | "organization">("individual");
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const isGoogle = platform === "google";
  const activeCountry = countriesConfig.find((c) => c.code === selectedCountryCode) || countriesConfig[0];

  // Select document source
  const sourceDocs = isGoogle ? documentsData : appleDocumentsData;

  // Filter based on account type
  const relevantDocs = sourceDocs.filter(
    (doc) => doc.requiredFor === "both" || doc.requiredFor === accountType
  );

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  const percentComplete = Math.round(
    (Object.values(checkedDocs).filter(Boolean).length / relevantDocs.length) * 100
  ) || 0;

  // Style configs
  const gradientClass = isGoogle 
    ? "from-green-600 to-teal-500" 
    : "from-gray-900 via-gray-800 to-black";
  const badgeClass = isGoogle 
    ? "bg-blue-50 text-[#1A73E8] border-blue-100" 
    : "bg-gray-100 text-gray-900 border-gray-300";
  const textThemeColor = isGoogle ? "text-green-600" : "text-gray-900";
  const borderActiveColor = isGoogle ? "border-green-300 bg-green-50/10" : "border-gray-900 bg-gray-50/20";
  const progressBgColor = isGoogle ? "bg-green-500" : "bg-gray-900";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden" id="document-checklist">
      {/* Banner */}
      <div className={`relative h-64 sm:h-80 bg-gradient-to-r ${gradientClass} overflow-hidden flex items-center justify-between p-8`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-xl text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md mb-3">
            <FileText className="w-3.5 h-3.5" /> الأوراق الرسمية المطلوبة لـ {isGoogle ? "جوجل بلاي" : "مطور آبل"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
            مستندات التحقق لمتجر {isGoogle ? "Google Play" : "Apple App Store"}
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            محرك التحقق التفاعلي. اختر دولتك ونوع الحساب لتكتشف فوراً المستندات القانونية المقبولة في كونسول {isGoogle ? "جوجل" : "آبل"} والنصائح الصارمة لتفادي رفض الطلب.
          </p>
        </div>

        {/* Generated illustration */}
        <div className="hidden md:block w-72 h-44 rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0">
          <img 
            src={verificationImg} 
            alt="التحقق من الهوية" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Inputs Selector Bar */}
      <div className="p-6 border-b border-gray-200 bg-[#F8F9FA] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Country Selector */}
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5" /> اختر بلد الإقامة / التأسيس:
          </label>
          <select
            id="country-selector"
            value={selectedCountryCode}
            onChange={(e) => {
              setSelectedCountryCode(e.target.value);
              setCheckedDocs({});
            }}
            className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all cursor-pointer"
          >
            {countriesConfig.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Account Type Selector for Checklist */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500">نوع الحساب المستهدف:</label>
          <div className="flex bg-gray-200/60 p-1 rounded-xl">
            <button
              id="checklist-type-individual"
              onClick={() => {
                setAccountType("individual");
                setCheckedDocs({});
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                accountType === "individual"
                  ? isGoogle 
                    ? "bg-white text-green-700 shadow-sm" 
                    : "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              فردي
            </button>
            <button
              id="checklist-type-organization"
              onClick={() => {
                setAccountType("organization");
                setCheckedDocs({});
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                accountType === "organization"
                  ? isGoogle 
                    ? "bg-white text-green-700 shadow-sm" 
                    : "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              شركة / مؤسسة
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Country Specific Notice */}
        <div className="mb-8 p-5 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div className="text-right flex-1">
            <h4 className="font-bold text-teal-900 text-sm mb-1">
              ملاحظات هامة لـ {activeCountry.name} {activeCountry.flag}:
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
              {activeCountry.specialNotes}
            </p>
            <div className="bg-white p-3.5 rounded-xl border border-teal-100/60">
              <span className="text-xs font-bold text-teal-800 block mb-2">المستندات المحلية المقبولة:</span>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                {(accountType === "individual" ? activeCountry.documents.individual : activeCountry.documents.organization).map((doc, idx) => (
                  <li key={idx} className="mr-4">{doc}</li>
                ))}
              </ul>
            </div>
            {!isGoogle && accountType === "organization" && (
              <div className="mt-3 bg-amber-50 p-3 rounded-xl border border-amber-100 text-xs text-amber-900 font-semibold">
                ⚠️ لشركة في {activeCountry.name}: تطلب آبل إثباتاً إضافياً بموقع الشركة الإلكتروني بنطاق خاص (مثال: support@company.com). البريد المجاني مرفوض تماماً.
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Checklist Tracker */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">قائمة مراجعة الأوراق</h3>
            <p className="text-gray-400 text-xs mt-0.5">جهز هذه الوثائق بدقة قبل الشروع في التسجيل.</p>
          </div>
          <div className="flex items-center gap-3 bg-[#F8F9FA] border border-gray-200 px-4 py-2 rounded-2xl">
            <div className="text-left">
              <span className="text-xs font-bold text-gray-400 block">نسبة الاستعداد</span>
              <span className={`text-sm font-extrabold ${textThemeColor}`}>{percentComplete}%</span>
            </div>
            <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div 
                className={`${progressBgColor} h-full transition-all duration-300`}
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Document list accordion-style */}
        <div className="flex flex-col gap-4">
          {relevantDocs.map((doc, idx) => {
            const isChecked = !!checkedDocs[doc.name];
            return (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isChecked 
                    ? borderActiveColor + " shadow-sm" 
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    id={`check-doc-btn-${idx}`}
                    onClick={() => toggleDoc(doc.name)}
                    className="mt-0.5 shrink-0 transition-transform active:scale-95"
                    aria-label={`تحديد ${doc.name}`}
                  >
                    {isChecked ? (
                      <div className={`w-6 h-6 rounded-lg ${isGoogle ? "bg-green-500" : "bg-black"} text-white flex items-center justify-center`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : (
                      <div className={`w-6 h-6 rounded-lg border-2 border-gray-200 hover:${isGoogle ? "border-green-400" : "border-black"} bg-white`}></div>
                    )}
                  </button>

                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h4 className="font-bold text-gray-800 text-base">{doc.name}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badgeClass}`}>
                        {doc.requiredFor === "both" ? "مشترك" : doc.requiredFor === "individual" ? "حساب شخصي" : "حساب شركة"}
                      </span>
                    </div>

                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3">
                      {doc.description}
                    </p>

                    <div className="p-3 bg-[#F8F9FA] rounded-xl border border-gray-200 mb-3 text-xs leading-relaxed text-gray-600">
                      🎯 <strong className="text-gray-800 font-bold">لماذا هي مهمة؟</strong> {doc.importance}
                    </div>

                    {/* Pro Tip on photo/upload */}
                    <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200 text-xs">
                      <span className="font-bold text-amber-800 block mb-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" /> قواعد التصوير والتحقق لتفادي الرفض:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 leading-relaxed pr-3">
                        {doc.tips.map((tip, tipIdx) => (
                          <li key={tipIdx} className="mr-3">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
