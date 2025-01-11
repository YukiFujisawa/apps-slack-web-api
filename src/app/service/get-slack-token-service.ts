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

import { SLACK_API } from '../constants/slack-constants';

export class GetSlackTokenService {
  static call(name: string = ''): string | null {
    const prop = PropertiesService.getUserProperties();
    const credentialKey = `${SLACK_API.CREDENTIAL_PREFIX}${name}`;
    const credential = prop.getProperty(credentialKey);

    if (!credential) {
      return null;
    }

    try {
      const parsed = JSON.parse(credential);
      return parsed['access_token'] ?? null;
    } catch (error) {
      console.error('Error parsing credential:', error);
      return null;
    }
  }
}
