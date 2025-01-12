/* eslint-disable @typescript-eslint/no-unused-vars */

import { WebClient } from './app/client/web-client';
import { ChatPostMessageArguments } from './app/types/chat-post-message-arguments';
import { SlackApiResponse } from './app/types/slack-api-response';

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

/**
 * シンプルなSlackメッセージ送信機能を提供します。
 * 基本的なメッセージ投稿のニーズに対応します。
 *
 * @param token - Slack APIの認証トークン
 * @param channelId - 対象のチャンネルIDまたは名前
 * @param text - メッセージテキスト
 * @param options - 追加のメッセージオプション（任意）
 * @returns Slack APIのレスポンス
 *
 * @example
 * // 単純なテキストメッセージの送信
 * postSlackMessage(
 *   'xoxb-your-token',
 *   '#general',
 *   'GASからこんにちは！'
 * );
 *
 * // アタッチメント付きメッセージの送信
 * postSlackMessage(
 *   'xoxb-your-token',
 *   '#general',
 *   'アタッチメント付きメッセージ',
 *   {
 *     attachments: JSON.stringify([{
 *       title: 'タイトル',
 *       text: '詳細な内容をここに'
 *     }])
 *   }
 * );
 */
function postSlackMessage(
  token: string,
  channelId: string,
  text: string,
  options: Partial<Omit<ChatPostMessageArguments, 'channel' | 'text'>> = {}
): SlackApiResponse {
  const client = new WebClient(token);
  return client.chat.postMessage({
    channel: channelId,
    text,
    ...options,
  });
}
