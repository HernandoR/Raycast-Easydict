/*
 * @author: tisfeng
 * @createTime: 2022-06-26 11:13
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-06-27 10:34
 * @fileName: request.ts
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import axios, { AxiosRequestConfig } from "axios";
import CryptoJS from "crypto-js";
import querystring from "node:querystring";
import {
  defaultBaiduAppId,
  defaultBaiduAppSecret,
  defaultCaiyunToken,
  defaultTencentSecretId,
  defaultTencentSecretKey,
  defaultYoudaoAppId,
  defaultYoudaoAppSecret,
  getLanguageItemFromYoudaoId,
  myPreferences,
} from "./utils";
import * as tencentcloud from "tencentcloud-sdk-nodejs-tmt";
import { TencentTranslateResult, TranslateTypeResult } from "./types";
import { TranslateType } from "./consts";
import { LanguageDetectType, LanguageDetectTypeResult } from "./detectLanguage";

// youdao appid and appsecret
const youdaoAppId = myPreferences.youdaoAppId.trim().length > 0 ? myPreferences.youdaoAppId.trim() : defaultYoudaoAppId;
const youdaoAppSecret =
  myPreferences.youdaoAppSecret.trim().length > 0 ? myPreferences.youdaoAppSecret.trim() : defaultYoudaoAppSecret;

// baidu app id and secret
const baiduAppId = myPreferences.baiduAppId.trim().length > 0 ? myPreferences.baiduAppId.trim() : defaultBaiduAppId;
const baiduAppSecret =
  myPreferences.baiduAppSecret.trim().length > 0 ? myPreferences.baiduAppSecret.trim() : defaultBaiduAppSecret;

// tencent secret id and key
const tencentSecretId =
  myPreferences.tencentSecretId.trim().length > 0 ? myPreferences.tencentSecretId.trim() : defaultTencentSecretId;
const tencentSecretKey =
  myPreferences.tencentSecretKey.trim().length > 0 ? myPreferences.tencentSecretKey.trim() : defaultTencentSecretKey;

const caiyunToken = myPreferences.caiyunToken.trim().length > 0 ? myPreferences.caiyunToken.trim() : defaultCaiyunToken;

const tencentEndpoint = "tmt.tencentcloudapi.com";
const tencentRegion = "ap-guangzhou";
const tencentProjectId = 0;
const TmtClient = tencentcloud.tmt.v20180321.Client;

const clientConfig = {
  credential: {
    secretId: tencentSecretId,
    secretKey: tencentSecretKey,
  },
  region: tencentRegion,
  profile: {
    httpProfile: {
      endpoint: tencentEndpoint,
    },
  },
};
const client = new TmtClient(clientConfig);

// caclulate axios request cost time
const requestDuration = "request-duration";
axios.interceptors.request.use(function (config: AxiosRequestConfig) {
  if (config.headers) {
    config.headers["request-startTime"] = new Date().getTime();
  }
  return config;
});
axios.interceptors.response.use(function (response) {
  if (response.config.headers) {
    const startTime = response.config.headers["request-startTime"] as number;
    const endTime = new Date().getTime();
    response.headers[requestDuration] = (endTime - startTime).toString();
  }
  return response;
});

/**
 * 腾讯语种识别，5次/秒
 * doc: https://cloud.tencent.com/document/product/551/15620?cps_key=1d358d18a7a17b4a6df8d67a62fd3d3d
 */
export function tencentLanguageDetect(text: string): Promise<LanguageDetectTypeResult> {
  const params = {
    Text: text,
    ProjectId: tencentProjectId,
  };
  const startTime = new Date().getTime();
  return new Promise((resolve, reject) => {
    client.LanguageDetect(params, function (err, response) {
      if (err) {
        reject(err);
      } else {
        const endTime = new Date().getTime();
        console.warn(`tencen detect: ${response.Lang}, cost: ${endTime - startTime} ms`);
        resolve({
          type: LanguageDetectType.Tencent,
          youdaoLanguageId: response.Lang || "",
        });
      }
    });
  });
}

/**
 * 腾讯文本翻译，5次/秒
 * 文档：https://console.cloud.tencent.com/api/explorer?Product=tmt&Version=2018-03-21&Action=TextTranslate&SignVersion=
 */
export function requestTencentTextTranslate(
  queryText: string,
  fromLanguage: string,
  targetLanguage: string
): Promise<TranslateTypeResult> {
  const from = getLanguageItemFromYoudaoId(fromLanguage).tencentLanguageId || "auto";
  const to = getLanguageItemFromYoudaoId(targetLanguage).tencentLanguageId;
  if (!to) {
    return Promise.reject(new Error("Target language is not supported by Tencent Translate"));
  }
  const params = {
    SourceText: queryText,
    Source: from,
    Target: to,
    ProjectId: tencentProjectId,
  };
  const startTime = new Date().getTime();
  return new Promise((resolve, reject) => {
    client.TextTranslate(params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        const endTime = new Date().getTime();
        console.warn(`tencent translate cost: ${endTime - startTime} ms`);
        resolve({
          type: TranslateType.Tencent,
          result: response as TencentTranslateResult,
        });
      }
    });
  });
}

/**
 * 有道翻译
 * 文档：https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html
 */
export function requestYoudaoDictionary(
  queryText: string,
  fromLanguage: string,
  targetLanguage: string
): Promise<TranslateTypeResult> {
  function truncate(q: string): string {
    const len = q.length;
    return len <= 20 ? q : q.substring(0, 10) + len + q.substring(len - 10, len);
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const salt = timestamp;
  const sha256Content = youdaoAppId + truncate(queryText) + salt + timestamp + youdaoAppSecret;
  const sign = CryptoJS.SHA256(sha256Content).toString();
  const url = "https://openapi.youdao.com/api";
  const params = querystring.stringify({
    sign,
    salt,
    from: fromLanguage,
    signType: "v3",
    q: queryText,
    appKey: youdaoAppId,
    curtime: timestamp,
    to: targetLanguage,
  });

  return new Promise((resolve) => {
    axios.post(url, params).then((response) => {
      console.warn(`youdao translate cost: ${response.headers[requestDuration]} ms`);
      resolve({
        type: TranslateType.Youdao,
        result: response.data,
      });
    });
  });
}

//
/**
 * 百度翻译API
 * 文档：https://fanyi-api.baidu.com/doc/21
 */
export function requestBaiduTextTranslate(
  queryText: string,
  fromLanguage: string,
  targetLanguage: string
): Promise<TranslateTypeResult> {
  const salt = Math.round(new Date().getTime() / 1000);
  const md5Content = baiduAppId + queryText + salt + baiduAppSecret;
  const sign = CryptoJS.MD5(md5Content).toString();
  const url = "https://fanyi-api.baidu.com/api/trans/vip/translate";
  const from = getLanguageItemFromYoudaoId(fromLanguage).baiduLanguageId;
  const to = getLanguageItemFromYoudaoId(targetLanguage).baiduLanguageId;
  const encodeQueryText = Buffer.from(queryText, "utf8").toString();
  const params = {
    q: encodeQueryText,
    from: from,
    to: to,
    appid: baiduAppId,
    salt: salt,
    sign: sign,
  };
  return new Promise((resolve) => {
    axios.get(url, { params }).then((response) => {
      console.warn(`baidu cost: ${response.headers[requestDuration]} ms`);
      resolve({
        type: TranslateType.Baidu,
        result: response.data,
      });
    });
  });
}

/**
 * 彩云小译
 * 文档：https://docs.caiyunapp.com/blog/2018/09/03/lingocloud-api/#python-%E8%B0%83%E7%94%A8
 */
export function requestCaiyunTextTranslate(
  queryText: string,
  fromLanguage: string,
  targetLanguage: string
): Promise<TranslateTypeResult> {
  const url = "https://api.interpreter.caiyunai.com/v1/translator";
  const from = getLanguageItemFromYoudaoId(fromLanguage).caiyunLanguageId || "auto";
  const to = getLanguageItemFromYoudaoId(targetLanguage).caiyunLanguageId;
  const trans_type = `${from}2${to}`; // "auto2xx";

  // Note that Caiyun Xiaoyi only supports these types of translation at present.
  const supportedTranslatType = ["zh2en", "zh2ja", "en2zh", "ja2zh"];
  if (!supportedTranslatType.includes(trans_type)) {
    return Promise.resolve({
      type: TranslateType.Caiyun,
      result: null,
    });
  }

  const params = {
    source: queryText.split("\n"), // source can be text or array. if source is an array, it will be translated in parallel
    trans_type,
    detect: from === "auto",
  };
  const headers = {
    headers: {
      "content-type": "application/json",
      "x-authorization": "token " + caiyunToken,
    },
  };
  return new Promise((resolve) => {
    axios
      .post(url, params, headers)
      .then((response) => {
        console.warn(`caiyun cost: ${response.headers[requestDuration]} ms`);
        resolve({
          type: TranslateType.Caiyun,
          result: response.data,
        });
      })
      .catch((error) => {
        resolve({
          type: TranslateType.Caiyun,
          result: null,
          errorInfo: {
            errorCode: error.response.status,
            errorMessage: error.response.statusText,
          },
        });
        console.error("response: ", error.response);
      });
  });
}
