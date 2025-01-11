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
import { SlackMessageOptions } from '../types/slack-types';

// src/app/domain/slack-message.ts
export class SlackMessage {
  constructor(
    private readonly channel: string,
    private readonly text: string,
    private readonly options: Partial<SlackMessageOptions> = {}
  ) {}

  toPayload(): SlackMessageOptions {
    return {
      channel: this.channel,
      text: this.text,
      ...this.options,
    };
  }
}
