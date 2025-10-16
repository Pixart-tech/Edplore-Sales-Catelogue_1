import type React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      iframe: React.DetailedHTMLProps<
        React.IframeHTMLAttributes<HTMLIFrameElement>,
        HTMLIFrameElement
      >;
    }
  }
}

export {};
