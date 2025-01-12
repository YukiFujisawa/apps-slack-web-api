import { SLACK_API } from '../constants/slack-constants';
import { ChatPostMessageArguments } from '../types/chat-post-message-arguments';
import { SlackApiResponse } from '../types/slack-api-response';
import { ApiUtil } from '../util/api-util';

export class PostSlackChatMessageService {
  static call(
    token: string,
    messageArguments: ChatPostMessageArguments
  ): SlackApiResponse {
    const opt: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      payload: {
        ...messageArguments,
        token,
      },
      muteHttpExceptions: true,
    };

    const response = ApiUtil.executeWithRetry(() =>
      UrlFetchApp.fetch(`${SLACK_API.BASE_URI}/api/chat.postMessage`, opt)
    );

    const result = JSON.parse(response.getContentText());

    if (!result.ok) {
      throw new Error(`Slack API error: ${result.error}`);
    }

    return result;
  }
}
