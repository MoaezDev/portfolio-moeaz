/**
 * useWeb3FormsSubmit — submit a payload to the Web3Forms API and track
 * the submission lifecycle (idle → submitting → success | error).
 *
 * The hook owns the network call and the resulting status/feedback so
 * any consumer just calls `submit(payload)` and renders from `status`.
 * `setError` lets the consumer push a client-side validation error
 * through the same channel as server errors, keeping UI consistent.
 */
import { useCallback, useState } from 'react';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const DEFAULT_SUCCESS_MESSAGE = "Thanks — your message is on its way.";
const MISSING_KEY_MESSAGE = 'Form is not configured — access key is missing.';
const FALLBACK_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface SubmitResult {
  ok: boolean;
  message: string;
}

interface UseWeb3FormsSubmitOptions {
  successMessage?: string;
}

interface UseWeb3FormsSubmitResult {
  submit: (payload: Record<string, string>) => Promise<SubmitResult>;
  setError: (message: string) => void;
  reset: () => void;
  status: SubmitStatus;
  feedback: string;
}

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

export const useWeb3FormsSubmit = (
  accessKey: string | undefined,
  options: UseWeb3FormsSubmitOptions = {},
): UseWeb3FormsSubmitResult => {
  const successMessage = options.successMessage ?? DEFAULT_SUCCESS_MESSAGE;
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [feedback, setFeedback] = useState<string>('');

  const setError = useCallback((message: string): void => {
    setStatus('error');
    setFeedback(message);
  }, []);

  const reset = useCallback((): void => {
    setStatus('idle');
    setFeedback('');
  }, []);

  const submit = useCallback(
    async (payload: Record<string, string>): Promise<SubmitResult> => {
      if (!accessKey) {
        setError(MISSING_KEY_MESSAGE);
        return { ok: false, message: MISSING_KEY_MESSAGE };
      }

      setStatus('submitting');
      setFeedback('');

      try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            botcheck: '',
            ...payload,
          }),
        });

        const data = (await response.json()) as Web3FormsResponse;

        if (response.ok && data.success) {
          setStatus('success');
          setFeedback(successMessage);
          return { ok: true, message: successMessage };
        }

        const message = data.message ?? FALLBACK_ERROR_MESSAGE;
        setError(message);
        return { ok: false, message };
      } catch (error) {
        const message =
          error instanceof Error
            ? `Network error: ${error.message}`
            : 'Network error — please try again.';
        setError(message);
        return { ok: false, message };
      }
    },
    [accessKey, successMessage, setError],
  );

  return { submit, setError, reset, status, feedback };
};
