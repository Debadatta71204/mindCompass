/**
 * MindCompass — education.js
 * Module 3: Caregiver Support & DSM-5 Psychoeducation
 * Exports: renderEducationModule(containerId, activeDisorder, currentLang)
 *
 * Content sources: DSM-5 clinical framework, academic non-clinical reference only. [cite: 8, 108]
 * All content is informational. No clinical advice, diagnosis, or medication guidance. [cite: 106]
 */

// ─────────────────────────────────────────────────────────────────────
// Multi-Language DSM-5 Psychoeducation Data Matrix (FIXED NAME)
// ─────────────────────────────────────────────────────────────────────
export const EDUCATION_DATA = {

  // ===================================================================
  // TRACK 1: DEMENTIA / MAJOR NEUROCOGNITIVE DISORDER
  // ===================================================================
  dementia: {
    en: {
      title: "Dementia / Major Neurocognitive Disorder",
      sections: [
        {
          eyebrow: "DSM-5 Domain Overview",
          title: "Understanding Major Neurocognitive Disorder (Major NCD)",
          body: `<p>The DSM-5 classifies <strong>Major Neurocognitive Disorder (Major NCD)</strong>—commonly referred to as dementia—as a condition involving significant cognitive decline from a previous level of performance in one or more cognitive domains: complex attention, executive function, learning and memory, language, perceptual-motor, or social cognition[cite: 12, 15]. The primary defining clinical feature under Criterion B is that the cognitive deficits are substantial enough to <strong>interfere with independence in everyday activities</strong>[cite: 15]. This means the individual requires assistance with instrumental activities of daily living (IADLs), such as managing finances, tracking complex medication schedules, or navigating unfamiliar environments[cite: 15]. The decline represents a clear shift from the individual's baseline and cannot occur exclusively in the context of delirium[cite: 12, 15].</p>`
        },
        {
          eyebrow: "Creative & Psychosocial Support",
          title: "Reminiscence Therapy Frameworks",
          body: `<p><strong>Reminiscence Therapy (RT)</strong> is an evidence-based, non-pharmacological psychosocial intervention that utilizes preserved long-term autobiographical memory pathways often spared during early-to-moderate stages of neurocognitive decline[cite: 7, 20]. By using structural prompts such as old photographs, familiar objects, or music from the individual's lived era, RT triggers episodic networks to reinforce identity continuity, reduce depression, and lower behavioral agitation[cite: 21]. Structured formats include Life Story Books to preserve identity and Group Storytelling Circles to promote social engagement and mitigate isolation[cite: 21]. These creative sessions serve purely as non-clinical wellness support and do not reverse the underlying pathology[cite: 39].</p>`
        },
        {
          eyebrow: "Caregiver Guidance",
          title: "Tracking and Documenting Behavioral Gaps",
          body: `<p>Family members play a critical role in documenting objective behavioral indicators for subsequent professional review[cite: 39]. Key domains to observe include <strong>Memory Gaps</strong> (frequently misplacing items or asking identical questions repeatedly), <strong>Language Shifts</strong> (word-finding pauses or conversational drops), and <strong>Executive Function Friction</strong> (newly discovered struggles when planning multi-step tasks)[cite: 17]. Caregivers are strongly encouraged to maintain a chronological written log tracking these observable indicators to provide essential context during clinical diagnostic evaluations[cite: 39].</p>`
        },
        {
          eyebrow: "Professional Referral Pathways",
          title: "When and Where to Seek Professional Evaluation",
          body: `<p>If behavioral changes are consistently impacting everyday independent tasks, pursuing an objective clinical evaluation is a crucial step[cite: 15, 39]. Formal evaluations establish structural baselines and successfully rule out treatable, reversible medical mimics like metabolic imbalances or vitamin deficiencies[cite: 38]. Only certified clinicians can formally separate subtypes like Alzheimer's, Vascular, or Lewy Body dementia[cite: 38, 39].</p>`,
          pathway: "Recommended Consultation Path: Connect with a Geriatrician for complex age-related care, a Neurologist for neuroimaging assessments, or a Neuropsychologist for specialized cognitive testing batteries[cite: 39]."
        }
      ]
    },
    bn: {
      title: "ডিমেনশিয়া / মেজর নিউরোকগনিটিভ ডিসঅর্ডার",
      sections: [
        {
          eyebrow: "DSM-5 ডোমেন ওভারভিউ",
          title: "মেজর নিউরোকগনিটিভ ডিসঅর্ডার (Major NCD) বোঝা",
          body: `<p>DSM-5 নির্দেশিকা অনুযায়ী, <strong>মেজর নিউরোকগনিটিভ ডিসঅর্ডার (Major NCD)</strong>—যা সাধারণত ডিমেনশিয়া নামে পরিচিত—হলো এমন একটি অবস্থা যেখানে স্মৃতিশক্তি, ভাষা, মনোযোগ, বা সিদ্ধান্ত নেওয়ার ক্ষমতায় পূর্বের তুলনায় উল্লেখযোগ্য হ্রাস ঘটে [cite: 12, 15]। এর প্রধান ক্লিনিকাল বৈশিষ্ট্য (Criterion B) হলো, এই ঘাটতিগুলি <strong>দৈনন্দিন স্বাধীন কাজকর্ম পরিচালনায় বাধা সৃষ্টি করে</strong> [cite: 15]। অর্থাৎ, আর্থিক হিসাব রাখা, ওষুধ পরিচালনা বা পরিচিত রাস্তায় চলাচলের মতো জটিল কাজে ব্যক্তির অন্যের সহায়তার প্রয়োজন হয় [cite: 15]। এই মানসিক পরিবর্তনটি ব্যক্তির স্বাভাবিক বেসলাইনের থেকে সম্পূর্ণ আলাদা এবং এটি প্রলাপ (Delirium)-এর কারণে ঘটে না [cite: 15]।</p>`
        },
        {
          eyebrow: "সৃজনশীল ও সাইকোসোশ্যাল সহায়তা",
          title: "রেমিনিসেন্স থেরাপি (Reminiscence Therapy) ফ্রেমওয়ার্ক",
          body: `<p><strong>রেমিনিসেন্স থেরাপি (RT)</strong> হলো একটি প্রমাণ-ভিত্তিক, অ-ফার্মাকোলজিকাল পদ্ধতি যা ডিমেনশিয়ার প্রাথমিক থেকে মাঝারি স্তরে সংরক্ষিত দীর্ঘমেয়াদী স্মৃতিশক্তিকে কাজে লাগায় [cite: 7, 20]। পুরনো দিনের ছবি, পরিচিত বস্তু বা ব্যক্তির সমসাময়িক যুগের সঙ্গীতের মতো উদ্দীপক ব্যবহার করে এই থেরাপি বিষণ্ণতা ও মানসিক অস্থিরতা হ্রাস করে [cite: 21]। এর কাঠামোর মধ্যে রয়েছে লাইফ স্টোরি বুক (Life Story Books) এবং গ্রুপ স্টোরিটেলিং সার্কেল, যা সামাজিক সংযোগ বাড়াতে এবং একাকীত্ব দূর করতে সাহায্য করে [cite: 21]। এই সৃজনশীল সেশনগুলি কেবল সুস্থতা বজায় রাখার জন্য, এটি কোনো রোগ নিরাময় বা রিভার্স করে না [cite: 39]।</p>`
        },
        {
          eyebrow: "কেয়ারগিভারদের জন্য নির্দেশিকা",
          title: "আচরণগত পরিবর্তনগুলি ট্র্যাক ও নথিভুক্ত করা",
          body: `<p>ভবিষ্যতের পেশাদার মূল্যায়নের জন্য আচরণগত পরিবর্তনের বস্তুনিষ্ঠ তথ্য লিখে রাখা অত্যন্ত গুরুত্বপূর্ণ [cite: 39]। পর্যবেক্ষণ করার মতো মূল ক্ষেত্রগুলি হলো: <strong>স্মৃতির ঘাটতি</strong> (একই প্রশ্ন বারবার জিজ্ঞাসা করা বা জিনিসপত্র হারিয়ে ফেলা), <strong>ভাষার পরিবর্তন</strong> (কথা বলার সময় সঠিক শব্দ খুঁজে না পাওয়া), এবং <strong>এক্সিকিউটিভ ফাংশনের সমস্যা</strong> (পরিকল্পনা বা জটিল কাজ করতে অসুবিধা হওয়া) [cite: 17]। কেয়ারগিভারদের একটি ডায়েরি বা লগবুক বজায় রাখার পরামর্শ দেওয়া হচ্ছে যাতে এই পর্যবেক্ষণগুলি ক্লিনিকাল মূল্যায়নের সময় ডাক্তারদের সাহায্য করতে পারে [cite: 39]।</p>`
        },
        {
          eyebrow: "পেশাদার রেফারেল পাথওয়ে",
          title: "কখন এবং কোথায় পেশাদার মূল্যায়ন নেওয়া উচিত",
          body: `<p>যদি আচরণগত পরিবর্তনগুলি দৈনন্দিন স্বাধীন জীবনযাত্রাকে ব্যাহত করতে শুরু করে, তবে একটি সঠিক ক্লিনিকাল মূল্যায়ন করা অত্যন্ত জরুরি [cite: 15, 39]। এটি অন্যান্য নিরাময়যোগ্য ও সাময়িক চিকিৎসাগত সমস্যা (যেমন ভিটামিনের অভাব বা থাইরয়েডের সমস্যা) বাদ দিতে সাহায্য করে [cite: 38]। কোনো অ-সার্টিফাইড ব্যক্তি ডিমেনশিয়ার সাবটাইপ (যেমন অ্যালঝাইমার্স বা ভাস্কুলার) নির্ধারণ করতে পারেন না [cite: 38, 39]।</p>`,
          pathway: "পরামর্শ: বয়সজনিত জটিলতার জন্য জেরিয়াট্রিশিয়ান, মস্তিষ্কের ইমেজিংয়ের জন্য নিউরোলজিস্ট এবং বিস্তারিত কগনিটিভ পরীক্ষার জন্য নিউরোসাইকোলজিস্টের সাথে পরামর্শ করুন [cite: 39]।"
        }
      ]
    },
    hi: {
      title: "डिमेंशिया / मेजर न्यूरोकॉग्निटिव डिसऑर्डर",
      sections: [
        {
          eyebrow: "DSM-5 डोमेन अवलोकन",
          title: "मेजर न्यूरोकॉग्निटिव डिसऑर्डर (Major NCD) को समझना",
          body: `<p>DSM-5 के अनुसार, <strong>मेजर न्यूरोकॉग्निटिव डिसऑर्डर (Major NCD)</strong>—जिसे आमतौर पर डिमेंशिया कहा जाता है—स्मरण शक्ति, भाषा, ध्यान या निर्णय लेने की क्षमता में पिछले स्तर से महत्वपूर्ण गिरावट की स्थिति है [cite: 12, 15]। इसका मुख्य नैदानिक लक्षण (Criterion B) यह है कि यह गिरावट <strong>दैनिक जीवन के कार्यों को स्वतंत्र रूप से करने में बाधा डालती है</strong> [cite: 15]। इसका अर्थ है कि व्यक्ति को वित्तीय प्रबंधन, दवाएं समय पर लेने या परिचित स्थानों पर जाने जैसे जटिल कार्यों के लिए सहायता की आवश्यकता होती है [cite: 15]। यह परिवर्तन व्यक्ति के सामान्य बेसलाइन से अलग होता है और यह प्रलाप (Delirium) के कारण नहीं होता है [cite: 15]।</p>`
        },
        {
          eyebrow: "रचनात्मक और मनोसामाजिक सहायता",
          title: "स्मृति पुनरुत्थान चिकित्सा (Reminiscence Therapy) फ्रेमवर्क",
          body: `<p><strong>स्मृति पुनरुत्थान चिकित्सा (RT)</strong> एक साक्ष्य-आधारित, गैर-औषधीय मनोसामाजिक हस्तक्षेप है जो डिमेंशिया के शुरुआती से मध्यम चरणों में सुरक्षित रहने वाली दीर्घकालिक यादों को सक्रिय करता है [cite: 7, 20]। पुरानी तस्वीरों, परिचित वस्तुओं या व्यक्ति के समय के संगीत का उपयोग करके यह थेरेपी अवसाद और व्यवहारिक घबराहट को कम करती है [cite: 21]। इसके अंतर्गत लाइफ STORY बुक्स (Life Story Books) और ग्रुप स्टोरीटेलिंग सर्कल शामिल हैं, जो सामाजिक जुड़ाव बढ़ाते हैं [cite: 21]। ये सत्र केवल मानसिक कल्याण के लिए हैं, ये बीमारी को ठीक या उलटने का दावा नहीं करते हैं [cite: 39]।</p>`
        },
        {
          eyebrow: "देखभाल करने वालों के लिए मार्गदर्शन",
          title: "व्यवहारिक परिवर्तनों को ट्रैक और प्रलेखित करना",
          body: `<p>भविष्य के पेशेवर मूल्यांकन के लिए व्यवहारिक परिवर्तनों का लिखित रिकॉर्ड रखना अत्यंत मूल्यवान है [cite: 39]। नजर रखने योग्य मुख्य क्षेत्र हैं: <strong>स्मृति अंतराल</strong> (बार-बार एक ही प्रश्न पूछना या वस्तुएं खो देना), <strong>भाषा में बदलाव</strong> (बातचीत में सही शब्द खोजने में कठिनाई), और <strong>कार्यकारी क्षमता में कमी</strong> (जटिल कार्यों की योजना बनाने में परेशानी) [cite: 17]। देखभाल करने वालों को एक साधारण लिखित डायरी बनाए रखने की सलाह दी जाती है ताकि नैदानिक मूल्यांकन के दौरान डॉक्टरों को सही जानकारी मिल सके [cite: 39]।</p>`
        },
        {
          eyebrow: "पेशेवर रेफरल मार्ग",
          title: "कब और कहां पेशेवर मूल्यांकन प्राप्त करें",
          body: `<p>यदि व्यवहारिक बदलाव दैनिक स्वतंत्र कार्यों को प्रभावित कर रहे हैं, तो एक पेशेवर नैदानिक मूल्यांकन की ओर कदम बढ़ाना आवश्यक है [cite: 15, 39]। औपचारिक मूल्यांकन से अन्य इलाज योग्य समस्याओं (जैसे विटामिन की कमी या थायराइड) को खारिज किया जा सकता है [cite: 38]। कोई भी गैर-प्रमाणित व्यक्ति डिमेंशिया के उपप्रकारों (जैसे अल्जाइमर या संवहनी डिमेंशिया) का निर्धारण नहीं कर सकता [cite: 38, 39]।</p>`,
          pathway: "परामर्श मार्ग: उम्र से संबंधित जटिलताओं के लिए जेरियाट्रिशियन, ब्रेन इमेजिंग के लिए न्यूरोलॉजिस्ट और विस्तृत संज्ञानात्मक परीक्षण के लिए न्यूरोसाइकोलॉजिस्ट से संपर्क करें [cite: 39]।"
        }
      ]
    }
  },

  // ===================================================================
  // TRACK 2: ADHD (ATTENTION-DEFICIT / HYPERACTIVITY DISORDER)
  // ===================================================================
  adhd: {
    en: {
      title: "ADHD / Attention-Deficit / Hyperactivity Disorder",
      sections: [
        {
          eyebrow: "DSM-5 Domain Overview",
          title: "Understanding ADHD Across the Lifespan",
          body: `<p>The DSM-5 classifies <strong>Attention-Deficit/Hyperactivity Disorder (ADHD)</strong> as a neurodevelopmental disorder characterized by a persistent pattern of inattention and/or hyperactivity-impulsivity that interferes with functioning or development[cite: 41]. Symptoms must have been present <strong>before age 12</strong>, must exist in <strong>two or more structural settings</strong> (such as both home and school/work), and must show clear evidence of direct interference with social, academic, or occupational quality[cite: 44]. DSM-5 details three specific presentations: Predominantly Inattentive, Predominantly Hyperactive-Impulsive, and Combined Presentation[cite: 48]. Because ADHD relates to neurological timing and dopamine motivation regulation setups, non-pharmacological scaffolding works directly to structure task sequencing[cite: 55, 64].</p>`
        },
        {
          eyebrow: "Environmental Accommodations",
          title: "Structuring Home and Classroom Workspaces",
          body: `<p>A strong body of evidence supports utilizing <strong>environmental adjustments</strong> to minimize the daily cognitive friction encountered by individuals with ADHD patterns[cite: 68]. In classroom settings, accommodations include structural time allowances during assessments, breaking tasks down into clear visual segments, and preferential seating to reduce external sensory distraction[cite: 68]. In home environments, families are highly encouraged to implement visual schedules and establish low-distraction environments paired with immediate, explicit positive feedback to support behavioral scaffolding and self-regulation[cite: 68].</p>`
        },
        {
          eyebrow: "DSM-5 Symptom Clusters",
          title: "Inattention and Hyperactivity Manifestations",
          body: `<p>The DSM-5 segment breaks parameters down into specific observable behaviors[cite: 45]. The <strong>Inattention Cluster</strong> involves frequent detail omissions, struggles sustaining focus during routine assignments, and an apparent difficulty following multi-step instructional chains[cite: 46]. The <strong>Hyperactivity-Impulsivity Cluster</strong> presents as consistent physical fidgeting, vocal/restless patterns, difficulty awaiting structural turns, and frequent conversational interruptions[cite: 46]. Identifying these behaviors serves strictly for educational profiling and documentation for professional referral[cite: 68].</p>`
        },
        {
          eyebrow: "Professional Referral Pathways",
          title: "Navigating Formal Multidisciplinary Assessment",
          body: `<p>When inattentive or hyperactive patterns consistently generate cross-setting functional challenges, connecting with an objective diagnostic clinic is the appropriate path[cite: 44, 68]. Standard evaluations combine thorough developmental histories, clinical scales across settings, and differential screenings to isolate co-occurring learning or anxiety conditions[cite: 67, 68]. Non-certified individuals play a supportive role by running enrichment programs but must never comment on or recommend stimulant choices[cite: 68].</p>`,
          pathway: "Recommended Consultation Path: Connect with a Psychiatrist or Developmental Pediatrician for diagnostic confirmation, or an Educational Psychologist for specialized school-based learning support structures[cite: 67, 68]."
        }
      ]
    },
    bn: {
      title: "এডিএইচডি / মনোযোগের অভাব এবং অতিসক্রিয়তা ব্যাধি",
      sections: [
        {
          eyebrow: "DSM-5 ডোমেন ওভারভিউ",
          title: "এডিএইচডি (ADHD) এবং এর জীবনব্যাপী প্রভাব বোঝা",
          body: `<p>DSM-5 নির্দেশিকা অনুযায়ী, <strong>অ্যাটেনশন-ডেফিসিট/হাইপারঅ্যাক্টিভিটি ডিসঅর্ডার (ADHD)</strong> হলো একটি নিউরোডাইভার্স অবস্থা যা অমনোযোগিতা এবং অতিসক্রিয়তা-আবেগপ্রবণতার একটি স্থায়ী প্যাটার্ন দ্বারা চিহ্নিত [cite: 41]। লক্ষণগুলি অবশ্যই <strong>১২ বছর বয়সের আগে</strong> প্রকাশ পেতে হবে এবং <strong>দুটি বা ততোধিক ক্ষেত্রে</strong> (যেমন বাড়ি এবং স্কুল/কাজ উভয় জায়গায়) উপস্থিত থাকতে হবে [cite: 44]। এটি সামাজিক বা একাডেমিক কার্যকলাপে স্পষ্ট বাধা সৃষ্টি করে [cite: 44]। DSM-5 এর তিনটি সংস্করণ রয়েছে: মূলত অমনোযোগী, মূলত অতিসক্রিয়-আবেগপ্রবণ, এবং সম্মিলিত সংস্করণ [cite: 48]। যেহেতু ADHD ডোপামিন এবং মস্তিস্কের মনোযোগ নিয়ন্ত্রণ ব্যবস্থার সাথে জড়িত, তাই অ-ফার্মাকোলজিকাল পদ্ধতি কাজ শেষ করার ক্ষেত্রে বিশেষ সাহায্য করে [cite: 55, 64]।</p>`
        },
        {
          eyebrow: "পরিবেশগত অভিযোজন",
          title: "বাড়ি এবং ক্লাসরুমের পরিবেশকে গঠনমূলক করা",
          body: `<p>ADHD প্যাটার্নের ব্যক্তিদের দৈনন্দিন মানসিক চাপ ও মনোযোগের ঘাটতি কমাতে <strong>পরিবেশগত পরিবর্তন বা অভিযোজন</strong> অত্যন্ত কার্যকরী বলে প্রমাণিত হয়েছে [cite: 68]। ক্লাসরুমের ক্ষেত্রে পরীক্ষার সময় অতিরিক্ত সময় দেওয়া, কাজগুলোকে ছোট ছোট ভিজ্যুয়াল অংশে ভাগ করা এবং মনোযোগ আকর্ষণের জন্য সামনে বসার ব্যবস্থা করা অন্যতম [cite: 68]। বাড়ির পরিবেশে ভিজ্যুয়াল রুটিন বা সময়সূচী ব্যবহার করা এবং কাজ শেষ হলে সাথে সাথে ইতিবাচক উৎসাহ দেওয়া স্ব-নিয়ন্ত্রণ ক্ষমতা বাড়াতে সাহায্য করে [cite: 68]।</p>`
        },
        {
          eyebrow: "DSM-5 লক্ষণ ক্লাস্টার",
          title: "অমনোযোগিতা এবং অতিসক্রিয়তার প্রকাশ",
          body: `<p>DSM-5 এই লক্ষণগুলিকে নির্দিষ্ট কিছু পর্যবেক্ষণযোগ্য আচরণের মাধ্যমে ব্যাখ্যা করে [cite: 45]। <strong>অমনোযোগিতার ক্লাস্টারে</strong> রয়েছে ছোটখাটো খুঁটিনাটি এড়িয়ে যাওয়া, রুটিনমাফিক কাজে মনোযোগ ধরে রাখতে না পারা এবং ধারাবাহিক নির্দেশাবলী অনুসরণে অসুবিধা [cite: 46]। অন্যদিকে, <strong>অতিসক্রিয়তা-আবেগপ্রবণতার ক্লাস্টারে</strong> অতিরিক্ত ছটফট করা, এক জায়গায় শান্ত হয়ে বসতে না পারা, নিজের খেই হারিয়ে কথা বলা এবং অন্যের কথায় বাধা দেওয়ার প্রবণতা দেখা যায় [cite: 46]। এই আচরণগুলি চিহ্নিত করার মূল উদ্দেশ্য হলো পেশাদার মূল্যায়নের জন্য তথ্য সংগ্রহ করা [cite: 68]।</p>`
        },
        {
          eyebrow: "পেশাদার রেফারেল পাথওয়ে",
          title: "আনুষ্ঠানিক ও বহুমুখী মূল্যায়নের দিকে এগিয়ে যাওয়া",
          body: `<p>যদি অমনোযোগ বা অতিসক্রিয়তার লক্ষণগুলি দৈনন্দিন জীবন ও পড়াশোনায় নিয়মিত বাধা সৃষ্টি করে, তবে পেশাদার ক্লিনিকাল মূল্যায়ন করা উচিত [cite: 44, 68]। এই মূল্যায়নে সম্পূর্ণ আচরণগত ইতিহাস ও রেটিং স্কেল ব্যবহার করা হয় [cite: 67, 68]। কোনো অ-সার্টিফাইড ব্যক্তি এই ক্ষেত্রে কোনো ওষুধ (যেমন স্টিমুল্যান্ট) ব্যবহারের পরামর্শ বা মন্তব্য করতে পারেন না [cite: 68]।</p>
<p><strong>পরামর্শ:</strong> নিশ্চিত রোগ নির্ণয়ের জন্য শিশু মনোরোগ বিশেষজ্ঞ (Psychiatrist) বা ডেভেলপমেন্টাল পেডিয়াট্রিশিয়ানের সাথে যোগাযোগ করুন, অথবা স্কুল-ভিত্তিক সহায়তার জন্য এডুকেশনাল সাইকোলজিস্টের পরামর্শ নিন [cite: 67, 68]।</p>`
        }
      ]
    },
    hi: {
      title: "एडीएचडी / ध्यान की कमी / अतिसक्रियता विकार",
      sections: [
        {
          eyebrow: "DSM-5 डोमेन अवलोकन",
          title: "एडीएचडी (ADHD) और इसके जीवनव्यापी प्रभाव को समझना",
          body: `<p>DSM-5 के वर्गीकरण के अनुसार, <strong>अटेंशन-डेफिसिट/हाइपरएक्टिविटी डिसऑर्डर (ADHD)</strong> एक न्यूरोडेवलपमेंटल विकार है जो असावधानी और अतिसक्रियता-जल्दबाजी के लगातार पैटर्न द्वारा चिह्नित है [cite: 41]। इसके लक्षण <strong>12 वर्ष की आयु से पहले</strong> दिखाई देने चाहिए, और <strong>दो या दो से अधिक स्थानों पर</strong> (जैसे घर और स्कूल/काम दोनों जगह) मौजूद होने चाहिए [cite: 44]। यह सामाजिक या शैक्षणिक कामकाज को सीधे प्रभावित करता है [cite: 44]। DSM-5 इसके तीन रूपों को निर्दिष्ट करता है: मुख्य रूप से असावधानी, मुख्य रूप से अतिसक्रिय-जल्दबाजी, और संयुक्त रूप [cite: 48]। चूंकि एडीएचडी डोपामाइन और मस्तिष्क की ध्यान प्रणाली से जुड़ा है, इसलिए गैर-औषधीय तरीके कार्यों को पूरा करने में सहायता करते हैं [cite: 55, 64]।</p>`
        },
        {
          eyebrow: "पर्यावरणीय अनुकूलन",
          title: "घर और कक्षा के वातावरण को व्यवस्थित करना",
          body: `<p>एडीएचडी पैटर्न वाले व्यक्तियों के दैनिक मानसिक तनाव को कम करने के लिए <strong>पर्यावरणीय और संरचनात्मक समायोजन</strong> को अत्यधिक प्रभावी माना गया है [cite: 68]। कक्षा के वातावरण में परीक्षाओं के दौरान अतिरिक्त समय देना, कार्यों को छोटे दृश्य टुकड़ों में विभाजित करना, और बाहरी ध्यान भटकाने वाली चीजों से दूर आगे बैठने की व्यवस्था करना शामिल है [cite: 68]। घरेलू वातावरण में विज़ुअल रूटीन (समय सारणी) का उपयोग करना और कार्य पूरा होने पर तुरंत सकारात्मक प्रोत्साहन देना आत्म-नियंत्रण क्षमता को मजबूत करता है [cite: 68]।</p>`
        },
        {
          eyebrow: "DSM-5 लक्षण क्लस्टर",
          title: "असावधानी और अतिसक्रियता के लक्षण",
          body: `<p>DSM-5 इन लक्षणों को विशिष्ट अवलोकन योग्य व्यवहारों में विभाजित करता [cite: 45]। <strong>असावधानी क्लस्टर</strong> में विवरणों को छोड़ देना, नियमित कार्यों के दौरान ध्यान बनाए रखने में कठिनाई, और निर्देशों की श्रृंखला का पालन करने में परेशानी शामिल है [cite: 46]। <strong>अतिसक्रियता-जल्दबाजी क्लस्टर</strong> में लगातार हाथ-पैर हिलाना, शांत न बैठ पाना, अपनी बारी का इंतजार न कर पाना और बातचीत में बाधा डालना शामिल है [cite: 46]। इन व्यवहारों को केवल पेशेवर रेफरल के लिए प्रलेखित किया जाना चाहिए [cite: 68]।</p>`
        },
        {
          eyebrow: "पेशेवर रेफरल मार्ग",
          title: "औपचारिक और व्यापक नैदानिक मूल्यांकन",
          body: `<p>यदि असावधानी या अतिसक्रियता के पैटर्न दैनिक जीवन और कामकाज को प्रभावित कर रहे हैं, तो पेशेवर मूल्यांकन की ओर कदम बढ़ाना सही निर्णय है [cite: 44, 68]। औपचारिक मूल्यांकन में संपूर्ण विकासात्मक इतिहास और व्यवहारिक रेटिंग स्केल का उपयोग किया जाता है [cite: 67, 68]। कोई भी गैर-प्रमाणित व्यक्ति उत्तेजक दवाओं (Stimulants) के उपयोग पर कोई टिप्पणी या सिफारिश नहीं कर सकता [cite: 68]।</p>
<p><strong>परामर्श मार्ग:</strong> सटीक निदान के लिए मनोचिकित्सक (Psychiatrist) या या विकासात्मक बाल रोग विशेषज्ञ से संपर्क करें, या स्कूल-आधारित सहायता के लिए शैक्षिक मनोवैज्ञानिक (Educational Psychologist) से परामर्श लें [cite: 67, 68]।</p>`
        }
      ]
    }
  },

  // ===================================================================
  // TRACK 3: MCI (MILD COGNITIVE IMPAIRMENT)
  // ===================================================================
  mci: {
    en: {
      title: "Mild Neurocognitive Disorder / MCI",
      sections: [
        {
          eyebrow: "DSM-5 Domain Overview",
          title: "Understanding Mild Neurocognitive Disorder (MCI)",
          body: `<p>The DSM-5 classifies what is widely known as Mild Cognitive Impairment under the structural label <strong>Mild Neurocognitive Disorder (Mild NCD)</strong>[cite: 70]. It represents a modest but measurable cognitive decline from an established personal baseline in one or more core domains[cite: 73]. The **critical, foundational clinical distinction** from Major NCD specified under Criterion B is that <strong>independence in everyday activities is fully preserved</strong>[cite: 73]. While tracking complex tasks may require compensatory setups (like mobile notes or reminders), the individual remains completely independent in daily execution[cite: 73, 75]. MCI acts as a highly heterogeneous transitional baseline with multiple possible clinical trajectories[cite: 70].</p>`
        },
        {
          eyebrow: "Critical Clinical Distinction",
          title: "Normal Aging vs. Mild Cognitive Impairment",
          body: `<p>A primary function of this informational framework is successfully separating statistically normative, <strong>age-related cognitive changes</strong> from emergent Mild Cognitive Impairment[cite: 81, 82]. Standard age-related variation includes slow processing speeds, tip-of-the-tongue language pauses, and brief misplacements of everyday objects[cite: 75]. MCI involves consistent, targeted changes noted by informants that drop performance levels below expected normative age brackets but remain well above dementia thresholds[cite: 75]. Tracking these variations supports informed diagnostic discussions without initiating early anxiety loops[cite: 82].</p>`
        },
        {
          eyebrow: "Creative Wellness Interventions",
          title: "Cognitive Stimulation Therapy (CST) Paradigms",
          body: `<p><strong>Cognitive Stimulation Therapy (CST)</strong> is an evidence-backed group program targeting active semantic engagement through puzzles, word games, and general knowledge logic activities[cite: 79, 95]. Operating on properties of <strong>cognitive reserve and neuroplasticity</strong>, structured CST challenges executive tasks to strengthen neural pathway stability[cite: 79]. These interactive components serve strictly as recreational and protective enrichment strategies, rather than clinical treatments or curative procedures[cite: 79, 82].</p>`
        },
        {
          eyebrow: "Professional Referral Pathways",
          title: "Arranging Baseline Neuropsychological Evaluations",
          body: `<p>When progressive variations from a personal cognitive baseline are consistently tracked, scheduling a clinical memory evaluation is highly recommended[cite: 82]. Formal clinical assessments isolate treatable metabolic dependencies, run standardized cognitive tests, and arrange temporal baseline tracking[cite: 82]. Non-certified individuals play a vital role by deploying interactive wellness support but must never administer diagnostic testing batteries[cite: 81, 82].</p>`,
          pathway: "Recommended Consultation Path: Connect with a General Practitioner for initial testing and referral, a Neurologist for neuroimaging evaluations, or a Neuropsychologist for standardized testing profiles[cite: 82]."
        }
      ]
    },
    bn: {
      title: "মাইল্ড নিউরোকগনিটিভ ডিসঅর্ডার / MCI",
      sections: [
        {
          eyebrow: "DSM-5 ডোমেন ওভারভিউ",
          title: "সামান্য জ্ঞানীয় দুর্বলতা (MCI / Mild NCD) বোঝা",
          body: `<p>DSM-5 নির্দেশিকা অনুযায়ী, যা সাধারণত মাইল্ড কগনিটিভ ইমপেয়ারমেন্ট নামে পরিচিত, তা কগনিটিভ ডোমেনে <strong>মাইল্ড নিউরোকগনিটিভ ডিসঅর্ডার (Mild NCD)</strong> হিসেবে শ্রেণীবদ্ধ [cite: 70]। এটি এক বা একাধিক ক্ষেত্রে মানসিক বা কগনিটিভ ক্ষমতার একটি মৃদু কিন্তু পরিমাপযোগ্য হ্রাসকে বোঝায় [cite: 73]। মেজর NCD বা ডিমেনশিয়ার সাথে এর **প্রধান ও মৌলিক ক্লিনিকাল পার্থক্য** (Criterion B) হলো, এই ক্ষেত্রে <strong>দৈনন্দিন জীবনযাত্রার স্বাধীনতা সম্পূর্ণ বজায় থাকে</strong> [cite: 73]। জটিল কাজগুলি পরিচালনার জন্য বিভিন্ন সহায়ক কৌশলের (যেমন মোবাইল নোট বা রিমাইন্ডার) প্রয়োজন হতে পারে, তবে ব্যক্তি তার দৈনন্দিন কাজ অন্যের সাহায্য ছাড়াই করতে পারেন [cite: 73, 75]। MCI হলো একটি পরিবর্তনশীল অবস্থা যার একাধিক সম্ভাব্য গতিপথ থাকতে পারে [cite: 70]।</p>`
        },
        {
          eyebrow: "গুরুত্বপূর্ণ ক্লিনিকাল পার্থক্য",
          title: "স্বাভাবিক বার্ধক্য বনাম মাইল্ড কগনিটিভ ইমপেয়ারমেন্ট",
          body: `<p>এই ইনফরমেশনাল ট্র্যাকের মূল উদ্দেশ্য হলো বয়সজনিত <strong>স্বাভাবিক মানসিক পরিবর্তন</strong> থেকে মাইল্ড কগনিটিভ ইমপেয়ারমেন্ট (MCI)-কে আলাদা করা [cite: 81, 82]। বার্ধক্যের কারণে তথ্য প্রক্রিয়াকরণের গতি কিছুটা কমে যাওয়া, কথা বলার সময় হঠাৎ শব্দ ভুলে যাওয়া বা চশমা-চাবি সাময়িকভাবে হারিয়ে ফেলা সম্পূর্ণ স্বাভাবিক আচরণের অংশ [cite: 75]। তবে MCI-এর ক্ষেত্রে এই পরিবর্তনগুলি নিয়মিত ঘটে এবং তা স্বাভাবিক বয়সের তুলনায় কিছুটা বেশি হয়, যদিও তা ডিমেনশিয়ার মতো গুরুতর নয় [cite: 75]। এই পার্থক্যটি বোঝা অপ্রয়োজনীয় মানসিক উদ্বেগ কমাতে সাহায্য করে [cite: 82]।</p>`
        },
        {
          eyebrow: "সৃজনশীল ওয়েলনেস হস্তক্ষেপ",
          title: "সংজ্ঞানাত্মক উদ্দীপনা থেরাপি (CST) প্যারাডাইম",
          body: `<p><strong>কগনিটিভ স্টিমুলেশন থেরাপি (CST)</strong> হলো একটি প্রমাণ-ভিত্তিক পদ্ধতি যা ধাঁধা, শব্দের খেলা এবং সাধারণ জ্ঞানের আলোচনার মাধ্যমে মানসিক ক্ষমতাকে সক্রিয় রাখে [cite: 79, 95]। এটি <strong>কগনিটিভ রিজার্ভ এবং নিউরোপ্লাস্টিসিটি</strong>-র নীতির ওপর ভিত্তি করে কাজ করে মস্তিস্কের কার্যক্ষমতাকে সচল রাখতে সাহায্য করে [cite: 79]। আমাদের প্ল্যাটফর্মের এই ইন্টারেক্টিভ গেম বা উপাদানগুলি কেবল বিনোদন ও মানসিক অনুশীলনের জন্য, এগুলি কোনো ক্লিনিকাল চিকিৎসা বা রোগ নিরাময়ের দাবি করে না [cite: 79, 82]।</p>`
        },
        {
          eyebrow: "পেশাদার রেফারেল পাথওয়ে",
          title: "প্রাথমিক নিউরোসাইকোলজিকাল মূল্যায়ন করা",
          body: `<p>যদি নিজের স্বাভাবিক মানসিক ক্ষমতার থেকে কোনো স্থায়ী পরিবর্তন লক্ষ্য করা যায়, তবে একটি প্রফেশনাল মেমোরি অ্যাসেসমেন্ট করা অত্যন্ত বুদ্ধিমানের কাজ [cite: 82]। পেশাদার মূল্যায়নের মাধ্যমে সাময়িক ও নিরাময়যোগ্য শারীরিক সমস্যাগুলি চিহ্নিত করা যায় [cite: 82]। কোনো অ-সার্টিফাইড ব্যক্তি নিজে কোনো ক্লিনিকাল পরীক্ষা বা রোগ নির্ণয় করতে পারেন না [cite: 81, 82]।</p>
<p><strong>পরামর্শ:</strong> প্রাথমিক স্ক্রিনিংয়ের জন্য জেনারেল প্র্যাকটিশনার (GP), মস্তিস্কের পরীক্ষার জন্য নিউরোলজিস্ট এবং বিস্তারিত কগনিটিভ টেস্ট প্রোফাইলের জন্য নিউরোসাইকোলজিস্টের সাথে যোগাযোগ করুন [cite: 82]।</p>`
        }
      ]
    },
    hi: {
      title: "माइल्ड न्यूरोकॉग्निटिव डिसऑर्डर / MCI",
      sections: [
        {
          eyebrow: "DSM-5 डोमेन अवलोकन",
          title: "हल्की संज्ञानात्मक हानि (MCI / Mild NCD) को समझना",
          body: `<p>DSM-5 के वर्गीकरण के अनुसार, जिसे आमतौर पर हल्की संज्ञानात्मक हानि (MCI) कहा जाता है, उसे <strong>माइल्ड न्यूरोकॉग्निटिव डिसऑर्डर (Mild NCD)</strong> के रूप में वर्गीकृत किया गया है [cite: 70]। यह एक या अधिक डोमेन में स्थापित व्यक्तिगत बेसलाइन से हल्की लेकिन मापने योग्य संज्ञानात्मक गिरावट को दर्शाता है [cite: 73]। मेजर NCD (डिमेंशिया) से इसका **सबसे महत्वपूर्ण नैदानिक अंतर** (Criterion B) यह है कि इसमें <strong>दैनिक जीवन के कार्यों की स्वतंत्रता पूरी तरह से सुरक्षित रहती है [cite: 73]।</strong> यद्यपि जटिल कार्यों के लिए सहायक रणनीतियों (जैसे मोबाइल नोट्स या रिमाइंडर) की आवश्यकता हो सकती है, लेकिन व्यक्ति दैनिक कार्यों को स्वतंत्र रूप से करने में सक्षम होता है [cite: 73, 75]। MCI कई संभावित नैदानिक परिणामों वाली एक परिवर्तनशील स्थिति है [cite: 70]।</p>`
        },
        {
          eyebrow: "महत्वपूर्ण नैदानिक अंतर",
          title: "सामान्य बुढ़ापा बनाम माइल्ड कॉग्निटिव इम्पेयरमेंट",
          body: `<p>इस सूचनात्मक ट्रैक का प्राथमिक उद्देश्य सांख्यिकीय रूप से सामान्य, <strong>उम्र से संबंधित संज्ञानात्मक परिवर्तनों</strong> को माइल्ड कॉग्निटिव इम्पेयरमेंट (MCI) से अलग करना है [cite: 81, 82]। उम्र बढ़ने के साथ सूचना प्रसंस्करण की गति धीमी होना, बातचीत के दौरान अचानक शब्द भूल जाना, या रोजमर्रा की वस्तुओं को अस्थायी रूप से भूल जाना सामान्य बुढ़ापे का हिस्सा है [cite: 75]। इसके विपरीत, MCI में ये बदलाव निरंतर होते हैं और सामान्य उम्र की तुलना में अधिक ध्यान देने योग्य होते हैं, हालांकि ये डिमेंशिया जितने गंभीर नहीं होते [cite: 75]। इस अंतर को समझने से अनावश्यक चिंता को रोकने में मदद मिलती है [cite: 82]।</p>`
        },
        {
          eyebrow: "रचनात्मक कल्याण हस्तक्षेप",
          title: "संज्ञानात्मक उत्तेजना चिकित्सा (CST) प्रतिमान",
          body: `<p><strong>कॉग्निटिव स्टिमुलेशन थेरेपी (CST)</strong> एक साक्ष्य-आधारित पद्धति है जो पहेलियों, शब्दों के खेल और सामान्य ज्ञान गतिविधियों के माध्यम से मानसिक क्षमताओं को सक्रिय रखती है [cite: 79, 95]। यह <strong>संज्ञानात्मक रिजर्व और न्यूरोप्लास्टिसिटी</strong> के सिद्धांतों पर काम करते हुए मस्तिष्क की कार्यक्षमता को बनाए रखने में सहायता करती है [cite: 79]। हमारे प्लेटफॉर्म की ये गतिविधियां केवल मनोरंजन और मानसिक अभ्यास के लिए हैं, ये किसी नैदानिक उपचार या बीमारी को ठीक करने का दावा नहीं करती हैं [cite: 79, 82]।</p>`
        },
        {
          eyebrow: "पेशेवर रेफरल मार्ग",
          title: "प्रारंभिक न्यूरोसाइकोलॉजिकल मूल्यांकन की व्यवस्था",
          body: `<p>यदि व्यक्तिगत संज्ञानात्मक बेसलाइन से लगातार बदलाव महसूस हो रहे हैं, तो पेशेवर 'मेमोरी असेसमेंट' का विकल्प चुनना बेहद समझदारी भरा कदम है [cite: 82]। पेशेवर नैदानिक मूल्यांकन इलाज योग्य समस्याओं की पहचान करने और समय के साथ संज्ञानात्मक स्वास्थ्य की निगरानी करने में मदद करता है [cite: 82]। कोई भी गैर-प्रमाणित व्यक्ति नैदानिक परीक्षण आयोजित नहीं कर सकता [cite: 81, 82]।</p>
<p><strong>परामर्श मार्ग:</strong> शुरुआती जांच के लिए जनरल प्रैक्टिशनर (GP), ब्रेन इमेजिंग के लिए न्यूरोलॉजिस्ट, और विस्तृत संज्ञानात्मक परीक्षण प्रोफाइल के लिए न्यूरोसाइकोलॉजिस्ट से संपर्क करें [cite: 82]।</p>`
        }
      ]
    }
  }
};

// ─────────────────────────────────────────────────────────────────────
// Text-to-Speech Core Engine
// ─────────────────────────────────────────────────────────────────────
function speakText(text, languageCode) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  // Create clean utterance text by removing internal raw HTML markup tags
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  const localeMapping = {
    'en': 'en-US', 'bn': 'bn-IN', 'hi': 'hi-IN',
    'ta': 'ta-IN', 'te': 'te-IN', 'kn': 'kn-IN', 'or': 'or-IN'
  };

  utterance.lang = localeMapping[languageCode] || 'en-US';

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang));
  if (matchedVoice) utterance.voice = matchedVoice;

  window.speechSynthesis.speak(utterance);
}

// ─────────────────────────────────────────────────────────────────────
// Rendering Engine Export
// ─────────────────────────────────────────────────────────────────────
export function renderEducationModule(containerId, activeDisorder, currentLang = 'en') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[MindCompass] Education container #${containerId} not found.`);
    return;
  }

  const disorder = activeDisorder?.toLowerCase() || 'mci';
  
  // FIXED: Accessing correct matrix data mapping structure variable name
  const trackData = EDUCATION_DATA[disorder];

  if (!trackData || !trackData[currentLang]) {
    container.innerHTML = `<p style="color:var(--danger-red, #ff4a4a);">Disorder data or selected language translation not found.</p>`;
    return;
  }

  const data = trackData[currentLang];
  const trackIcons = { dementia: "🎹", adhd: "🎧", mci: "🌊" };
  const trackIcon = trackIcons[disorder] || "🧠";

  // Build the individual section cards dynamically from the sections array loop
  const sectionCards = data.sections.map((section, i) => {
    const pathwayMarkup = section.pathway 
      ? `<div class="referral-card" style="margin-top:15px;" role="complementary">
           <div class="referral-title">📋 Recommended Consultation Pathways</div>
           <div class="edu-section-body" style="padding: 10px 0 0 0;">
             ${section.pathway}
             <button class="speaker-btn" data-text="${section.pathway}" aria-label="Speak path">🔊</button>
           </div>
         </div>`
      : '';

    return `
      <section class="edu-section">
        <div class="edu-section-eyebrow">${section.eyebrow}</div>
        <h3 class="edu-section-title">
          ${section.title} 
          <button class="speaker-btn" data-text="${section.title}" aria-label="Speak section title">🔊</button>
        </h3>
        <div class="edu-section-body">
          ${section.body}
          <button class="speaker-btn" data-text="${section.body}" aria-label="Speak section content">🔊</button>
        </div>
        ${pathwayMarkup}
      </section>
    `;
  }).join('');

  // Assemble full modular layout view targeting older shell configuration styles
  container.innerHTML = `
    <div class="module-header">
      <div class="module-eyebrow">${trackIcon} Module 3 &nbsp;·&nbsp; ${disorder.toUpperCase()} Track</div>
      <h2 class="module-title">
        ${data.title} 
        <button class="speaker-btn" data-text="${data.title}" aria-label="Speak main title">🔊</button>
      </h2>
      <p class="module-subtitle">
        DSM-5 aligned informational content to help you understand the cognitive domain, 
        relevant support strategies, and appropriate professional referral pathways.
      </p>
    </div>

    <div class="education-layout" role="main">
      ${sectionCards}

      <div class="edu-disclaimer-box" role="note" aria-label="Clinical disclaimer">
        <strong>⚠ Academic Informational Prototype — Critical Disclaimer:</strong>
        All content in this module is for educational and informational purposes only, produced as a
        student academic project. It does not constitute clinical advice, professional opinion, medical
        recommendation, or a clinical diagnosis. The content references the DSM-5 framework for
        academic context only. Nothing on this platform should be used as a substitute for professional
        clinical assessment, diagnosis, or treatment. If you have any concerns about your cognitive
        health or that of someone you support, please consult a qualified healthcare professional promptly.
        In the event of an emergency, contact your local emergency services immediately.
      </div>
    </div>
  `;

  // Attach audio click handlers safely across view components
  const audioButtons = container.querySelectorAll('.speaker-btn');
  audioButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToSpeak = button.getAttribute('data-text');
      speakText(textToSpeak, currentLang);
    });
  });
}