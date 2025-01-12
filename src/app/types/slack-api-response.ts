/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SlackApiResponse {
  ok: boolean;
  error?: string;
  [key: string]: any;
}
