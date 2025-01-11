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
/**
 * Interface for chat.postMessage API method arguments.
 * chat.postMessage APIメソッドの引数を定義するインターフェース
 */
export interface ChatPostMessageArguments {
  /**
   * Channel, private group, or IM channel to send message to.
   * メッセージを送信するチャンネル、プライベートグループ、またはIMチャンネル
   */
  channel: string;

  /**
   * Primary message content. Required if attachments and blocks are not provided.
   * When used with attachments or blocks, serves as fallback text for notifications.
   *
   * メインのメッセージ内容。attachmentsとblocksが提供されていない場合は必須。
   * attachmentsまたはblocksと併用する場合、通知用のフォールバックテキストとして使用される。
   */
  text?: string;

  /**
   * A JSON-based array of structured attachments for rich message formatting.
   * Attachments allow you to create more visually appealing messages with custom layouts and formatting.
   *
   * リッチなメッセージフォーマット用の構造化されたアタッチメントの配列です。
   * アタッチメントを使用することで、カスタムレイアウトやフォーマットを含む視覚的に魅力的なメッセージを作成できます。
   *
   * The attachments parameter accepts a URL-encoded JSON string containing an array of attachment objects.
   * Each attachment can include various elements such as pretext, color, author information, titles,
   * text fields, images, and footers.
   *
   * attachmentsパラメータは、アタッチメントオブジェクトの配列を含むURLエンコードされたJSON文字列を受け取ります。
   * 各アタッチメントには、プレテキスト、色、作成者情報、タイトル、テキストフィールド、画像、
   * フッターなどの様々な要素を含めることができます。
   *
   * @example
   * // Create a rich message with attachments
   * const attachmentData = [{
   *   // Header section
   *   pretext: "一番上に表示されるメッセージ",
   *   color: "#33cccc",                              // Attachment color bar
   *
   *   // Author information
   *   author_name: "Author information",
   *   author_link: "https://example.com/",
   *
   *   // Title section
   *   title: "Title section",
   *   title_link: "https://example.com/",
   *   text: "見出し下に表示されるテキスト。\n改行可能。",
   *
   *   // Fields section
   *   fields: [{
   *     title: "中に表示される見出し（短め）",
   *     value: "text\ntext.",
   *     short: true
   *   }, {
   *     title: "中に表示される見出し（短め）",
   *     value: "text\ntext.",
   *     short: true
   *   }, {
   *     title: "中に表示される見出し",
   *     value: "text\ntext.",
   *     short: false
   *   }],
   *
   *   // Media and footer
   *   thumb_url: "https://example.com/image.png",
   *   footer: "下に表示されるテキスト",
   *   footer_icon: "https://example.com/favicon.ico",
   *   ts: 123456789     // Timestamp
   * }];
   *
   * // Send the message
   * web.chat.postMessage({
   *   channel: '#test',
   *   text: 'テキスト',
   *   attachments: JSON.stringify(attachmentData)
   * });
   */
  attachments?: string;

  /**
   * A JSON-based array of Block Kit interface elements.
   * Presented as a URL-encoded string.
   *
   * Block Kitインターフェース要素の配列。
   * URL エンコードされた文字列として提供される。
   *
   * @example [{"type": "section", "text": {"type": "plain_text", "text": "Hello world"}}]
   */
  blocks?: string;

  /**
   * Emoji to use as the icon for this message. Overrides icon_url.
   * メッセージのアイコンとして使用する絵文字。icon_urlより優先される
   */
  icon_emoji?: string;

  /**
   * URL to an image to use as the icon for this message.
   * メッセージのアイコンとして使用する画像のURL
   */
  icon_url?: string;

  /**
   * Find and link user groups.
   * ユーザーグループを検索してリンクする
   */
  link_names?: boolean;

  /**
   * Metadata for the message (JSON string containing event_type and event_payload).
   * メッセージのメタデータ（event_typeとevent_payloadを含むJSON文字列）
   */
  metadata?: string;

  /**
   * Disable Slack markup parsing by setting to false. Enabled by default.
   * falseを設定するとSlackのマークアップ解析を無効にする。デフォルトは有効
   */
  mrkdwn?: boolean;

  /**
   * Change how messages are treated. Values: 'none' or 'full'
   * メッセージの処理方法を変更する。値：'none'または'full'
   */
  parse?: string;

  /**
   * Used with thread_ts to make reply visible to everyone in channel.
   * thread_tsと併用して、返信をチャンネル全体に表示する
   */
  reply_broadcast?: boolean;

  /**
   * Thread parent message timestamp to reply to.
   * 返信する親メッセージのタイムスタンプ
   */
  thread_ts?: string;

  /**
   * Enable unfurling of text content links.
   * テキストコンテンツのリンクの展開を有効にする
   */
  unfurl_links?: boolean;

  /**
   * Enable/disable unfurling of media content.
   * メディアコンテンツの展開を有効/無効にする
   */
  unfurl_media?: boolean;

  /**
   * Custom username for bot messages.
   * ボットメッセージのカスタムユーザー名
   */
  username?: string;
}
