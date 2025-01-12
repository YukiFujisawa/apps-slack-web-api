import { PostSlackChatMessageService } from '../service/post-slack-chat-message-service';
import { ChatPostMessageArguments } from '../types/chat-post-message-arguments';
import { SlackApiResponse } from '../types/slack-api-response';

export class Chat {
  constructor(private readonly token: string) {}

  postMessage(messageArguments: ChatPostMessageArguments): SlackApiResponse {
    return PostSlackChatMessageService.call(this.token, messageArguments);
  }
}
