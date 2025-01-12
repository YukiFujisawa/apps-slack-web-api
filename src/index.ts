/* eslint-disable @typescript-eslint/no-unused-vars */

import { WebClient } from './app/client/web-client';
import { ChatPostMessageArguments } from './app/types/chat-post-message-arguments';
import { SlackApiResponse } from './app/types/slack-api-response';

/**
 * <div class="method-description">
 *   <h3>createWebClient</h3>
 *   <p>Creates and returns a WebClient instance for interacting with the Slack API.</p>
 *
 *   <h4>Parameters</h4>
 *   <ul>
 *     <li><code>token</code> - The Slack API authentication token</li>
 *   </ul>
 *
 *   <h4>Returns</h4>
 *   <p>A configured WebClient instance</p>
 *
 *   <h4>Example</h4>
 *   <pre><code>
 * function useWebClient() {
 *   const token = 'xoxb-your-token';
 *   const web = createWebClient(token);
 *
 *   const response = web.chat.postMessage({
 *     channel: '#general',
 *     text: 'Hello!',
 *   });
 * }
 *   </code></pre>
 * </div>
 *
 * @param {string} token The Slack API authentication token
 * @returns {Object} A configured WebClient instance
 */
function createWebClient(token: string): WebClient {
  return new WebClient(token);
}

/**
 * <div class="method-description">
 *   <h3>postChatMessage</h3>
 *   <p>Sends a message to a Slack channel with support for both simple text and rich formatting options.
 *   Provides a straightforward way to post messages while maintaining flexibility for advanced features.</p>
 *
 *   <h4>Parameters</h4>
 *   <ul>
 *     <li><code>token</code> - Slack API authentication token</li>
 *     <li><code>channelId</code> - Target channel ID or name</li>
 *     <li><code>text</code> - Message text (used as fallback when attachments are provided)</li>
 *     <li><code>options</code> - Additional message configuration options</li>
 *   </ul>
 *
 *   <h4>Returns</h4>
 *   <p>The Slack API response</p>
 *
 *   <h4>Examples</h4>
 *   <div class="examples">
 *     <p><strong>Sending a Simple Message:</strong></p>
 *     <pre><code>
 * function sendSimpleMessage() {
 *   const token = 'xoxb-your-token';
 *   const channelId = '#general';
 *   const text = 'Hello from Google Apps Script!';
 *   SlackWebApi.postChatMessage(token, channelId, text);
 * }
 *     </code></pre>
 *
 *     <p><strong>Sending a Rich Message:</strong></p>
 *     <pre><code>
 * function sendRichMessage() {
 *   const token = 'xoxb-your-token';
 *   const channelId = '#general';
 *   const attachmentData = [{
 *     color: '#36a64f',
 *     pretext: 'Optional pretext that appears above the attachment',
 *     author_name: 'Author Name',
 *     author_link: 'http://example.com',
 *     title: 'Attachment Title',
 *     title_link: 'http://example.com',
 *     text: 'Main attachment text that can include *markdown*',
 *     fields: [{
 *       title: 'Field Title',
 *       value: 'Field value and formatting',
 *       short: true,
 *     }],
 *     footer: 'Footer text',
 *     ts: Date.now() / 1000
 *   }];
 *
 *   SlackWebApi.postChatMessage(
 *     token,
 *     channelId,
 *     'Message with rich formatting',
 *     {
 *       attachments: JSON.stringify(attachmentData)
 *     }
 *   );
 * }
 *     </code></pre>
 *   </div>
 * </div>
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
  options: Partial<Omit<ChatPostMessageArguments, 'channel' | 'text'>> = {}
): SlackApiResponse {
  const web = createWebClient(token);
  return web.chat.postMessage({
    channel: channelId,
    text,
    ...options,
  });
}
