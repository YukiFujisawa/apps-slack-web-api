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

declare namespace SlackWebApi {
  interface WebClient {
    chat: {
      postMessage(args: ChatPostMessageArguments): SlackApiResponse;
    };
  }

  interface ChatPostMessageArguments {
    channel: string;
    text: string;
    attachments?: string;
    thread_ts?: string;
    reply_broadcast?: boolean;
    parse?: 'full' | 'none';
    link_names?: boolean;
    blocks?: string;
    unfurl_links?: boolean;
    unfurl_media?: boolean;
    username?: string;
    as_user?: boolean;
    icon_url?: string;
    icon_emoji?: string;
    mrkdwn?: boolean;
    metadata?: string;
  }

  interface SlackApiResponse {
    ok: boolean;
    channel: string;
    ts: string;
    message: {
      text: string;
      username: string;
      bot_id?: string;
      attachments?: any[];
      type: string;
      subtype?: string;
      ts: string;
    };
  }

  /**
   * Creates and returns a WebClient instance for interacting with the Slack API.
   *
   * @param {string} token The Slack API authentication token
   * @returns {Object} A configured WebClient instance
   */
  function createWebClient(token: string): WebClient;

  /**
   * Sends a message to a Slack channel with support for both simple text and rich formatting options.
   *
   * @param {string} token Slack API authentication token
   * @param {string} channelId Target channel ID or name
   * @param {string} text Message text (used as fallback when attachments are provided)
   * @param {Object} options Additional message configuration options
   * @returns {Object} The Slack API response
   */
  function postChatMessage(
    token: string,
    channelId: string,
    text: string,
    options?: Partial<Omit<ChatPostMessageArguments, 'channel' | 'text'>>
  ): SlackApiResponse;
}
