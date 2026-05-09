/**
 * ErrorBoundary — catches render-time errors anywhere below it and shows
 * the message + stack on screen instead of leaving a blank page. Wrap the
 * whole app with this so a failed component never silently hides the UI.
 *
 * Class component is required: there is still no hooks-based equivalent
 * for React's error-boundary lifecycle (`getDerivedStateFromError`,
 * `componentDidCatch`).
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  componentStack: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, componentStack: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info);
    this.setState({ componentStack: info.componentStack ?? null });
  }

  render(): ReactNode {
    const { error, componentStack } = this.state;
    const { children } = this.props;

    if (!error) return children;

    return (
      <div className="min-h-screen w-full p-8 bg-background text-text font-mono overflow-auto">
        <div className="max-w-[920px] mx-auto flex flex-col gap-5">
          <div>
            <p className="text-[0.78rem] tracking-[0.2em] uppercase text-danger font-semibold">
              Runtime error
            </p>
            <h1 className="mt-2 font-display text-[1.6rem] text-text break-words">
              {error.name}: {error.message}
            </h1>
          </div>

          {error.stack && (
            <section>
              <h2 className="text-[0.72rem] tracking-[0.18em] uppercase text-text-dim mb-2">
                Stack trace
              </h2>
              <pre className="text-[0.82rem] leading-[1.6] p-4 rounded-md bg-surface-solid border border-border whitespace-pre-wrap break-words text-text-muted">
                {error.stack}
              </pre>
            </section>
          )}

          {componentStack && (
            <section>
              <h2 className="text-[0.72rem] tracking-[0.18em] uppercase text-text-dim mb-2">
                Component stack
              </h2>
              <pre className="text-[0.82rem] leading-[1.6] p-4 rounded-md bg-surface-solid border border-border whitespace-pre-wrap break-words text-text-muted">
                {componentStack.trim()}
              </pre>
            </section>
          )}

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="self-start mt-2 px-5 py-2.5 rounded-pill bg-brand text-white font-semibold text-[0.9rem] shadow-glow-blue hover:shadow-glow-violet transition-shadow"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
