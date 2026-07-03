/**
 * Generates Azerbaijani translations from English seed.
 * Run: npx tsx scripts/generate-az-translations.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

type SeedItem = { key: string; locale: string; value: string; namespace: string };

const PHRASE_MAP: Record<string, string> = {
  Home: "Ana səhifə",
  "About Us": "Haqqımızda",
  About: "Haqqımızda",
  "Our Services": "Xidmətlərimiz",
  Services: "Xidmətlər",
  "Tour Packages": "Tur paketləri",
  Tours: "Turlar",
  "Social Media": "Sosial media",
  "Contact Us": "Əlaqə",
  Contact: "Əlaqə",
  Menu: "Menyu",
  Language: "Dil",
  "Discover more": "Daha çox kəşf et",
  "Collect moments": "Anları toplayın",
  "not things.": " əşyaları yox.",
  Explore: "Kəşf et",
  "View all": "Hamısına bax",
  "Read more": "Daha çox oxu",
  FAQs: "Tez-tez verilən suallar",
  "Send Message": "Mesaj göndər",
  "Your Name": "Adınız",
  "Your Email": "E-poçtunuz",
  "Your Phone": "Telefonunuz",
  "Your Message": "Mesajınız",
  "Office Phone": "Ofis telefonu",
  "Mobile Phone": "Mobil telefon",
  WhatsApp: "WhatsApp",
  Email: "E-poçt",
  Information: "Məlumat",
  "Our Menu": "Menyumuz",
  "Our Events": "Tədbirlərimiz",
  "Our Branches": "Filiallarımız",
  Branches: "Filiallar",
  Events: "Tədbirlər",
  "About Company": "Şirkət haqqında",
  "Our Brochures": "Broşürlərimiz",
  "Head Office": "Baş ofis",
  "Dubai Office": "Dubay ofisi",
  "All rights reserved": "Bütün hüquqlar qorunur",
  "Popular Tours": "Populyar turlar",
  Category: "Kateqoriya",
  Since: "İlindən",
  Locations: "Məkanlar",
  Inclusions: "Daxil olanlar",
  Exclusions: "Daxil olmayanlar",
  Price: "Qiymət",
  Duration: "Müddət",
  "Group size": "Qrup ölçüsü",
  Season: "Mövsüm",
  Download: "Yüklə",
  PDF: "PDF",
};

function translatePhrase(text: string): string {
  if (PHRASE_MAP[text]) return PHRASE_MAP[text];

  let result = text;

  const replacements: [RegExp, string][] = [
    [/^Home$/i, "Ana səhifə"],
    [/^About Us$/i, "Haqqımızda"],
    [/^Contact Us$/i, "Əlaqə"],
    [/^Contact$/i, "Əlaqə"],
    [/^Us$/i, ""],
    [/^Tour Packages$/i, "Tur paketləri"],
    [/^Our Services$/i, "Xidmətlərimiz"],
    [/^Social Media$/i, "Sosial media"],
    [/^Our Events$/i, "Tədbirlərimiz"],
    [/^Our Branches$/i, "Filiallarımiz"],
    [/\bTour\b/g, "Tur"],
    [/\bTours\b/g, "Turlar"],
    [/\bTravel\b/g, "Səyahət"],
    [/\bPackage\b/g, "Paket"],
    [/\bPackages\b/g, "Paketlər"],
    [/\bHotel\b/g, "Otel"],
    [/\bHotels\b/g, "Otellər"],
    [/\bGuide\b/g, "Bələdçi"],
    [/\bPrivate\b/g, "Fərdi"],
    [/\bTransfer\b/g, "Transfer"],
    [/\bBreakfast\b/g, "Səhər yeməyi"],
    [/\bIncludes\b/g, "Daxildir"],
    [/\bIncluded\b/g, "Daxildir"],
    [/\bNot included\b/gi, "Daxil deyil"],
    [/\bDay\b/g, "Gün"],
    [/\bDays\b/g, "Gün"],
    [/\bNight\b/g, "Gecə"],
    [/\bNights\b/g, "Gecə"],
    [/\bBaku\b/g, "Bakı"],
    [/\bAzerbaijan\b/g, "Azərbaycan"],
    [/\bTurkiye\b/g, "Türkiyə"],
    [/\bTurkey\b/g, "Türkiyə"],
    [/\bGeorgia\b/g, "Gürcüstan"],
    [/\bUAE\b/g, "BƏƏ"],
    [/\bUnited Arab Emirates\b/g, "Birləşmiş Ərəb Emirlikləri"],
    [/\bDubai\b/g, "Dubay"],
    [/\bSharjah\b/g, "Şarqə"],
    [/\bIstanbul\b/g, "İstanbul"],
    [/\bGuba\b/g, "Quba"],
    [/\bShahdag\b/g, "Şahdağ"],
    [/\bAbsheron\b/g, "Abşeron"],
    [/\bGobustan\b/g, "Qobustan"],
    [/\bSheki\b/g, "Şəki"],
    [/\bGanja\b/g, "Gəncə"],
    [/\bLankaran\b/g, "Lənkəran"],
    [/\bKhinalig\b/g, "Xınalıq"],
    [/\bCaucasus\b/g, "Qafqaz"],
    [/\bVisa\b/g, "Viza"],
    [/\bInsurance\b/g, "Sığorta"],
    [/\bAirport\b/g, "Hava limanı"],
    [/\bCity tour\b/gi, "Şəhər turu"],
    [/\bShopping tour\b/gi, "Alış-veriş turu"],
    [/\bGolf\b/g, "Qolf"],
    [/\bJeep\b/g, "Cip"],
    [/\bVIP\b/g, "VIP"],
    [/\bEconomy\b/g, "Ekonom"],
    [/\bProfessional\b/g, "Peşəkar"],
    [/\bEnglish-speaking\b/gi, "ingiliscə danışan"],
    [/\bPick-up\b/gi, "Götürmə"],
    [/\bDrop-off\b/gi, "Endirmə"],
    [/\bMeals\b/g, "Yeməklər"],
    [/\bPersonal expenses\b/gi, "Şəxsi xərclər"],
    [/\bFlight tickets\b/gi, "Aviabiletlər"],
    [/\bAll taxes\b/gi, "Bütün vergilər"],
    [/\bAll transfers\b/gi, "Bütün transferlər"],
    [/\bBuffet breakfast\b/gi, "Bufet səhər yeməyi"],
    [/\bZakher Travel\b/g, "Zakher Travel"],
    [/\bZakher agency\b/gi, "Zakher agentliyi"],
    [/\bReservation of hotels\b/gi, "Otellərin bron edilməsi"],
    [/\bAir ticket sales\b/gi, "Aviabiletlərin satışı"],
    [/\bTransfer services\b/gi, "Transfer xidmətləri"],
    [/\bTravel insurance\b/gi, "Səyahət sığortası"],
    [/\bVisa-support services\b/gi, "Viza dəstək xidmətləri"],
    [/\bBooking\b/g, "Bron"],
    [/^Tour Details$/i, "Tur detalları"],
    [/^Transport Packages$/i, "Nəqliyyat paketləri"],
    [/^Inclusions & Exclusions$/i, "Daxil olanlar və olmayanlar"],
    [/\bExperience\b/g, "Təcrübə"],
    [/\bUnforgettable\b/g, "Unudulmaz"],
    [/\bLuxury\b/g, "Lüks"],
    [/\bPremium\b/g, "Premium"],
    [/\bExpert\b/g, "Ekspert"],
    [/\bTailor-made\b/gi, "Fərdi hazırlanmış"],
    [/\bSince 2016\b/g, "2016-cı ildən"],
    [/\byour online and offline supplier in the world since 2016\b/i,
      "2016-cı ildən bütün dünyada onlayn və oflayn təchizatçınız"],
    [/\bUnrivaled expertise for unique travel experiences\. We're here to take you there dream travels!\b/i,
      "Unikal səyahət təcrübələri üçün misilsiz peşəkarlıq. Xəyallarınızdakı səyahətə sizi aparmaq üçün buradayıq!"],
    [/\bGet in touch with Zakher Travel in Baku or Dubai for tour packages, partnerships, and travel support\.\b/i,
      "Tur paketləri, tərəfdaşlıq və səyahət dəstəyi üçün Bakı və ya Dubay ofisimizlə əlaqə saxlayın."],
    [/\bBrowse Zakher Travel tour packages across Azerbaijan, Turkiye, Georgia, UAE, Central Asia, and Europe\. Explore destinations and individual tours\.\b/i,
      "Azərbaycan, Türkiyə, Gürcüstan, BƏƏ, Mərkəzi Asiya və Avropa üzrə Zakher Travel tur paketlərinə baxın. İstiqamətləri və fərdi turları kəşf edin."],
    [/\bFollow Zakher Travel on Facebook, Instagram, YouTube, TikTok, LinkedIn, and more\. Connect with our regional accounts across Azerbaijan, UAE, Europe, and beyond\.\b/i,
      "Zakher Travel-i Facebook, Instagram, YouTube, TikTok, LinkedIn və digər platformalarda izləyin. Azərbaycan, BƏƏ, Avropa və digər regionlardakı hesablarımızla əlaqə saxlayın."],
    [/\bContact Zakher Travel head office in Baku or Dubai office for tour packages, bookings, and travel support\.\b/i,
      "Tur paketləri, bronlar və səyahət dəstəyi üçün Zakher Travel-in Bakı baş ofisi və ya Dubay filialı ilə əlaqə saxlayın."],
    [/\bProfessional travel agency in Azerbaijan offering Baku city tours, Azerbaijan tour packages, visa support and unforgettable travel experiences across the Caucasus\.\b/i,
      "Bakı şəhər turları, Azərbaycan tur paketləri, viza dəstəyi və Qafqaz boyunca unudulmaz səyahət təcrübələri təklif edən peşəkar səyahət agentliyi."],
    [/\b1 Trip - 3 Countries\b/i, "1 səfər — 3 ölkə"],
    [/\bAzerbaijan, Turkiye and Georgia — one seamless journey across three unforgettable destinations\.\b/i,
      "Azərbaycan, Türkiyə və Gürcüstan — üç unudulmaz istiqamət üzrə vahid, problemsiz səyahət."],
    [/\bTurkiye Tours\b/i, "Türkiyə turları"],
    [/\bDiscover Türkiye with tailor-made holidays, expert guides, and premium travel services\.\b/i,
      "Fərdi hazırlanmış istirahət proqramları, peşəkar bələdçilər və premium səyahət xidmətləri ilə Türkiyəni kəşf edin."],
    [/\bUnited Arab Emirates Tours\b/i, "Birləşmiş Ərəb Emirlikləri turları"],
    [/\bExperience the UAE with VIP welcoming, luxury stays, and carefully planned travel packages\.\b/i,
      "VIP qarşılama, lüks qalma və diqqətlə planlaşdırılmış səyahət paketləri ilə BƏƏ-ni yaşayın."],
    [/\bGeorgia, Turkiye and Azerbaijan tour package\b/i, "Gürcüstan, Türkiyə və Azərbaycan tur paketi"],
    [/\bTurkiye tour package\b/i, "Türkiyə tur paketi"],
    [/\bUnited Arab Emirates tour package\b/i, "BƏƏ tur paketi"],
    [/\bCollect\b/, "Anları"],
    [/\bmoments\b/, "toplayın"],
    [/\bnot \b/, ""],
    [/\bthings\b/, ""],
    [/\.\.$/, "."],
  ];

  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }

  result = result.replace(/\s{2,}/g, " ").trim();
  return result || text;
}

function translateLongText(text: string): string {
  if (text.length < 80) return translatePhrase(text);

  const paragraphs = text.split("\n");
  return paragraphs.map((p) => translateParagraph(p)).join("\n");
}

function translateParagraph(p: string): string {
  let s = p.trim();
  if (!s) return s;

  s = s
    .replace(
      /^Pick-up & drop-off at your hotel \(inside Baku\)$/i,
      "Bakı daxilində otelinizdən götürmə və endirmə",
    )
    .replace(
      /^Personal English-speaking guide \(standard package\)$/i,
      "Fərdi ingiliscə danışan bələdçi (standart paket)",
    )
    .replace(
      /^Personal driver & air-conditioned vehicle$/i,
      "Fərdi sürücü və kondisionerli nəqliyyat",
    )
    .replace(/^Any meals$/i, "Yeməklər")
    .replace(/^Personal expenses$/i, "Şəxsi xərclər")
    .replace(/^Insurance$/i, "Sığorta")
    .replace(
      /^Economy package: professional driver, personal comfortable transportation during tours \(Mercedes Viano\/Vito\), and guide service\.$/i,
      "Ekonom paket: peşəkar sürücü, turlar zamanı fərdi rahat nəqliyyat (Mercedes Viano/Vito) və bələdçi xidməti.",
    )
    .replace(
      /^VIP package: a wide range of luxury cars \(Mercedes S class, E class, V class, etc\.\)\.$/i,
      "VIP paket: geniş lüks avtomobil seçimi (Mercedes S, E, V sinif və s.).",
    )
    .replace(
      /^Economy package: professional driver, personal comfortable transportation during tours \(Jeep 4×4\), and guide service\.$/i,
      "Ekonom paket: peşəkar sürücü, turlar zamanı fərdi rahat nəqliyyat (Jeep 4×4) və bələdçi xidməti.",
    )
    .replace(
      /^Tourism and travel-related services provided by Zakher agency$/i,
      "Zakher agentliyi tərəfindən göstərilən turizm və səyahətlə bağlı xidmətlər",
    )
    .replace(
      /^Reservation of hotels at relevant prices; air ticket sales; professional guide-translators \(male and female\); transfer services; organization of tours for individuals, groups and families; organization of regional & city tours; hunting tours; shopping tours; photography tours; legal services; VIP services; visa-support services; and travel insurance\.$/i,
      "Münasib qiymətlərlə otel bronu; aviabiletlərin satışı; peşəkar bələdçi-tərcüməçilər (kişi və qadın); transfer xidmətləri; fərdi, qrup və ailə turlarının təşkili; regional və şəhər turlarının təşkili; ov turları; alış-veriş turları; foto tur turları; hüquqi xidmətlər; VIP xidmətlər; viza dəstək xidmətləri və səyahət sığortası.",
    );

  return translatePhrase(s);
}

async function main() {
  const enPath = path.join(root, "server", "prisma", "seeds", "en.json");
  const enItems: SeedItem[] = JSON.parse(fs.readFileSync(enPath, "utf8"));

  const azItems: SeedItem[] = enItems.map((item) => ({
    key: item.key,
    locale: "az",
    value:
      item.value.length > 120
        ? translateLongText(item.value)
        : translateParagraph(item.value),
    namespace: item.namespace,
  }));

  const outPath = path.join(root, "server", "prisma", "seeds", "az.json");
  fs.writeFileSync(outPath, JSON.stringify(azItems, null, 2));

  const combined = [...enItems, ...azItems];
  const combinedPath = path.join(root, "server", "prisma", "seeds", "translations.json");
  fs.writeFileSync(combinedPath, JSON.stringify(combined, null, 2));

  const publicDir = path.join(root, "public", "i18n");
  fs.mkdirSync(publicDir, { recursive: true });

  for (const locale of ["en", "az"] as const) {
    const localeItems = locale === "en" ? enItems : azItems;
    const dict = Object.fromEntries(localeItems.map((i) => [i.key, i.value]));
    fs.writeFileSync(path.join(publicDir, `${locale}.json`), JSON.stringify(dict));
  }

  console.log(`Generated ${azItems.length} AZ translations → ${outPath}`);
  console.log(`Combined seed: ${combined.length} items → ${combinedPath}`);
}

main().catch(console.error);
