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
import { SLACK_API } from '../constants/slack-constants';
import { SlackApiResponse } from '../types/slack-types';

export class SendSlackMessageService {
  static call(
    method: string,
    payload: Record<string, any>,
    token: string,
    fetchOptions: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {}
  ): SlackApiResponse {
    const apiEndpoint = `${SLACK_API.BASE_URI}/api/`;
    const opt: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      payload: {
        ...payload,
        token,
      },
      muteHttpExceptions: true,
      ...fetchOptions,
    };

    const response = this.executeWithRetry(() =>
      UrlFetchApp.fetch(`${apiEndpoint}${method}`, opt)
    );

    const result = JSON.parse(response.getContentText());

    if (!result.ok) {
      throw new Error(`Slack API error: ${result.error}`);
    }

    return result;
  }

  private static executeWithRetry<T>(
    fn: () => T,
    maxRetries: number = SLACK_API.DEFAULT_MAX_RETRIES
  ): T {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return fn();
      } catch (error) {
        if (attempt === maxRetries - 1) {
          throw error;
        }
        const backoffMs = 1000 * Math.pow(2, attempt);
        Utilities.sleep(backoffMs);
      }
    }
    throw new Error('Max retries exceeded');
  }
}
