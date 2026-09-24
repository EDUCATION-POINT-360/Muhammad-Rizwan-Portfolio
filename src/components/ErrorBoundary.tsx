import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Applet uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0C0C0F] text-[#F4F4F6] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-serif text-xl font-bold mb-4">
            MR
          </div>
          <h1 className="text-2xl font-serif font-bold mb-2">Muhammad Rizwan — Portfolio</h1>
          <p className="text-sm font-mono text-[#A6A6B4] max-w-md mb-4">
            An unexpected error occurred while loading interactive visuals. Please reload to restore all features.
          </p>
          {this.state.error?.message && (
            <p className="text-xs font-mono text-amber-400/80 bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/20 max-w-lg truncate mb-6">
              {this.state.error.message}
            </p>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-mono text-xs font-bold transition-all"
            >
              Reload Page
            </button>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch {
                  // ignore
                }
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-full border border-[#353548] text-[#D0D0DA] hover:bg-[#1D1D28] font-mono text-xs font-medium transition-all"
            >
              Clear Cache & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
