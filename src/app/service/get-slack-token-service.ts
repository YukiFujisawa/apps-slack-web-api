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
