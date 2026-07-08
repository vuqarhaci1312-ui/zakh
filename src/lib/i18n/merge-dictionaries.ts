import type { Locale } from "./language-data";
import type { TranslationDictionary } from "./create-translator";

const AZ_CHARS = /[əöüşçğı]/i;

const EN_FUNCTION_WORDS =
  /\b(the|and|with|from|for|you|will|our|this|that|are|was|were|have|has|been|being|during|after|before|also|than|into|through|which|while|where|when|what|who|how|all|each|every|both|few|more|most|other|some|such|only|very|just|about|above|across|among|around|because|between|but|by|even|however|if|in|is|it|its|of|on|or|out|over|own|same|so|than|their|them|then|there|these|they|those|though|to|too|under|until|up|upon|whether|within|without|would|your|an|at|be|can|could|did|do|does|doing|done|get|got|had|her|here|him|his|let|like|made|make|may|might|must|not|now|off|once|shall|she|should|still|us|we|well|were|what|when|where|which|who|why|will|with|would|you|your|as|located|designed|offers|everything|including|helping|thousands|received|introduce|charming|established|cooperation|managed|outstanding|achievement|officially|started|activity|provide|customers|operator|departure|arrival|accommodation|expenditures|personal|meals|drinks|taxes|included|excluded|return|less|months|opening|hosted|inaugural|equipped|luxurious|unique|positioned|hectares|undulating|accessible|landing|lasting|impression|feel|find|place|eat|drink|socialize|honour|distance|population|consists|original|nationality|rich|culture|known|hospitality|operating|round|belongs|largest|historical|monuments|includes|fortress|walls|century|tomb|keeps|alive|famous|dance|name|lies|outskirts|ridge|foot|plateau|peak|altitude|ancient|route|mostly|ethnic|history|closely|connected|states|territory|winter|waterfalls|freeze|climbing|competitions|organized|frozen|falls|full|service|agency|customized|excellence|business|leisure|clients|travel|companies|contracts|friendly|staff|people|tailor|made|holidays|see|stop|near|dinner|local|restaurant|extra|payment|trip|opportunity|horse|riding|on the way|for extra|all year|home to|one of the|as a|we are|our professional)\b/gi;

function countEnglishFunctionWords(text: string): number {
  return (text.match(EN_FUNCTION_WORDS) ?? []).length;
}

function countAzChars(text: string): number {
  return (text.match(/[əöüşçığı]/gi) ?? []).length;
}

function isCodeBoundNavigationKey(key: string): boolean {
  return key.startsWith("nav.pillLinks.") || key.startsWith("nav.links.");
}

function translationScore(
  text: string,
  locale: Locale,
  enValue?: string,
): number {
  const trimmed = text.trim();
  if (!trimmed) return -1000;
  if (enValue && trimmed === enValue.trim()) return -500;

  let score = 0;
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const englishWords = countEnglishFunctionWords(trimmed);

  if (locale === "az") {
    const azChars = countAzChars(trimmed);
    score += azChars * 3;
    score -= englishWords * 5;

    if (wordCount > 6 && englishWords >= 4) score -= 30;
    if (wordCount > 6 && englishWords >= 2 && azChars === 0) score -= 40;

    if (enValue && wordCount > 8) {
      for (const sentence of enValue.split(/[.!?\n]+/)) {
        const chunk = sentence.trim();
        if (chunk.length > 50 && countEnglishFunctionWords(chunk) >= 4) {
          if (trimmed.includes(chunk.slice(0, 72))) score -= 50;
        }
      }
    }

    if (wordCount <= 5 && englishWords === 0) score += 10;
    return score;
  }

  if (locale === "ru") {
    const cyrillic = (trimmed.match(/[а-яА-ЯёЁ]/g) ?? []).length;
    score += cyrillic * 2;
    score -= englishWords * 5;
    if (wordCount <= 5 && cyrillic > 0) score += 10;
    return score;
  }

  if (locale === "ar") {
    const arabic = (trimmed.match(/[\u0600-\u06FF]/g) ?? []).length;
    score += arabic * 2;
    score -= englishWords * 5;
    if (wordCount <= 5 && arabic > 0) score += 10;
    return score;
  }

  return score;
}

export function mergeTranslationDictionaries(
  locale: Locale,
  apiDict: TranslationDictionary,
  staticDict: TranslationDictionary,
  enDict: TranslationDictionary = {},
): TranslationDictionary {
  if (locale === "en") {
    return { ...apiDict, ...staticDict };
  }

  const merged: TranslationDictionary = { ...apiDict };
  const keys = new Set([...Object.keys(apiDict), ...Object.keys(staticDict)]);

  for (const key of keys) {
    const apiVal = apiDict[key] ?? "";
    const staticVal = staticDict[key] ?? "";
    const enVal = enDict[key];

    if (isCodeBoundNavigationKey(key) && staticVal.trim()) {
      merged[key] = staticVal;
      continue;
    }

    if (!staticVal.trim()) continue;

    if (!apiVal.trim()) {
      if (translationScore(staticVal, locale, enVal) >= 0) {
        merged[key] = staticVal;
      }
      continue;
    }

    const apiScore = translationScore(apiVal, locale, enVal);
    const staticScore = translationScore(staticVal, locale, enVal);

    if (staticScore > apiScore + 1) {
      merged[key] = staticVal;
    }
  }

  return merged;
}

export function isWeakLocaleValue(
  value: string,
  enValue: string | undefined,
  locale: Locale,
): boolean {
  return translationScore(value, locale, enValue) < 0;
}

export { AZ_CHARS };
