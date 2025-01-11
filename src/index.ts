/**
 * Copyright 2025 Yuki Fujisawa - wywy.jp
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { WebClient } from './app/client/web-client';

/**
 * Creates and returns a WebClient instance for interacting with the Slack API.
 * Slack APIのWebClientインスタンスを生成します。
 *
 * @param token - The Slack API authentication token
 *               Slack APIの認証トークン
 * @returns A configured WebClient instance
 *          設定済みのWebClientインスタンス
 * @example
 * const client = createWebClient('xoxb-your-token');
 * const response = client.chat.postMessage({
 *   channel: '#general',
 *   text: 'Hello!'
 * });
 */
function createWebClient(token: string): WebClient {
  return new WebClient(token);
}
