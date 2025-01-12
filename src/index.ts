/* eslint-disable @typescript-eslint/no-unused-vars */

import { WebClient } from './app/client/web-client';
import { ChatPostMessageArguments } from './app/types/chat-post-message-arguments';
import { SlackApiResponse } from './app/types/slack-api-response';

/**
 * Creates and returns a WebClient instance for interacting with the Slack API.
 *
 * @param token - The Slack API authentication token
 * @returns A configured WebClient instance
 * @example
 * const web = SlackWebApi.createWebClient('xoxb-your-token');
 * const response = web.chat.postMessage({
 *   channel: '#general',
 *   text: 'Hello!'
 * });
 */
function createWebClient(token: string): WebClient {
  return new WebClient(token);
}

/**
 * Sends a message to a Slack channel with support for both simple text and rich formatting options.
 * Provides a straightforward way to post messages while maintaining flexibility for advanced features.
 *
 * @param token - Slack API authentication token
 * @param channelId - Target channel ID or name
 * @param text - Message text (used as fallback when attachments are provided)
 * @param options - Additional message configuration options
 * @returns The Slack API response
 *
 * @example
 * // Simple text message
 * postChatMessage(
 *   'xoxb-your-token',
 *   '#general',
 *   'Hello from Google Apps Script!'
 * );
 *
 * // Rich message with attachments
 * const attachmentData = [{
 *   color: '#36a64f',
 *   pretext: 'Optional pretext that appears above the attachment',
 *   author_name: 'Author Name',
 *   author_link: 'http://example.com',
 *   title: 'Attachment Title',
 *   title_link: 'http://example.com',
 *   text: 'Main attachment text that can include *markdown*',
 *   fields: [{
 *     title: 'Field Title',
 *     value: 'Field value and formatting',
 *     short: true
 *   }],
 *   footer: 'Footer text',
 *   ts: Date.now() / 1000
 * }];
 *
 * SlackWebApi.postChatMessage(
 *   'xoxb-your-token',
 *   '#general',
 *   'Message with rich formatting',
 *   {
 *     attachments: JSON.stringify(attachmentData)
 *   }
 * );
 */
function postChatMessage(
  token: string,
  channelId: string,
  text: string,
  options: Partial<Omit<ChatPostMessageArguments, 'channel' | 'text'>> = {}
): SlackApiResponse {
  const web = createWebClient(token);
  return web.chat.postMessage({
    channel: channelId,
    text,
    ...options,
  });
}

/**
 * Tests the postChatMessage function by sending a simple text message and a rich message with attachments.
 */
function testpostChatMessage() {
  // Send a simple text message
  const token = 'xoxb-your';
  const channelId = '#general';
  const text = 'Hello from Google Apps Script!';
  postChatMessage(token, channelId, text);

  // Send a rich message with attachments
  const attachmentData = [
    {
      color: '#36a64f',
      pretext: 'Optional pretext that appears above the attachment',
      author_name: 'Author Name',
      author_link: 'http://example.com',
      title: 'Attachment Title',
      title_link: 'http://example.com',
      text: 'Main attachment text that can include *markdown*',
      fields: [
        {
          title: 'Field Title',
          value: 'Field value and formatting',
          short: true,
        },
      ],
      footer: 'Footer text',
      ts: Date.now() / 1000,
    },
  ];
  postChatMessage(token, channelId, 'Message with rich formatting', {
    attachments: JSON.stringify(attachmentData),
  });
}
