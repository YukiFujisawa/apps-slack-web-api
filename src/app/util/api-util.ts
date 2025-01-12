/**
 * Utility class providing common API operation functionality including retry logic
 * and exponential backoff handling for robust API interactions.
 */
export class ApiUtil {
  /**
   * Executes an API operation with exponential backoff retry logic.
   * Automatically handles temporary failures and network issues by retrying
   * the operation with increasing delays between attempts.
   *
   * @param operation - The API operation to execute
   * @param maxRetries - Maximum number of retry attempts (defaults to 3)
   * @param initialBackoffMs - Initial backoff delay in milliseconds (defaults to 1000)
   * @returns The result of the successful operation
   * @throws {Error} If all retry attempts fail
   * @example
   * const result = await ApiUtility.executeWithRetry(() =>
   *   UrlFetchApp.fetch('https://api.example.com/data', options)
   * );
   */
  static executeWithRetry<T>(
    operation: () => T,
    maxRetries: number = 3,
    initialBackoffMs: number = 1000
  ): T {
    if (maxRetries <= 0) {
      throw new Error('Max retries exceeded');
    }

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return operation();
      } catch (error) {
        const isLastAttempt = attempt === maxRetries - 1;
        if (isLastAttempt) {
          throw error;
        }

        const backoffMs = initialBackoffMs * Math.pow(2, attempt);
        Utilities.sleep(backoffMs);
      }
    }
    throw new Error('Max retries exceeded');
  }
}
