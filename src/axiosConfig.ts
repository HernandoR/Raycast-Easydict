/*
 * @author: tisfeng
 * @createTime: 2022-06-26 11:13
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-09-30 22:35
 * @fileName: axiosConfig.ts
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { environment, showToast, Toast } from "@raycast/api";
import axios, { AxiosRequestConfig } from "axios";
import EventEmitter from "events";
import { HttpsProxyAgent } from "https-proxy-agent";
import { getMacSystemProxy } from "mac-system-proxy";
import { myPreferences } from "./preferences";
import { printObject } from "./utils";

EventEmitter.defaultMaxListeners = 15; // default is 10.

/**
 * Calculate axios request cost time.
 */
export const requestCostTime = "requestCostTime";

configDefaultAxios();

function configDefaultAxios() {
  // Set axios timeout to 15s, since we start a loading when request is sent, we need to cancel it when timeout.
  axios.defaults.timeout = 15000;

  const requestStartTime = "request-startTime";

  axios.interceptors.request.use(function (config: AxiosRequestConfig) {
    if (config.headers) {
      config.headers[requestStartTime] = new Date().getTime();
    }
    return config;
  });
  axios.interceptors.response.use(function (response) {
    if (response.config.headers) {
      const startTime = response.config.headers[requestStartTime] as number;
      const endTime = new Date().getTime();
      response.headers[requestCostTime] = (endTime - startTime).toString();
    }
    return response;
  });
}

/**
 * Try to config axios proxy.
 *
 * * Note: get system proxy need ~0.4s
 */
export function tryConfigAxiosProxy(): Promise<void> {
  console.log(`---> configUserAxiosProxy`);
  return new Promise((resolve) => {
    getSystemHttpsAgent()
      .then((proxyURL) => {
        if (myPreferences.enableSystemProxy) {
          if (!proxyURL) {
            return resolve();
          }

          const httpsAgent = new HttpsProxyAgent(proxyURL);
          printObject(`---> httpsAgent`, httpsAgent);
          axios.defaults.httpsAgent = httpsAgent;
          resolve();
        } else {
          console.warn("disable axios httpsAgent");
          axios.defaults.httpsAgent = undefined;
          resolve();
        }
      })
      .catch((error) => {
        const errorString = JSON.stringify(error) || "";
        console.error(`---> tryConfigAxiosProxy error: ${errorString}`);
        if (myPreferences.enableSystemProxy) {
          showToast({
            style: Toast.Style.Failure,
            title: `Get system proxy error`,
            message: errorString,
          });
        }
        resolve();
      });
  });
}

/**
 * Get system https agent, and save it to process.env.PROXY_URL.
 */
export function getSystemHttpsAgent(): Promise<string | undefined> {
  console.log(`---> start getSystemHttpsAgent`);

  return new Promise((resolve, reject) => {
    /**
     * * Note: need to set env.PATH manually, otherwise will get error: "Error: spawn scutil ENOENT"
     * Detail:  https://github.com/httptoolkit/mac-system-proxy/issues/1
     */

    const env = process.env;
    // Raycast default "PATH": "/usr/bin:undefined"
    // console.log(`---> env: ${JSON.stringify(env, null, 2)}`);

    // env.PATH = "/usr/sbin"; // $ where scutil
    env.PATH = "/usr/sbin:/usr/bin:/bin:/sbin";
    // console.log(`---> env: ${JSON.stringify(env, null, 2)}`);

    if (environment.isDevelopment) {
      /**
       * handle error: unable to verify the first certificate.
       *
       * Ref: https://stackoverflow.com/questions/31673587/error-unable-to-verify-the-first-certificate-in-nodejs
       */
      // env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    }

    // Delete previous env proxy.
    delete process.env.PROXY_URL;

    const startTime = Date.now();
    getMacSystemProxy()
      .then((systemProxy) => {
        // console.log(`---> get system proxy: ${JSON.stringify(systemProxy, null, 2)}`);
        if (!systemProxy.HTTPEnable) {
          console.log(`---> no system http proxy`);
          return resolve(undefined);
        }

        // set proxy to env, so we can use it in other modules.
        const proxyURL = `http://${systemProxy.HTTPProxy}:${systemProxy.HTTPPort}`;
        console.warn(`---> get system proxy url: ${proxyURL}`);
        env.PROXY_URL = proxyURL;
        console.log(`get system proxy cost: ${Date.now() - startTime} ms`);
        resolve(proxyURL);
      })
      .catch((err) => {
        // console.error(`---> get system proxy error: ${JSON.stringify(err, null, 2)}`);
        reject(err);
      })
      .finally(() => {
        // ! need to reset env.PATH, otherwise, will throw error: '/bin/sh: osascript: command not found'
        delete env.PATH; // env.PATH = "/usr/sbin:/usr/bin:/bin:/sbin";
      });
  });
}
