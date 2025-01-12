import { SLACK_API } from '../constants/slack-constants';
import { SlackCredential } from '../types/slack-credential';

export class SaveSlackTokenService {
  static call(token: string, name: string = ''): void {
    const prop = PropertiesService.getUserProperties();
    const credentialKey = `${SLACK_API.CREDENTIAL_PREFIX}${name}`;

    const credential: SlackCredential = {
      access_token: token,
    };

    prop.setProperty(credentialKey, JSON.stringify(credential));
  }
}
