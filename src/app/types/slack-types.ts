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
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SlackCredential {
  access_token: string;
}

export interface SlackMessageOptions {
  channel: string;
  text: string;
  username?: string;
  icon_emoji?: string;
  icon_url?: string;
  thread_ts?: string;
  reply_broadcast?: boolean;
  parse?: 'full' | 'none';
  link_names?: boolean;
  blocks?: any[];
  attachments?: any[];
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  [key: string]: any;
}

export interface SlackApiResponse {
  ok: boolean;
  error?: string;
  [key: string]: any;
}
