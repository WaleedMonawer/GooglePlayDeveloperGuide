import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Phone, MapPin, CreditCard, Mail, HelpCircle, Eye, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";

interface FieldTip {
  title: string;
  rule: string;
  danger: string;
  checklist: string[];
}

interface WizardSimulatorProps {
  platform: "google" | "apple";
}

const FIELD_TIPS_GOOGLE: Record<string, FieldTip> = {
  devName: {
    title: "الاسم القانوني بالإنجليزية (Legal English Name)",
    rule: "يجب كتابة الاسم باللغة الإنجليزية حصراً وبنفس التهجئة (Spelling) المكتوبة في جواز السفر الدولي أو بطاقتك الذكية. جواز السفر يحتوي الاسمين معاً، لكن المتاجر الدولية ومطابقة المدفوعات لا تقبل إلا الحروف الإنجليزية.",
    danger: "أي اختلاف ولو بحرف واحد أو مسافة أو كتابته بالعربية سيؤدي لرفض التحقق المالي وتأخر الحساب لأسابيع أو حظره بتهمة الهوية المزيفة.",
    checklist: [
      "تطابق الاسم حرفياً مع جواز السفر بالإنجليزية.",
      "تجنب استخدام اللغة العربية تماماً في حقول الاسم.",
      "تطابق الاسم مع بطاقة الدفع ومع الحساب البنكي."
    ]
  },
  phone: {
    title: "طريقة كتابة رقم الهاتف وشروط تفعيله (Verified Phone Number)",
    rule: "يجب كتابة رقم الهاتف بالصيغة الدولية القياسية الكاملة التي تبدأ بـ (+) يليه رمز الدولة بدون أي أصفار إضافية أو رموز خاصة (مثال للسعودية: +966501234567 وليس 00966501234567 أو +9660501234567). يجب أن يكون الخط حقيقياً مسجلاً باسمك ومفعلاً لاستقبال الرسائل الدولية (OTP) والاتصالات المباشرة.",
    danger: "ممنوع استخدام أرقام الهواتف الوهمية أو الافتراضية (VoIP) مثل أرقام التطبيقات وبرامج الـ eSIM غير الموثقة، وكذلك الأرقام المرتبطة سابقاً بحسابات مطورين مغلقة، حيث يكتشف نظام جوجل الأمني ذلك ويغلق الحساب الجديد فوراً لارتباطه بنشاط مشبوه.",
    checklist: [
      "اكتب الرقم بالصيغة الدولية النظيفة: (+) ثم رمز الدولة ثم رقم الجوال مباشرة بدون الصفر الأول.",
      "تأكد أن الشريحة SIM نشطة ومثبتة بهاتفك لاستقبال رمز التحقق المكون من 6 أرقام.",
      "تجنب تماماً استخدام رقم هاتف تم استخدامه سابقاً في أي حساب مطور آخر تضرر أو تم حظره.",
      "لا تضع أقواس () أو شرطات - قد تشوش على نظام الإرسال التلقائي لجوجل."
    ]
  },
  address: {
    title: "صيغة كتابة العنوان وتطابقه الذهبي (Detailed Address Rules)",
    rule: "اكتب العنوان باللغة الإنجليزية ومقسم كالتالي: [سطر العنوان الأول]: اسم الشارع ورقم المبنى إن وجد. [سطر العنوان الثاني]: اسم الحي ومعلم مميز (مثال: Al-Olaya District, Opposite Kingdom Tower). [الرمز البريدي (Postal Code)]: إلزامي ويجب مطابقته تماماً لكشف الحساب البنكي. في الدول التي لا تدعم رموزاً بريدية فعلية (مثل اليمن وليبيا)، أدخل رمز منطقتك الرئيسي أو الرمز الدولي العام للبلد أو 00000 أو 11111 كحل قياسي معتمد.",
    danger: "السرعة والسهولة في القبول تعتمد 100% على مطابقة العنوان المكتوب في هذا الحقل حرفاً بحرف مع العنوان المكتوب في المستند الذي سترفعه (كشف حساب بنكي أو فاتورة خدمات). أي اختلاف في التهجئة أو الرموز البريدية سيؤدي للرفض اليدوي الفوري.",
    checklist: [
      "تطابق تهجئة العنوان بالإنجليزية بنسبة 100% مع كشف الحساب البنكي أو العنوان الوطني (سبل).",
      "قسّم العنوان لخطين لمنع تكدس الكلمات وتسهيل قراءته بواسطة أنظمة التحقق الذكية.",
      "أدخل الرمز البريدي الصحيح المكون من 5 أرقام، وتجنب الرموز العشوائية.",
      "تأكد من أن كشف الحساب البنكي الذي تطلبه من بنكك يحتوي على نفس العنوان وبنفس اللغة الإنجليزية."
    ]
  },
  paymentCard: {
    title: "ملف الدفع وبطاقة الائتمان (Payments Profile Rules)",
    rule: "يجب ملء حقول ملف الدفع (الاسم، العنوان، البلد) بحيث تتطابق تماماً مع بيانات التسجيل. ويجب أن تكون البطاقة باسمك ومربوطة بحسابك البنكي الشخصي.",
    danger: "استخدام بطاقة شخص آخر (أخ، صديق, إلخ) أو بطاقة من بلد يختلف عن بلد حسابك المطور، هو السبب الرئيسي والأسرع للإغلاق الفوري بتهمة الاحتيال والحسابات المرتبطة المشبوهة.",
    checklist: [
      "البطاقة مسجلة باسمك الشخصي وتطابق هويتك.",
      "البطاقة صادرة من نفس البلد المختار للحساب.",
      "بيانات ملف الدفع مطابقة لحساب المطور 100%."
    ]
  },
  contactEmail: {
    title: "البريد الإلكتروني المخصص للمستخدمين (Public Contact Email)",
    rule: "هذا البريد سيكون ظاهراً للعامة على صفحة تطبيقك في متجر جوجل بلاي. يجب أن يكون بريداً احترافياً نشطاً ومستقراً لاستقبال استفسارات وشكاوى المستخدمين.",
    danger: "وضع بريد غير صالح أو بريد يحتوي على كلمات عشوائية يعطي انطباعاً سيئاً للجمهور وقد يتسبب في رفض التطبيقات أثناء المراجعة لعدم كفاية الدعم الفني.",
    checklist: [
      "بريد يسهل تذكره ويخص العمل.",
      "يتم فحصه بانتظام وبشكل يومي.",
      "مختلف عن البريد الأساسي لإدارة الحساب لزيادة الأمان."
    ]
  }
};

const FIELD_TIPS_APPLE: Record<string, FieldTip> = {
  devName: {
    title: "اسم المطور الفردي أو الكيانات بآبل (Apple ID Name)",
    rule: "يجب أن يتطابق الاسم باللغة الإنجليزية تماماً مع جواز السفر. في حسابات الشركات، يجب كتابة اسم الشركة القانوني المطابق لرقم DUNS والسجل التجاري حرفاً بحرف.",
    danger: "آبل ترفض الحسابات فوراً في حال اختلاف الاسم بالإنجليزية عن الهوية أو في حال وجود اختلافات بمسافة واحدة في اسم الشركة مع DUNS.",
    checklist: [
      "الاسم يكتب بالإنجليزية المطابقة لجواز السفر.",
      "تطابق تام لاسم الشركة مع شهادة DUNS والسجل.",
      "اسم المطور يظهر للعامة كما هو مسجل بالإنجليزية."
    ]
  },
  phone: {
    title: "طريقة كتابة رقم الهاتف واستقبل اتصالات آبل (Apple Verification Phone)",
    rule: "أدخل رقم هاتفك الدولي بتمثيل واضح يبدأ برمز الدولة (مثال: +966501234567). لابد أن تكون الشريحة فعالة وتدعم تفعيل المصادقة الثنائية (2FA) لآبل. للشركات، يجب أن يكون الهاتف قادراً على استقبال المكالمات الهاتفية الدولية المباشرة من ممثلي آبل للتحقق والتفويض البشري باللغة الإنجليزية.",
    danger: "تقديم هاتف مغلق، أو وضع هاتف لشخص لا يتكلم الإنجليزية (في حساب الشركات)، أو استخدام هاتف وهمي يؤدي لتعليق فوري لطلب التسجيل وإلغاء المعاملة المالية بعد عدة محاولات اتصال فاشلة.",
    checklist: [
      "صيغة الإدخال تبدأ بـ (+) تليها مقدمة الدولة ثم الرقم الفعلي (احذف الصفر الذي يبدأ به رقم الجوال محلياً).",
      "تأكد أن خطك يدعم استقبال المكالمات الدولية الواردة من الولايات المتحدة أو أيرلندا بنجاح.",
      "لحسابات الشركات: الشخص صاحب الرقم يجب أن يكون مطلعاً على تفاصيل الطلب وجاهزاً للرد لتأكيد الصلاحية والمنصب القانوني.",
      "تفعيل ميزة المصادقة الثنائية (2FA) المرتبطة برقم الهاتف هذا على جهازك الآيفون."
    ]
  },
  address: {
    title: "صياغة العنوان المعتمد في برنامج آبل (Apple Billing & Registration Address)",
    rule: "اكتب عنوانك بالتفصيل باللغة الإنجليزية. قسّم الحقول بدقة: [Address Line 1] لاسم الشارع ورقم السكن، و [Address Line 2] لاسم الحي أو المنطقة وعلامات الدلالة البارزة. لابد أن يتطابق هذا العنوان تماماً مع عنوان الفوترة (Billing Address) لبطاقة الدفع ومع العنوان المذكور في كشف الحساب البنكي أو مستند السجل التجاري للشركة.",
    danger: "آبل صارمة جداً في مراجعة العناوين لمكافحة الحسابات الوهمية. وجود أي فرق بين العنوان في ملف المطور وعنوان كشف الحساب البنكي المترجم المرفوع يضع طلبك في حالة تعليق ويطلب منك تصحيح الأوراق مجدداً.",
    checklist: [
      "تطابق العنوان حرفياً مع مستند كشف الحساب البنكي أو العنوان الوطني.",
      "استخدام رمز بريدي حقيقي ودقيق للمنطقة، أو استخدام الرمز العام للمدينة / 00000 في حال عدم وجود نظام بريدي محلي.",
      "احرص على كتابة اسم الدولة والمدينة بدقة لتجنب أخطاء الفرز التلقائي.",
      "للشركات: يجب أن يتطابق العنوان المكتوب في طلب آبل بنسبة 100% مع عنوان الشركة المسجل في شهادة الـ DUNS الدولية."
    ]
  },
  paymentCard: {
    title: "ملف الدفع لآبل والبطاقة السنوية ($99)",
    rule: "يجب دفع رسوم آبل السنوية باستخدام بطاقة ائتمانية دولية باسم المطور نفسه. ويجب أن تتطابق معلومات ملف دفع آبل (Billing Info) مع اسم المطور.",
    danger: "استخدام بطاقات دفع من دول أخرى أو باسم شخص آخر، يؤدي لرفض العملية فوراً ورفض طلب المطور بأكمله من قبل قطاع الأمان بآبل.",
    checklist: [
      "البطاقة باسم صاحب الحساب وتطابق جواز سفره.",
      "البطاقة من نفس بلد تسجيل حساب المطور.",
      "دعم الدفع الدولي المتكرر (Recurring Online Payment)."
    ]
  },
  contactEmail: {
    title: "البريد الإلكتروني للشركات ونطاق الاتصال (Official Org Email)",
    rule: "تفرض آبل على الشركات التسجيل ببريد إلكتروني رسمي ذي نطاق مخصص للشركة (مثال: apple@mycompany.com). لا تقبل الإيميلات المجانية.",
    danger: "استخدام بريد Gmail أو Outlook أو Yahoo عند التقديم لحساب شركة (Organization) سيتم رفضه فوراً قبل البدء بفحص الأوراق.",
    checklist: [
      "بريد رسمي مرتبط بنطاق موقع الشركة الموثق.",
      "موقع الويب للنطاق نشط ويحتوي على طرق تواصل واضحة.",
      "عدم استخدام إيميل شخصي مسجل به مطورون آخرون."
    ]
  }
};

export default function WizardSimulator({ platform }: WizardSimulatorProps) {
  const [activeField, setActiveField] = useState<string>("devName");
  const [formData, setFormData] = useState({
    devName: "",
    phone: "",
    address: "",
    paymentCard: "",
    contactEmail: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const isGoogle = platform === "google";
  const fieldTipsSource = isGoogle ? FIELD_TIPS_GOOGLE : FIELD_TIPS_APPLE;
  const selectedTip = fieldTipsSource[activeField];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const themeColorClass = isGoogle ? "border-purple-500 ring-purple-100" : "border-black ring-gray-100";
  const focusTextClass = isGoogle ? "text-purple-500" : "text-gray-900";
  const btnClass = isGoogle 
    ? "bg-[#1A73E8] hover:bg-blue-700" 
    : "bg-black hover:bg-gray-800";
  const bannerBg = isGoogle 
    ? "from-purple-600 to-indigo-500" 
    : "from-gray-900 via-gray-800 to-black";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden" id="wizard-simulator">
      {/* Visual Header Banner */}
      <div className={`relative h-64 sm:h-80 bg-gradient-to-r ${bannerBg} overflow-hidden flex items-center justify-between p-8`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-xl text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md mb-3">
            <Eye className="w-3.5 h-3.5" /> محاكاة عملية تفاعلية
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
            محاكي تسجيل حساب مطور {isGoogle ? "جوجل بلاي" : "مطور آبل"}
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            تدرب على ملء البيانات الأساسية لطلبك هنا واكتشف التنبيهات والأخطاء الشائعة فوراً قبل تقديم طلبك الفعلي لتضمن قبولاً مؤكداً بنسبة 100%!
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Interactive Panel */}
          <form onSubmit={handleCheckSubmission} className="lg:col-span-7 flex flex-col gap-6">
            <h3 className={`font-bold text-gray-800 text-lg border-r-4 ${isGoogle ? "border-purple-500" : "border-black"} pr-3`}>
              نموذج البيانات الأساسية (محاكاة كونسول {isGoogle ? "Google Play" : "Apple Developer"})
            </h3>
            
            {/* Developer Name Field */}
            <div 
              className={`flex flex-col gap-1.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                activeField === "devName" 
                  ? `${themeColorClass} bg-purple-50/5 ring-2` 
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => setActiveField("devName")}
            >
              <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                <User className={`w-4 h-4 ${activeField === "devName" ? focusTextClass : "text-gray-400"}`} />
                <span>الاسم القانوني بالكامل (Legal Developer Name) *</span>
              </label>
              <input
                id="sim-dev-name"
                type="text"
                value={formData.devName}
                onChange={(e) => handleInputChange("devName", e.target.value)}
                placeholder={isGoogle ? "مثال: Ahmed Bin Khalid Al-Ghamdi" : "مثال بالإنجليزية: Ahmed Al-Harbi (أو اسم الشركة القانوني)"}
                className="bg-transparent text-sm font-semibold text-gray-800 border-none outline-none p-1 placeholder:text-gray-300 w-full"
              />
            </div>

            {/* Phone Number Field */}
            <div 
              className={`flex flex-col gap-1.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                activeField === "phone" 
                  ? `${themeColorClass} bg-purple-50/5 ring-2` 
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => setActiveField("phone")}
            >
              <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                <Phone className={`w-4 h-4 ${activeField === "phone" ? focusTextClass : "text-gray-400"}`} />
                <span>رقم الهاتف الدولي للتحقق (OTP Phone) *</span>
              </label>
              <input
                id="sim-phone"
                type="text"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="مثال: +966 50 123 4567"
                className="bg-transparent text-sm font-semibold text-gray-800 border-none outline-none p-1 placeholder:text-slate-300 w-full"
              />
            </div>

            {/* Address Field */}
            <div 
              className={`flex flex-col gap-1.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                activeField === "address" 
                  ? `${themeColorClass} bg-purple-50/5 ring-2` 
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => setActiveField("address")}
            >
              <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${activeField === "address" ? focusTextClass : "text-gray-400"}`} />
                <span>عنوان السكن / المقر الرئيسي بالتفصيل *</span>
              </label>
              <input
                id="sim-address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="الشارع، الحي، الرمز البريدي، المدينة، الدولة"
                className="bg-transparent text-sm font-semibold text-gray-800 border-none outline-none p-1 placeholder:text-slate-300 w-full"
              />
            </div>

            {/* Payment Card Field */}
            <div 
              className={`flex flex-col gap-1.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                activeField === "paymentCard" 
                  ? `${themeColorClass} bg-purple-50/5 ring-2` 
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => setActiveField("paymentCard")}
            >
              <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                <CreditCard className={`w-4 h-4 ${activeField === "paymentCard" ? focusTextClass : "text-gray-400"}`} />
                <span>بطاقة الدفع للرسوم (Visa / MasterCard) *</span>
              </label>
              <input
                id="sim-payment-card"
                type="text"
                value={formData.paymentCard}
                onChange={(e) => handleInputChange("paymentCard", e.target.value)}
                placeholder={isGoogle ? "أدخل نوع البطاقة واسم البنك المصدر (لدفع 25 دولار)" : "بطاقة تدعم السحب الدولي السنوي (لدفع 99 دولار)"}
                className="bg-transparent text-sm font-semibold text-gray-800 border-none outline-none p-1 placeholder:text-slate-300 w-full"
              />
            </div>

            {/* Contact Email Field */}
            <div 
              className={`flex flex-col gap-1.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                activeField === "contactEmail" 
                  ? `${themeColorClass} bg-purple-50/5 ring-2` 
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => setActiveField("contactEmail")}
            >
              <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                <Mail className={`w-4 h-4 ${activeField === "contactEmail" ? focusTextClass : "text-gray-400"}`} />
                <span>بريد الدعم والاتصال العام (Public Support Email) *</span>
              </label>
              <input
                id="sim-contact-email"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                placeholder={isGoogle ? "مثال: support@mycompany.com" : "للشركات: يجب بريد رسمي بنطاق الشركة الفعلي"}
                className="bg-transparent text-sm font-semibold text-gray-800 border-none outline-none p-1 placeholder:text-slate-300 w-full"
              />
            </div>

            <button
              id="sim-submit-btn"
              type="submit"
              className={`w-full ${btnClass} text-white font-bold py-4 rounded-xl shadow-sm transition-all text-sm active:scale-[0.98] cursor-pointer`}
            >
              اختبر جهوزية البيانات للقبول في {isGoogle ? "جوجل بلاي" : "آبل ديفتولز"} 🚀
            </button>
          </form>

          {/* Live Advisor Tip Panel (Right side) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-50 border border-green-200 rounded-3xl p-6 h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-extrabold text-green-900 text-lg mb-2">تهانينا! فحص أولي ناجح للبيانات</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                    بناءً على فهمك للنصائح الذهبية وتجنب الممارسات الخاطئة، معلوماتك الآن مطابقة للمعايير المطلوبة. تأكد من إدخال هذه الأوراق والمستندات ومطابقتها حرفياً على بوابة المطورين الرسمية!
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-green-100 flex items-center gap-2 text-xs text-green-700 font-bold shadow-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" /> جاهز للتسجيل الفعلي!
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeField + platform}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#F8F9FA] border border-gray-200 rounded-3xl p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <HelpCircle className={`w-5 h-5 ${isGoogle ? "text-purple-600" : "text-gray-800"} shrink-0`} />
                      <span className={`text-xs font-bold ${isGoogle ? "text-purple-600" : "text-gray-800"} uppercase tracking-wide`}>
                        توجيهات {isGoogle ? "جوجل بلاي" : "آبل"} الذكية
                      </span>
                    </div>

                    <h4 className="font-extrabold text-gray-800 text-base mb-3 leading-tight">
                      {selectedTip?.title}
                    </h4>

                    {/* Rule */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-xs leading-relaxed text-gray-600 mb-4">
                      💡 <strong className="text-gray-800 font-bold">الممارسة الصحيحة:</strong> {selectedTip?.rule}
                    </div>

                    {/* Warning/Danger */}
                    <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 text-xs leading-relaxed text-rose-700 mb-4">
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>مكمن الخطر والرفض (Risk Factor):</span>
                      </div>
                      {selectedTip?.danger}
                    </div>
                  </div>

                  {/* Checklist requirements for this field */}
                  <div className="pt-4 border-t border-gray-200">
                    <span className="text-xs font-bold text-gray-400 block mb-2.5">قائمة المراقبة والتحقق:</span>
                    <ul className="flex flex-col gap-2">
                      {selectedTip?.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className={`w-1.5 h-1.5 rounded-full ${isGoogle ? "bg-purple-500" : "bg-black"} shrink-0`}></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
