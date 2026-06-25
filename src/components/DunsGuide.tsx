import React from "react";
import { 
  Building2, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  Info, 
  Search, 
  Compass, 
  HelpCircle, 
  CheckCircle2, 
  ArrowLeftRight 
} from "lucide-react";

interface DunsGuideProps {
  platform: "google" | "apple";
}

export default function DunsGuide({ platform }: DunsGuideProps) {
  const isGoogle = platform === "google";

  const requirements = [
    {
      title: "الاسم القانوني الرسمي للشركة",
      desc: "يجب أن يطابق تماماً الاسم المسجل في السجل التجاري الرسمي للشركة باللغة الإنجليزية."
    },
    {
      title: "السجل التجاري أو رخصة التأسيس",
      desc: "نسخة ملونة وواضحة جداً صادرة عن وزارة التجارة أو الجهة التنظيمية في دولتك."
    },
    {
      title: "العنوان الجغرافي الفعلي بالتفصيل",
      desc: "اسم الشارع، رقم المبنى، الحي، المدينة، الرمز البريدي، وصندوق البريد (إن وجد) لربطه مع الخرائط العالمية."
    },
    {
      title: "بيانات الاتصال والمسؤول القانوني",
      desc: "رقم هاتف مفعل للشركة، والبريد الإلكتروني الرسمي للشركة (لا يقبل بريد Gmail/Outlook لآبل)، واسم المدير أو المالك المصرح له بالتوقيع."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "البحث عن رقم شركتك أولاً",
      desc: "قد تكون شركتك تمتلك رقماً مسجلاً بالفعل دون علمك نتيجة تعاملات دولية سابقة. ابحث عنه في قاعدة بيانات D&B الرسمية لتجنب الازدواجية والتأخير.",
      badge: "دقيقة واحدة"
    },
    {
      number: "2",
      title: "تقديم طلب مجاني جديد",
      desc: "إذا لم تجد رقماً، قم بتقديم طلب جديد لربطه بملف جوجل أو آبل. توفر المنصتان روابط مخصصة للشركاء للحصول عليه مجاناً بالكامل دون أي رسوم.",
      badge: "5 دقائق"
    },
    {
      number: "3",
      title: "التحقق الهاتفي ومراجعة المستندات",
      desc: "سيقوم موظف من مؤسسة Dun & Bradstreet بالاتصال بك هاتفياً أو عبر البريد الإلكتروني للتأكد من هويتك وصلاحية السجل التجاري الذي رفعته.",
      badge: "2 - 5 أيام عمل"
    },
    {
      number: "4",
      title: "استلام الرمز وتفعيله",
      desc: "ستتلقى رقم الـ D-U-N-S المكون من 9 خانات عبر البريد الإلكتروني. انتظر من 5 إلى 14 يوماً حتى تتزامن قاعدة بيانات D&B مع خوادم آبل وجوجل قبل إدخاله ببوابة المطورين.",
      badge: "تزامن أمني"
    }
  ];

  const links = [
    {
      label: "البحث عن رقم DUNS الحالي لشركتك",
      url: "https://www.dnb.com/duns-number/lookup.html",
      desc: "بوابة البحث العالمية لمعرفة ما إذا كانت شركتك مدرجة مسبقاً في قاعدة البيانات العالمية.",
      actionText: "البحث الآن"
    },
    {
      label: "رابط طلب DUNS المجاني لشركاء جوجل وآبل",
      url: "https://www.dnb.com/duns-number/get-a-duns-number.html",
      desc: "الصفحة الرسمية المخصصة لتقديم طلب الحصول على الرقم مجاناً لإنشاء حسابات المطورين المؤسسية.",
      actionText: "تقديم طلب مجاني"
    },
    {
      label: "مركز مساعدة جوجل لمتطلبات DUNS",
      url: "https://support.google.com/googleplay/android-developer/answer/13628312",
      desc: "دليل جوجل بلاي كونسول الرسمي الذي يشرح توافق بيانات الـ DUNS وتجنب الرفض.",
      actionText: "عرض إرشادات جوجل"
    },
    {
      label: "إرشادات آبل الرسمية لرقم DUNS",
      url: "https://developer.apple.com/support/D-U-N-S/",
      desc: "الدليل الرسمي من آبل لتوضيح كيفية استخدام رقم DUNS في برنامج المطورين للشركات وتجنب تجميد الطلبات.",
      actionText: "عرض إرشادات آبل"
    }
  ];

  const bannerBg = isGoogle 
    ? "from-blue-700 via-blue-600 to-indigo-600" 
    : "from-gray-900 via-gray-800 to-black";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden" id="duns-guide-section">
      
      {/* Banner */}
      <div className={`relative h-64 sm:h-72 bg-gradient-to-r ${bannerBg} overflow-hidden flex items-center justify-between p-6 sm:p-8`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-2xl text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 mb-3">
            <Building2 className="w-3.5 h-3.5" /> إلزامي لحسابات الشركات في جوجل وآبل
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
            دليل الحصول على رقم الـ D-U-N-S مجاناً
          </h2>
          <p className="text-white/95 text-xs sm:text-sm leading-relaxed">
            رقم الـ D-U-N-S هو رقم تعريفي عالمي فريد مكون من 9 أرقام، تستخدمه جوجل وآبل للتحقق من الكيانات القانونية للشركات. إليك خريطة الطريق المعتمدة ومستنداتها لضمان قبول حسابك.
          </p>
        </div>

        <div className="hidden md:flex w-24 h-24 bg-white/15 rounded-2xl items-center justify-center text-white shrink-0 rotate-6 border border-white/10">
          <Building2 className="w-12 h-12 stroke-[1.5]" />
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Right side: Requirements and Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/80">
            <h3 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-700" />
              ما هو رقم D-U-N-S ولماذا تطلبه المتاجر؟
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              تختصر الكلمة عبارة (Data Universal Numbering System) وهي قاعدة بيانات عالمية تديرها مؤسسة **Dun & Bradstreet** الأمريكية. تطلبه جوجل وآبل للتأكد من أن شركتك حقيقية ولها سجل قانوني وموقع فعلي نشط على الأرض، وهو شرط إجباري لحساب المطور فئة (Organization).
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              المتطلبات والمستندات المطلوبة للتسجيل
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {requirements.map((req, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-150 bg-gray-50/40 hover:bg-white transition-all">
                  <h4 className="font-bold text-gray-800 text-xs sm:text-sm mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    {req.title}
                  </h4>
                  <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed mr-4">
                    {req.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Left side: Timeline Steps and Actionable Links */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Timeline steps */}
          <div>
            <h3 className="font-bold text-gray-800 text-base mb-5 flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              خطوات التقديم للحصول على الرقم (خريطة زمنية)
            </h3>
            <div className="relative border-r-2 border-gray-100 pr-5 mr-3 space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="relative text-right">
                  {/* Step icon/number */}
                  <div className="absolute -right-[31px] top-0 w-6 h-6 rounded-full bg-blue-50 border-2 border-blue-600 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    {step.number}
                  </div>
                  
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h4 className="font-bold text-gray-800 text-xs sm:text-sm pr-1">
                      {step.title}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed pr-1">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links Box */}
          <div className="bg-[#F8F9FA] rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 text-base mb-1.5 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-emerald-600" />
              الروابط والمصادر الرسمية التي ستحتاجها
            </h3>
            <p className="text-gray-450 text-xs mb-4">
              نوصي باستخدام الروابط المباشرة التالية مباشرة بدلاً من البحث في محركات البحث لتفادي مواقع التصيد أو العروض المدفوعة الزائفة.
            </p>

            <div className="space-y-4">
              {links.map((link, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-4 rounded-xl border border-gray-250 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm hover:border-gray-900 transition-all"
                >
                  <div className="flex-1 text-right">
                    <h4 className="font-bold text-gray-800 text-xs sm:text-sm flex items-center gap-1.5">
                      {link.label}
                    </h4>
                    <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5 leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start sm:self-center bg-black hover:bg-gray-850 text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <span>{link.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Tip Banner */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 text-xs">
            <h4 className="font-bold text-amber-800 mb-1 flex items-center gap-1">
              ⚠️ تنبيه أمني حاسم جداً للشركات في جوجل وآبل:
            </h4>
            <p className="text-gray-600 leading-relaxed">
              عند إدخال بيانات الـ DUNS في Google Play Console أو Apple Developer Portal، يجب أن يتطابق الاسم التجاري والعنوان حرفاً بحرف وبنفس الإملاء والرموز تماماً كما يظهر في كشف DUNS. أي اختلاف بسيط (مثل استخدام "Ltd" بدلاً من "Limited" أو تغيير ترتيب الكلمات) سيؤدي إلى فشل المزامنة الأوتوماتيكية ورفض طلبك فوراً!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
