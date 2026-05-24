import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary that catches unhandled errors in the React tree
 * below it. Prevents a single component crash from taking down
 * the entire desktop experience.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      `ErrorBoundary caught: ${error.message}`,
      errorInfo.componentStack?.split('\n')[0]?.trim()
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            padding: '2rem',
            background: 'rgba(20, 20, 36, 0.97)',
            color: 'rgba(220, 230, 240, 0.92)',
            fontFamily: "'Noto Sans', 'Cantarell', sans-serif",
            fontSize: '12px',
            textAlign: 'center',
          }}
        >
          <div
            style={{ fontSize: '16px', marginBottom: '8px', color: '#e84040' }}
          >
            Something went wrong
          </div>
          <div style={{ marginBottom: '16px', opacity: 0.7 }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              background: 'rgba(54, 123, 240, 0.25)',
              border: '1px solid rgba(54, 123, 240, 0.5)',
              color: 'rgba(220, 230, 240, 0.92)',
              padding: '6px 14px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '11px',
              borderRadius: '2px',
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
