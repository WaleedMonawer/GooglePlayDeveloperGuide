import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to prevent crash if key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API: AI Developer Advisor
app.post("/api/advisor", async (req, res) => {
  try {
    const { message, history, platform = "google" } = req.body;
    if (!message) {
      res.status(400).json({ error: "الرجاء تزويد نص السؤال" });
      return;
    }

    const isGoogle = platform === "google";

    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      // Return a simulated high-quality assistant response if Gemini API Key is not configured yet
      console.warn("Gemini API key is not configured. Falling back to simulated helpful advisor.");
      
      let answer = "";
      if (isGoogle) {
        answer = `أهلاً بك! لم يتم تهيئة مفتاح API الخاص بـ Gemini حتى الآن (أو أن مفتاح GEMINI_API_KEY غير متوفر في الإعدادات)، ولكن بصفتي مستشار جوجل بلاي، سأجيبك بناءً على الدليل المدمج:

أنت تسأل عن: "${message}"

إليك إجابة سريعة ومفيدة لـ Google Play Console:
لإنشاء حساب مطور جوجل بلاي، يجب عليك دفع رسوم قدرها 25 دولاراً لمرة واحدة. 
إذا كنت تسجل كفرد (حساب شخصي)، فستحتاج إلى:
1. إثبات هوية (جواز سفر أو بطاقة هوية وطنية سارية المفعول).
2. إثبات عنوان (فاتورة مرافق أو كشف حساب بنكي يظهر اسمك وعنوانك بوضوح).
3. بطاقة ائتمانية صالحة لدفع الرسوم.

أما إذا كنت شركة، فستحتاج إلى:
1. رقم D-U-N-S (رقم معرف فريد لشركتك).
2. مستندات التسجيل التجاري الرسمية.
3. تفاصيل الشخص المفوض وصاحب الحساب لتوثيق هويته.

هل ترغب في معرفة المزيد عن خطوات التحقق بالتحديد؟ يمكنك تفعيل مفتاح Gemini في لوحة التحكم للحصول على إجابات مخصصة وتفاعلية بالكامل!`;
      } else {
        answer = `أهلاً بك! لم يتم تهيئة مفتاح API الخاص بـ Gemini حتى الآن (أو أن مفتاح GEMINI_API_KEY غير متوفر في الإعدادات)، ولكن بصفتي مستشار برنامج مطوري آبل، سأجيبك بناءً على الدليل المدمج لـ Apple Developer:

أنت تسأل عن: "${message}"

إليك إجابة سريعة ومفيدة لـ Apple Developer Program:
الاشتراك السنوي لآبل يبلغ 99 دولاراً أمريكياً سنوياً.
إذا كنت تسجل كفرد (حساب شخصي):
1. استخدم تطبيق Apple Developer الرسمي على الآيفون/الآيباد للتسجيل، فهو الأسرع والأنسب.
2. التحقق يتم بملامح الوجه (Face ID) وتصوير هوية حكومية سارية.
3. الاسم التجاري للمطور المعروض بالمتجر سيكون اسمك الشخصي القانوني.

أما إذا كنت تسجل كشركة أو مؤسسة:
1. رقم D-U-N-S إلزامي ومطابق لاسم الشركة تماماً.
2. يجب توفير موقع إلكتروني رسمي للشركة وبريد إلكتروني بنطاق الشركة (لا يقبل بريد مجاني مثل Gmail).
3. مكالمة هاتفية دولية باللغة الإنجليزية لتأكيد تفويض الشخص مقدم الطلب وتفعيل الحساب.

تواصل معنا بعد تفعيل مفتاح Gemini للحصول على توجيهات مفصلة وخاصة بحالتك بدقة كاملة!`;
      }
      
      res.json({ text: answer });
      return;
    }

    // Prepare system instructions depending on platform
    let systemInstruction = "";
    if (isGoogle) {
      systemInstruction = `أنت خبير ومستشار تقني متخصص في منصة Google Play Console وجوجل بلاي للمطورين. 
مهمتك هي مساعدة المستخدمين العرب في فهم خطوات فتح حساب مطور جوجل بلاي (سواء كان حساباً شخصياً Individual أو حساب شركة Organization) بالتفصيل الشديد وحل أي مشاكل تواجههم في التحقق من الهوية (Identity Verification)، أو الأوراق المطلوبة، أو رقم D-U-N-S، أو مشاكل الدفع، أو سياسات جوجل بلاي.

القواعد التي يجب أن تلتزم بها:
1. أجب باللغة العربية الفصحى بأسلوب مهني، دقيق، وودود للغاية ومبسط.
2. وجه المستخدم دائماً لأفضل الممارسات لضمان قبول حسابه من المرة الأولى بدون حظر أو رفض.
3. إذا سأل عن الأوراق المطلوبة، وضح له أهمية مطابقة الاسم والعنوان المكتوبين في جوجل بلاي مع ما هو مكتوب في الوثائق الرسمية حرفياً (حرف بحرف).
4. وضح الفروق الجوهرية بين الحساب الشخصي (يتطلب 20 مختبراً على الأقل لمدة 14 يوماً متواصلة قبل نشر التطبيق) وحساب الشركات (لا يتطلب هذه الـ 14 يوماً ولكن يتطلب رقم DUNS وسجل تجاري).
5. قدم نصائح حول جودة تصوير الوثائق (دون لمعان، زوايا واضحة، دقة عالية، عدم تعديل الصورة رقمياً).`;
    } else {
      systemInstruction = `أنت خبير ومستشار تقني متخصص في برنامج مطوري آبل Apple Developer Program ومتجر التطبيقات App Store Connect. 
مهمتك هي مساعدة المستخدمين العرب في فهم خطوات فتح حساب مطور آبل (سواء كان حساباً شخصياً Individual أو حساب شركة Organization) بالتفصيل الشديد وحل أي مشاكل تواجههم في التحقق من الهوية، أو الأوراق المطلوبة، أو رقم D-U-N-S، أو مشاكل الدفع، أو سياسات متجر تطبيقات آبل.

القواعد التي يجب أن تلتزم بها:
1. أجب باللغة العربية الفصحى بأسلوب مهني، دقيق، وودود للغاية ومبسط ومكتمل.
2. وجه المستخدم دائماً لأفضل الممارسات لضمان قبول حسابه من المرة الأولى بدون حظر أو رفض.
3. وضح أهمية تفعيل التحقق بخطوتين (2FA) على حساب Apple ID كخطوة إلزامية أولى.
4. وضح للأفراد ضرورة تنزيل تطبيق Apple Developer والتسجيل من خلاله واستخدام التحقق الحي للوجه ومسح الهوية لتقليل فرصة تعليق الحساب.
5. للشركات، ركز بشدة على ضرورة امتلاك رقم D-U-N-S مطابق تماماً، موقع ويب رسمي نشط، وإيميل بنطاق الشركة (مثال: developer@company.com - رفض تام لـ Gmail/Outlook).
6. وضح متطلبات الدفع السنوية ($99) وخطوة التحقق الهاتفي بمكالمة دولية باللغة الإنجليزية لتأكيد تفويض الممثل الإداري للشركة.`;
    }

    // Format chat history for Gemini API if provided
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "حدث خطأ أثناء معالجة طلبك" });
  }
});

// Serve static assets and handle routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
