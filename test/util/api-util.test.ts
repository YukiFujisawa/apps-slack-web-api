import { ApiUtil } from '../../src/app/util/api-util';

describe('ApiUtil', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (Utilities.sleep as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('executeWithRetry', () => {
    describe('正常系', () => {
      it('オペレーションを一度で正常に実行できること', () => {
        const mockOperation = jest.fn().mockReturnValue('success');
        const result = ApiUtil.executeWithRetry(mockOperation);

        expect(result).toBe('success');
        expect(mockOperation).toHaveBeenCalledTimes(1);
        expect(Utilities.sleep).not.toHaveBeenCalled();
      });

      it('一時的なエラー後にリトライして最終的に成功できること', () => {
        const mockOperation = jest
          .fn()
          .mockImplementationOnce(() => {
            throw new Error('Temporary error');
          })
          .mockReturnValue('success');

        const result = ApiUtil.executeWithRetry(mockOperation);

        expect(result).toBe('success');
        expect(mockOperation).toHaveBeenCalledTimes(2);
        expect(Utilities.sleep).toHaveBeenCalledTimes(1);
        expect(Utilities.sleep).toHaveBeenCalledWith(1000);
      });

      it('カスタムの初期バックオフ時間を使用して成功できること', () => {
        const mockOperation = jest
          .fn()
          .mockImplementationOnce(() => {
            throw new Error('First error');
          })
          .mockReturnValue('success');

        const result = ApiUtil.executeWithRetry(mockOperation, 3, 500);

        expect(result).toBe('success');
        expect(mockOperation).toHaveBeenCalledTimes(2);
        expect(Utilities.sleep).toHaveBeenCalledTimes(1);
        expect(Utilities.sleep).toHaveBeenCalledWith(500);
      });
    });

    describe('異常系', () => {
      it('最大リトライ回数を超えた場合、最後のエラーをスローすること', () => {
        const mockOperation = jest.fn().mockImplementation(() => {
          throw new Error('Persistent error');
        });

        expect(() => {
          ApiUtil.executeWithRetry(mockOperation, 2, 1000);
        }).toThrow('Persistent error');

        expect(mockOperation).toHaveBeenCalledTimes(2);
        expect(Utilities.sleep).toHaveBeenCalledTimes(1);
        expect(Utilities.sleep).toHaveBeenCalledWith(1000);
      });

      it('リトライ回数が0の場合、即座にエラーをスローすること', () => {
        const mockOperation = jest.fn();

        expect(() => {
          ApiUtil.executeWithRetry(mockOperation, 0);
        }).toThrow('Max retries exceeded');

        expect(mockOperation).not.toHaveBeenCalled();
        expect(Utilities.sleep).not.toHaveBeenCalled();
      });

      it('エクスポネンシャルバックオフの後も失敗した場合、エラーをスローすること', () => {
        const mockOperation = jest
          .fn()
          .mockImplementationOnce(() => {
            throw new Error('Error 1');
          })
          .mockImplementationOnce(() => {
            throw new Error('Error 2');
          })
          .mockImplementationOnce(() => {
            throw new Error('Final error');
          });

        expect(() => {
          ApiUtil.executeWithRetry(mockOperation, 3, 1000);
        }).toThrow('Final error');

        expect(mockOperation).toHaveBeenCalledTimes(3);
        expect(Utilities.sleep).toHaveBeenCalledTimes(2);
        expect(Utilities.sleep).toHaveBeenNthCalledWith(1, 1000);
        expect(Utilities.sleep).toHaveBeenNthCalledWith(2, 2000);
      });
    });
  });
});
