/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Interface for chat.postMessage API method arguments.
 */
export interface ChatPostMessageArguments {
  /**
   * Channel, private group, or IM channel to send message to.
   */
  channel: string;

  /**
   * Primary message content. Required if attachments and blocks are not provided.
   * When used with attachments or blocks, serves as fallback text for notifications.
   */
  text?: string;

  /**
   * A JSON-based array of structured attachments for rich message formatting.
   * Attachments allow you to create more visually appealing messages with custom layouts and formatting.
   *
   * The attachments parameter accepts a URL-encoded JSON string containing an array of attachment objects.
   * Each attachment can include various elements such as pretext, color, author information, titles,
   * text fields, images, and footers.
   *
   * @example
   * // Create a rich message with attachments
   * const attachmentData = [{
   *   // Header section
   *   pretext: "一番上に表示されるメッセージ",
   *   color: "#33cccc",
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
   * @example [{"type": "section", "text": {"type": "plain_text", "text": "Hello world"}}]
   */
  blocks?: string;

  /**
   * Emoji to use as the icon for this message. Overrides icon_url.
   */
  icon_emoji?: string;

  /**
   * URL to an image to use as the icon for this message.
   */
  icon_url?: string;

  /**
   * Find and link user groups.
   */
  link_names?: boolean;

  /**
   * Metadata for the message (JSON string containing event_type and event_payload).
   */
  metadata?: string;

  /**
   * Disable Slack markup parsing by setting to false. Enabled by default.
   */
  mrkdwn?: boolean;

  /**
   * Change how messages are treated. Values: 'none' or 'full'
   */
  parse?: string;

  /**
   * Used with thread_ts to make reply visible to everyone in channel.
   */
  reply_broadcast?: boolean;

  /**
   * Thread parent message timestamp to reply to.
   */
  thread_ts?: string;

  /**
   * Enable unfurling of text content links.
   */
  unfurl_links?: boolean;

  /**
   * Enable/disable unfurling of media content.
   */
  unfurl_media?: boolean;

  /**
   * Custom username for bot messages.
   */
  username?: string;
}
