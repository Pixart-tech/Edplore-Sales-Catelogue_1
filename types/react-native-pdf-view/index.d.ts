declare module 'react-native-pdf-view' {
  import type { Component } from 'react';
  import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

  interface PDFViewProps extends ViewProps {
    path?: string;
    src?: string;
    asset?: string;
    pageNumber?: number;
    zoom?: number;
    style?: StyleProp<ViewStyle>;
    onLoadComplete?: (pageCount: number) => void;
  }

  export default class PDFView extends Component<PDFViewProps> {}
}
