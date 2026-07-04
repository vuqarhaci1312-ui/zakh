import fs from "fs";
import path from "path";

const MISSION_BY_LOCALE = {
  en: {
    "stats.STAT_MISSION.card1Top":
      "2100 travel partners across the globe cooperate with Zakher Travel as their trusted B2B supplier.",
    "stats.STAT_MISSION.card2ImageCaption":
      "10 tourist destinations across Europe and Asia — offered, booked, and managed from one platform.",
    "stats.STAT_MISSION.card3Highlight":
      "Backed by 400 partner hotels, a dedicated team of 60 travel professionals, and more than 60,000 tourists welcomed since 2016 — we deliver reliable travel at scale.",
    "stats.STAT_CARDS.0.description":
      "From independent agencies to international tour operators, more than 2100 travel companies rely on our contracts, inventory, and 24/7 support to serve their clients worldwide.",
    "stats.STAT_CARDS.1.description":
      "Azerbaijan, Türkiye, Georgia, and seven more countries — each destination with curated tours, transfers, guides, and hotel options handled by our in-house team.",
    "stats.STAT_CARDS.2.description":
      "400 hotels available for direct booking across all our destinations, from city hotels to resort properties.",
    "stats.STAT_CARDS.3.description":
      "Over 60,000 visitors from the GCC, Europe, and beyond have traveled with us — from group tours to tailor-made holidays.",
    "stats.STAT_CARDS.4.description":
      "60 experienced travel professionals — reservation, operations, and destination experts — delivering world-class service every day.",
  },
  az: {
    "stats.STAT_MISSION.card1Top":
      "Dünya üzrə 2100 səyahət tərəfdaşı Zakher Travel-ı etibarlı B2B təchizatçısı kimi seçir.",
    "stats.STAT_MISSION.card2ImageCaption":
      "Avropa və Asiya üzrə 10 turist destinationu — hamısı vahid platformadan təklif, bron və idarə olunur.",
    "stats.STAT_MISSION.card3Highlight":
      "400 partner otel, 60 peşəkar səyahət mütəxəssisindən ibarət komanda və 2016-cı ildən 60 000-dən çox qarşılanmış turistlə biz etibarlı səyahət xidmətini miqyaslı təqdim edirik.",
    "stats.STAT_CARDS.0.description":
      "Müstəqil agentliklərdən beynəlxalq tur operatorlarına qədər 2100-dən çox səyahət şirkəti müqavilələrimizə, inventar ehtiyatımıza və 24/7 dəstəyimizə etibar edir.",
    "stats.STAT_CARDS.1.description":
      "Azərbaycan, Türkiyə, Gürcüstan və daha yeddi ölkə — hər destination üçün kuratorlu turlar, transferlər, bələdçilər və otel seçimləri daxili komandamız tərəfindən idarə olunur.",
    "stats.STAT_CARDS.2.description":
      "Bütün destinationlarımız üzrə birbaşa bron üçün 400 otel — şəhər otellərindən kurort obyektlərinə qədər.",
    "stats.STAT_CARDS.3.description":
      "Körəzdən, Avropadan və digər regionlardan 60 000-dən çox səyyah bizimlə səyahət edib — qrup turlarından fərdi proqramlara qədər.",
    "stats.STAT_CARDS.4.description":
      "60 təcrübəli səyahət peşəkarı — rezervasiya, əməliyyat və destination mütəxəssisləri — hər gün yüksək keyfiyyətli xidmət göstərir.",
  },
  ru: {
    "stats.STAT_MISSION.card1Top":
      "2100 туристических партнёров по всему миру сотрудничают с Zakher Travel как с надёжным B2B-поставщиком.",
    "stats.STAT_MISSION.card2ImageCaption":
      "10 туристических направлений в Европе и Азии — предложение, бронирование и управление из единой платформы.",
    "stats.STAT_MISSION.card3Highlight":
      "400 партнёрских отелей, команда из 60 специалистов и более 60 000 туристов, принятых с 2016 года — мы обеспечиваем надёжные путешествия в масштабе.",
    "stats.STAT_CARDS.0.description":
      "От независимых агентств до международных туроператоров — более 2100 компаний полагаются на наши контракты, инвентарь и круглосуточную поддержку.",
    "stats.STAT_CARDS.1.description":
      "Азербайджан, Тürkiye, Грузия и ещё семь стран — для каждого направления туры, трансферы, гиды и отели организует наша команда.",
    "stats.STAT_CARDS.2.description":
      "400 отелей для прямого бронирования во всех наших направлениях — от городских до курортных.",
    "stats.STAT_CARDS.3.description":
      "Более 60 000 путешественников из стран Персидского залива, Европы и других регионов — от групповых туров до индивидуальных программ.",
    "stats.STAT_CARDS.4.description":
      "60 опытных специалистов — бронирование, операции и эксперты по направлениям — каждый день обеспечивают сервис мирового уровня.",
  },
  ar: {
    "stats.STAT_MISSION.card1Top":
      "2100 شريك سفر حول العالم يتعاونون مع Zakher Travel كمزود B2B موثوق.",
    "stats.STAT_MISSION.card2ImageCaption":
      "10 وجهات سياحية في أوروبا وآسيا — نقدّمها ونحجزها ونديرها من منصة واحدة.",
    "stats.STAT_MISSION.card3Highlight":
      "بدعم 400 فندق شريك وفريق من 60 متخصصًا في السفر وأكثر من 60,000 سائح استقبلناهم منذ 2016 — نقدّم خدمات سفر موثوقة على نطاق واسع.",
    "stats.STAT_CARDS.0.description":
      "من الوكالات المستقلة إلى منظمي الرحلات الدوليين — أكثر من 2100 شركة سفر تعتمد على عقودنا ومخزوننا ودعمنا على مدار الساعة.",
    "stats.STAT_CARDS.1.description":
      "أذربيجان وتركيا وجورجيا وسبع دول أخرى — لكل وجهة جولات ونقل ومرشدين وخيارات فندقية يديرها فريقنا الداخلي.",
    "stats.STAT_CARDS.2.description":
      "400 فندق متاح للحجز المباشر في جميع وجهاتنا — من فنادق المدن إلى المنتجعات.",
    "stats.STAT_CARDS.3.description":
      "أكثر من 60,000 زائر من دول الخليج وأوروبا وغيرها سافروا معنا — من الجولات الجماعية إلى العطلات المخصصة.",
    "stats.STAT_CARDS.4.description":
      "60 متخصصًا في السفر — حجوزات وعمليات وخبراء وجهات — يقدّمون خدمة عالمية المستوى كل يوم.",
  },
};

function upsertFlatJson(locale, updates) {
  const file = path.resolve(`public/i18n/${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  Object.assign(data, updates);
  fs.writeFileSync(file, JSON.stringify(data));
  console.log("flat", locale, Object.keys(updates).length);
}

function upsertSeedArray(locale, updates) {
  const file = path.resolve(`server/prisma/seeds/${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const keys = new Set(Object.keys(updates));
  let updated = 0;
  let added = 0;

  for (const entry of data) {
    if (keys.has(entry.key)) {
      entry.value = updates[entry.key];
      keys.delete(entry.key);
      updated++;
    }
  }

  for (const key of keys) {
    data.push({
      key,
      locale,
      value: updates[key],
      namespace: key.split(".")[0],
    });
    added++;
  }

  fs.writeFileSync(file, JSON.stringify(data));
  console.log("seed", locale, "updated", updated, "added", added);
}

function upsertTranslationsJson(updatesByLocale) {
  const file = path.resolve("server/prisma/seeds/translations.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  let updated = 0;
  let added = 0;

  for (const [locale, updates] of Object.entries(updatesByLocale)) {
    const pending = new Set(Object.keys(updates));
    for (const entry of data) {
      if (entry.locale === locale && pending.has(entry.key)) {
        entry.value = updates[entry.key];
        pending.delete(entry.key);
        updated++;
      }
    }
    for (const key of pending) {
      data.push({
        key,
        locale,
        value: updates[key],
        namespace: key.split(".")[0],
      });
      added++;
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log("translations.json updated", updated, "added", added);
}

for (const [locale, updates] of Object.entries(MISSION_BY_LOCALE)) {
  upsertFlatJson(locale, updates);
  upsertSeedArray(locale, updates);
}

upsertTranslationsJson(MISSION_BY_LOCALE);
