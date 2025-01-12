global.UrlFetchApp = {
  fetch: jest.fn(),
} as unknown as typeof UrlFetchApp;

global.Utilities = {
  sleep: jest.fn(),
  formatDate: jest.fn(),
  getUuid: jest.fn(),
} as unknown as typeof Utilities;
