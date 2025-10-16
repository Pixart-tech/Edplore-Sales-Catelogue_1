import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { createPdfViewerSource, PdfViewerSource } from '../utils/pdf';
import { Asset } from 'expo-asset';


type PdfOpenParams = {
  pdfUrl?: string | number;
  pdfAsset?: number;
  title?: string;
};

type PdfViewerContextValue = {
  openPdf: (params: PdfOpenParams) => Promise<void>;
  closePdf: () => void;
};

const PdfViewerContext = createContext<PdfViewerContextValue | undefined>(
  undefined
);

interface PdfViewerState {
  visible: boolean;
  title: string;
  loading: boolean;
  error: string | null;
  source: PdfViewerSource | null;
}

const initialState: PdfViewerState = {
  visible: false,
  title: '',
  loading: false,
  error: null,
  source: null,
};

export const PdfViewerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<PdfViewerState>(initialState);

  const closePdf = useCallback(() => {
    setState(initialState);
  }, []);

  const openPdf = useCallback(
    async ({ pdfUrl, pdfAsset, title }: PdfOpenParams) => {
      setState({
        visible: true,
        title: title ?? 'Preview',
        loading: true,
        error: null,
        source: null,
      });

      try {
        const source = await createPdfViewerSource(pdfUrl, pdfAsset);

        if (!source) {
          setState({
            visible: true,
            title: title ?? 'Preview',
            loading: false,
            error: 'PDF is not available for preview.',
            source: null,
          });
          return;
        }

        setState({
          visible: true,
          title: title ?? 'Preview',
          loading: false,
          error: null,
          source,
        });
      } catch (error) {
        console.error('Failed to open PDF inline', error);
        setState({
          visible: true,
          title: title ?? 'Preview',
          loading: false,
          error: 'Unable to load PDF. Please try again later.',
          source: null,
        });
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({ openPdf, closePdf }),
    [openPdf, closePdf]
  );

  const renderContent = () => {
    if (state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4338ca" />
          <Text style={styles.loadingText}>Loading PDF...</Text>
        </View>
      );
    }

    if (state.error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{state.error}</Text>
        </View>
      );
    }

    if (!state.source) return null;

    if (state.source.type === 'html') {
      return (
        <WebView
          originWhitelist={['*']}
          source={{ html: state.source.html }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4338ca" />
              <Text style={styles.loadingText}>Rendering PDF...</Text>
            </View>
          )}
        />
      );
    }

    // For URI type (remote URLs or data URIs)
    return (
      <WebView
        originWhitelist={['*']}
        source={{ uri: state.source.uri }}
        style={styles.webView}
        startInLoadingState
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4338ca" />
            <Text style={styles.loadingText}>Loading PDF...</Text>
          </View>
        )}
      />
    );
  };

  return (
    <PdfViewerContext.Provider value={contextValue}>
      {children}
      <Modal
        visible={state.visible}
        animationType="slide"
        transparent={Platform.OS === 'ios'}
        onRequestClose={closePdf}
        presentationStyle={
          Platform.OS === 'ios' ? 'pageSheet' : 'fullScreen'
        }
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{state.title}</Text>
              <Pressable
                onPress={closePdf}
                accessibilityRole="button"
                accessibilityLabel="Close PDF preview"
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.closeButtonPressed,
                ]}
              >
                <Text style={styles.closeButtonLabel}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.modalBody}>{renderContent()}</View>
          </View>
        </View>
      </Modal>
    </PdfViewerContext.Provider>
  );
};

export const usePdfViewer = () => {
  const context = useContext(PdfViewerContext);
  if (!context) {
    throw new Error('usePdfViewer must be used within a PdfViewerProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#f1f5f9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
    paddingRight: 16,
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: '#4338ca',
  },
  closeButtonPressed: {
    opacity: 0.85,
  },
  closeButtonLabel: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  modalBody: {
    flex: 1,
    backgroundColor: '#111827',
  },
  webView: {
    flex: 1,
    backgroundColor: '#111827',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#111827',
  },
  loadingText: {
    color: '#e2e8f0',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#111827',
  },
  errorText: {
    textAlign: 'center',
    color: '#f87171',
    fontSize: 15,
    fontWeight: '600',
  },
});