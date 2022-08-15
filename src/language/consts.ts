/*
 * @author: tisfeng
 * @createTime: 2022-08-05 10:56
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-08-15 22:55
 * @fileName: consts.ts
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { LanguageItem } from "./type";

/**
 * Language item list. Currently support 23 languages.
 *
 * Todo: add more translation supported languages. such as Google support more languages.
 */
export const languageItemList: LanguageItem[] = [
  {
    googleId: "auto", // "auto" means this API support auto detect language.
    youdaoId: "auto",
    appleDetectChineseTitle: "自动识别",
    appleId: "auto",
    francId: "und", // 'und', means undetermined
    aliyunId: "auto",
    tencentId: "auto",
    baiduLanguageId: "auto",
    caiyunId: "auto",
    englishName: "Auto",
    emoji: "🌐",
  },
  {
    googleId: "zh-CN",
    youdaoId: "zh-CHS",
    appleId: "zh_CN",
    appleDetectChineseTitle: "简体中文",
    deepLSourceId: "ZH",
    francId: "cmn",
    aliyunId: "zh",
    tencentId: "zh",
    baiduLanguageId: "zh",
    caiyunId: "zh",
    englishName: "Chinese-Simplified",
    voiceList: ["Ting-Ting"],
    emoji: "🇨🇳",
  },
  {
    googleId: "zh-TW",
    youdaoId: "zh-CHT",
    appleId: "zh-TW",
    appleDetectChineseTitle: "繁体中文",
    francId: "cmn",
    aliyunId: "zh-tw",
    tencentId: "zh-TW",
    baiduLanguageId: "cht",
    englishName: "Chinese-Traditional",
    voiceList: ["Ting-Ting"],
    emoji: "🇭🇰",
  },
  {
    googleId: "en",
    youdaoId: "en",
    appleId: "en_US",
    appleDetectChineseTitle: "英语",
    deepLSourceId: "EN",
    deepLTargetId: "EN-US", // "EN-GB" "EN-US"
    francId: "eng",
    aliyunId: "en",
    tencentId: "en",
    baiduLanguageId: "en",
    caiyunId: "en",
    englishName: "English",
    voiceList: ["Alex", "Samantha"],
    emoji: "🇺🇸",
  },
  {
    googleId: "ja",
    youdaoId: "ja",
    appleId: "ja_JP",
    appleDetectChineseTitle: "日语",
    deepLSourceId: "JA",
    francId: "jpn",
    aliyunId: "ja",
    tencentDetectId: "jp",
    tencentId: "ja",
    baiduLanguageId: "jp",
    caiyunId: "ja",
    englishName: "Japanese",
    voiceList: ["Kyoko"],
    emoji: "🇯🇵",
  },
  {
    googleId: "ko",
    youdaoId: "ko",
    appleId: "ko_KR",
    appleDetectChineseTitle: "韩语",
    francId: "kor",
    aliyunId: "ko",
    tencentDetectId: "kr",
    tencentId: "ko",
    baiduLanguageId: "kor",
    englishName: "Korean",
    voiceList: ["Yuna"],
    emoji: "🇰🇷",
  },
  {
    googleId: "fr",
    youdaoId: "fr",
    appleId: "fr_FR",
    appleDetectChineseTitle: "法语",
    deepLSourceId: "FR",
    francId: "fra",
    aliyunId: "fr",
    tencentId: "fr",
    baiduLanguageId: "fra",
    englishName: "French",
    voiceList: ["Amelie", "Thomas"],
    emoji: "🇫🇷",
  },
  {
    googleId: "es",
    youdaoId: "es",
    appleId: "es_ES",
    appleDetectChineseTitle: "西班牙语",
    deepLSourceId: "ES",
    francId: "spa",
    aliyunId: "es",
    tencentId: "es",
    baiduLanguageId: "spa",
    englishName: "Spanish",
    voiceList: ["Jorge", "Juan", "Diego", "Monica", "Paulina"],
    emoji: "🇪🇸",
  },
  {
    googleId: "pt-PT",
    youdaoId: "pt",
    appleId: "pt_BR",
    appleDetectChineseTitle: "葡萄牙语",
    deepLSourceId: "PT",
    deepLTargetId: "PT-PT", // "PT-PT" "PT-BR"
    francId: "por",
    aliyunId: "pt",
    tencentId: "pt",
    baiduLanguageId: "pt",
    englishName: "Portuguese",
    voiceList: ["Joana", "Luciana"],
    emoji: "🇵🇹",
  },
  {
    googleId: "it",
    youdaoId: "it",
    appleId: "it_IT",
    appleDetectChineseTitle: "意大利语",
    deepLSourceId: "IT",
    francId: "ita",
    aliyunId: "it",
    tencentId: "it",
    baiduLanguageId: "it",
    englishName: "Italian",
    voiceList: ["Alice", "Luca"],
    emoji: "🇮🇹",
  },
  {
    googleId: "de",
    youdaoId: "de",
    appleId: "de_DE",
    appleDetectChineseTitle: "德语",
    deepLSourceId: "DE",
    francId: "deu",
    aliyunId: "de",
    tencentId: "de",
    baiduLanguageId: "de",
    englishName: "German",
    voiceList: ["Anna"],
    emoji: "🇩🇪",
  },
  {
    googleId: "ru",
    youdaoId: "ru",
    appleId: "ru_RU",
    appleDetectChineseTitle: "俄语",
    deepLSourceId: "RU",
    francId: "rus",
    aliyunId: "ru",
    tencentId: "ru",
    baiduLanguageId: "ru",
    englishName: "Russian",
    voiceList: ["Milena", "Yuri"],
    emoji: "🇷🇺",
  },
  {
    googleId: "ar",
    youdaoId: "ar",
    appleId: "ar_AE",
    appleDetectChineseTitle: "阿拉伯语",
    francId: "arb",
    aliyunId: "ar",
    tencentId: "ar",
    baiduLanguageId: "ara",
    englishName: "Arabic",
    voiceList: ["Maged"],
    emoji: "🇦🇪",
  },
  {
    googleId: "sv",
    youdaoId: "sv",
    appleDetectChineseTitle: "瑞典语",
    deepLSourceId: "SV",
    francId: "swe",
    aliyunId: "sv",
    baiduLanguageId: "swe",
    englishName: "Swedish",
    voiceList: ["Alva"],
    emoji: "🇸🇪",
  },
  {
    googleId: "ro",
    youdaoId: "ro",
    appleDetectChineseTitle: "罗马尼亚语",
    deepLSourceId: "RO",
    francId: "ron",
    aliyunId: "ro",
    baiduLanguageId: "rom",
    englishName: "Romanian",
    voiceList: ["Ioana"],
    emoji: "🇷🇴",
  },
  {
    googleId: "th",
    youdaoId: "th",
    appleDetectChineseTitle: "泰语",
    francId: "tha",
    aliyunId: "th",
    tencentId: "th",
    baiduLanguageId: "th",
    englishName: "Thai",
    voiceList: ["Kanya"],
    emoji: "🇹🇭",
  },
  {
    googleId: "sk",
    youdaoId: "sk",
    appleDetectChineseTitle: "斯洛伐克语",
    deepLSourceId: "SK",
    francId: "slk",
    aliyunId: "sk",
    baiduLanguageId: "slo",
    englishName: "Slovak",
    voiceList: ["Laura"],
    emoji: "🇸🇰",
  },
  {
    googleId: "nl",
    youdaoId: "nl",
    appleDetectChineseTitle: "荷兰语",
    deepLSourceId: "NL",
    francId: "nld",
    aliyunId: "nl",
    baiduLanguageId: "nl",
    englishName: "Dutch",
    voiceList: ["Ellen", "Xander"],
    emoji: "🇳🇱",
  },
  {
    googleId: "hu",
    youdaoId: "hu",
    appleDetectChineseTitle: "匈牙利语",
    deepLSourceId: "HU",
    francId: "hun",
    aliyunId: "hu",
    baiduLanguageId: "hu",
    englishName: "Hungarian",
    voiceList: ["Mariska"],
    emoji: "🇭🇺",
  },
  {
    googleId: "el",
    youdaoId: "el",
    appleDetectChineseTitle: "希腊语",
    deepLSourceId: "EL",
    francId: "ell",
    aliyunId: "el",
    baiduLanguageId: "el",
    englishName: "Greek",
    voiceList: ["Melina"],
    emoji: "🇬🇷",
  },
  {
    googleId: "da",
    youdaoId: "da",
    appleDetectChineseTitle: "丹麦语",
    deepLSourceId: "DA",
    francId: "dan",
    aliyunId: "da",
    baiduLanguageId: "dan",
    englishName: "Danish",
    voiceList: ["Sara"],
    emoji: "🇩🇰",
  },
  {
    googleId: "fi",
    youdaoId: "fi",
    appleDetectChineseTitle: "芬兰语",
    deepLSourceId: "FI",
    francId: "fin",
    aliyunId: "fi",
    baiduLanguageId: "fin",
    englishName: "Finnish",
    voiceList: ["Satu"],
    emoji: "🇫🇮",
  },
  {
    googleId: "pl",
    youdaoId: "pl",
    appleDetectChineseTitle: "波兰语",
    deepLSourceId: "PL",
    francId: "pol",
    aliyunId: "pl",
    baiduLanguageId: "pl",
    englishName: "Polish",
    voiceList: ["Zosia"],
    emoji: "🇵🇱",
  },
  {
    googleId: "cs",
    youdaoId: "cs",
    appleDetectChineseTitle: "捷克语",
    deepLSourceId: "CS",
    francId: "ces",
    aliyunId: "cs",
    baiduLanguageId: "cs",
    englishName: "Czech",
    voiceList: ["Zuzana"],
    emoji: "🇨🇿",
  },
];
