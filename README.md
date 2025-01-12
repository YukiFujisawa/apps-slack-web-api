# apps-slack-web-api

Slack Web API Client for GAS(Google Apps Script)

TypeScript で書かれた Google Apps Script 用の Slack Web API 用のライブラリ です。

## 特徴 / Features

- シンプルで使いやすい Slack メッセージング機能
- チャンネルへのメッセージ送信
- リッチなメッセージフォーマット（アタッチメント）のサポート
- エラーハンドリングとリトライ機能

## インストール / Installation

### GASエディタでの設定 / GAS Editor Setup

1. Apps Script プロジェクトで、「エディタ」→「ライブラリ」を選択
2. スクリプト ID を入力: `1TygC_BEClAGRFhVkq66ZRjKkXd1lSXKgPwcyM-0ruwUPU9K8_PAMl9FT`
3. 最新バージョンを選択して「追加」

![スクリーンショット 2025-01-12 11 38 39](https://github.com/user-attachments/assets/9e357f00-99d9-4e97-b0cf-d99fe74d6871)

### Claspプロジェクトでの設定 / Clasp Project Setup

1. `appsscript.json` に以下の設定を追加:

```json
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {
    "libraries": [
      {
        "userSymbol": "SlackWebApi",
        "version": "0",
        "libraryId": "1TygC_BEClAGRFhVkq66ZRjKkXd1lSXKgPwcyM-0ruwUPU9K8_PAMl9FT",
        "developmentMode": true
      }
    ]
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

2. TypeScript用の型定義ファイル `types/apps-slack-web-api.d.ts` を自分のプロジェクトの`src/types/apps-slack-web-api.d.ts` などにコピーする

## 基本的な使い方 / Basic Usage

### シンプルなメッセージを送信 / Sending a Simple Message

```javascript
function sendSimpleMessage() {
  const token = 'xoxb-your-token';
  const channelId = '#general';
  const text = 'Hello from Google Apps Script!';
  SlackWebApi.postChatMessage(token, channelId, text);
}
```

### リッチメッセージを送信 / Sending a Rich Message

```typescript
function sendRichMessage() {
  const token = 'xoxb-your-token';
  const channelId = '#general';
  const attachmentData = [
    {
      color: '#36a64f',
      pretext: 'Optional pretext that appears above the attachment',
      author_name: 'Author Name',
      author_link: 'http://example.com',
      title: 'Attachment Title',
      title_link: 'http://example.com',
      text: 'Main attachment text that can include *markdown*',
      fields: [
        {
          title: 'Field Title',
          value: 'Field value and formatting',
          short: true,
        },
      ],
      footer: 'Footer text',
      ts: Date.now() / 1000,
    },
  ];

  SlackWebApi.postChatMessage(
    token,
    channelId,
    'Message with rich formatting',
    {
      attachments: JSON.stringify(attachmentData),
    }
  );
}
```

## 詳細な使用方法 / Advanced Usage

### WebClient の直接使用 / Direct WebClient Usage

```typescript
function useWebClient() {
  const token = 'xoxb-your-token';
  const web = SlackWebApi.createWebClient(token);

  const response = web.chat.postMessage({
    channel: '#general',
    text: 'Hello!',
  });
}
```

## コントリビューション / Contributing

プルリクエストや Issue は大歓迎です。
