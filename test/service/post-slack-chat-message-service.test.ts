import { SLACK_API } from '../../src/app/constants/slack-constants';
import { PostSlackChatMessageService } from '../../src/app/service/post-slack-chat-message-service';
import { ChatPostMessageArguments } from '../../src/app/types/chat-post-message-arguments';
import { ApiUtil } from '../../src/app/util/api-util';

jest.mock('../../src/app/util/api-util');

describe('PostSlackChatMessageService', () => {
  // 共通で使用するモックデータの定義
  const mockToken = 'test-token';
  const mockMessageArguments: ChatPostMessageArguments = {
    channel: 'test-channel',
    text: 'Hello, world!',
    thread_ts: '1234567890.123456',
    username: 'TestBot',
  };

  const mockAttachments = [
    {
      color: '#36a64f',
      pretext: 'テスト通知',
      author_name: 'テストユーザー',
      title: 'テストタイトル',
      title_link: 'https://example.com',
      text: 'テスト本文',
      fields: [
        {
          title: 'Priority',
          value: 'High',
          short: false,
        },
      ],
      footer: 'Slack API',
      ts: 123456789,
    },
  ];

  // テスト実行前の初期化
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('call', () => {
    it('Slackにメッセージを投稿できること、およびパラメータが正しく設定されていること', () => {
      const successResponse = {
        ok: true,
        channel: 'test-channel',
        message: { ts: '1234567890.123456' },
      };

      const mockResponse = {
        getContentText: jest
          .fn()
          .mockReturnValue(JSON.stringify(successResponse)),
      };

      (ApiUtil.executeWithRetry as jest.Mock).mockReturnValue(mockResponse);

      const result = PostSlackChatMessageService.call(
        mockToken,
        mockMessageArguments
      );

      expect(ApiUtil.executeWithRetry).toHaveBeenCalledTimes(1);
      expect(result).toEqual(successResponse);

      const executeCallback = (ApiUtil.executeWithRetry as jest.Mock).mock
        .calls[0][0];
      executeCallback();

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        `${SLACK_API.BASE_URI}/api/chat.postMessage`,
        {
          method: 'post',
          payload: {
            ...mockMessageArguments,
            token: mockToken,
          },
          muteHttpExceptions: true,
        }
      );
    });

    it('添付ファイルを含むリッチメッセージを正しく投稿できること', () => {
      const messageWithAttachments: ChatPostMessageArguments = {
        ...mockMessageArguments,
        attachments: JSON.stringify(mockAttachments),
        unfurl_links: false,
        unfurl_media: false,
      };

      const successResponse = {
        ok: true,
        channel: 'test-channel',
        message: {
          ts: '1234567890.123456',
          attachments: mockAttachments,
        },
      };

      const mockResponse = {
        getContentText: jest
          .fn()
          .mockReturnValue(JSON.stringify(successResponse)),
      };

      (ApiUtil.executeWithRetry as jest.Mock).mockReturnValue(mockResponse);

      const result = PostSlackChatMessageService.call(
        mockToken,
        messageWithAttachments
      );

      expect(ApiUtil.executeWithRetry).toHaveBeenCalledTimes(1);
      expect(result).toEqual(successResponse);

      const executeCallback = (ApiUtil.executeWithRetry as jest.Mock).mock
        .calls[0][0];
      executeCallback();

      const expectedPayload = {
        method: 'post',
        payload: {
          ...messageWithAttachments,
          token: mockToken,
        },
        muteHttpExceptions: true,
      };

      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(
        `${SLACK_API.BASE_URI}/api/chat.postMessage`,
        expectedPayload
      );
    });

    it('Slack APIがエラーを返した場合、適切なエラーメッセージがスローされること', () => {
      const errorResponse = {
        ok: false,
        error: 'invalid_auth',
      };

      const mockResponse = {
        getContentText: jest
          .fn()
          .mockReturnValue(JSON.stringify(errorResponse)),
      };

      (ApiUtil.executeWithRetry as jest.Mock).mockReturnValue(mockResponse);

      expect(() => {
        PostSlackChatMessageService.call(mockToken, mockMessageArguments);
      }).toThrow('Slack API error: invalid_auth');
    });

    it('リッチメッセージ投稿時にネットワークエラーが発生した場合、エラーがスローされること', () => {
      const messageWithAttachments: ChatPostMessageArguments = {
        ...mockMessageArguments,
        attachments: JSON.stringify(mockAttachments),
      };

      const networkError = new Error('Network timeout');
      (ApiUtil.executeWithRetry as jest.Mock).mockImplementation(() => {
        throw networkError;
      });

      expect(() => {
        PostSlackChatMessageService.call(mockToken, messageWithAttachments);
      }).toThrow(networkError);

      expect(ApiUtil.executeWithRetry).toHaveBeenCalledTimes(1);
    });
  });
});
