import { Chat } from './chat';

export class WebClient {
  readonly chat: Chat;

  constructor(private readonly token: string) {
    this.chat = new Chat(token);
  }
}
