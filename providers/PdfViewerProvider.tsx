import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';
import { readAsStringAsync } from 'expo-file-system';

import { preparePdfViewerAssets } from '../utils/pdfViewerAssets';

type PreviewImageSource = number;

interface PreviewData {
  title: string;
  imageAssets?: readonly PreviewImageSource[];
  pdfAsset?: number;
}

interface PdfViewerContextProps {
  openPreview: (data: PreviewData) => void;
  closePreview: () => void;
}

const PdfViewerContext = createContext<PdfViewerContextProps>({
  openPreview: () => {},
  closePreview: () => {},
});

const { width } = Dimensions.get('window');

export const usePdfViewer = () => useContext(PdfViewerContext);

export const PdfViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [viewerConfig, setViewerConfig] = useState<{ uri: string; pdfDataUrl: string } | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const openPreview = (data: PreviewData) => {
    setPreviewData(data);
    setVisible(true);
  };

  const closePreview = () => {
    setVisible(false);
    setPreviewData(null);
    setViewerConfig(null);
    setPdfError(null);
    setIsLoadingPdf(false);
  };

  useEffect(() => {
    let isActive = true;

    const loadPdfAsync = async () => {
      if (!previewData?.pdfAsset) {
        setViewerConfig(null);
        setPdfError(null);
        setIsLoadingPdf(false);
        return;
      }

      setIsLoadingPdf(true);
      setPdfError(null);
      setViewerConfig(null);

      try {
        const htmlPath = await preparePdfViewerAssets();

        const pdfAsset = Asset.fromModule(previewData.pdfAsset);
        await pdfAsset.downloadAsync();
        const pdfSource = pdfAsset.localUri ?? pdfAsset.uri;
        if (!pdfSource) throw new Error('PDF asset unavailable');

        const pdfBase64 = await readAsStringAsync(pdfSource, { encoding: 'base64' });
        const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;

        if (isActive) setViewerConfig({ uri: htmlPath, pdfDataUrl });
      } catch (error) {
        console.error('Failed to load PDF preview', error);
        if (isActive) {
          setPdfError('Unable to load preview');
          setViewerConfig(null);
        }
      } finally {
        if (isActive) setIsLoadingPdf(false);
      }
    };

    loadPdfAsync();
    return () => {
      isActive = false;
    };
  }, [previewData?.pdfAsset]);

  const hasImages = useMemo(
    () => Boolean(previewData?.imageAssets && previewData.imageAssets.length > 0),
    [previewData?.imageAssets]
  );

  const injectedPdfScript = useMemo(() => {
    if (!viewerConfig) return undefined;
    const payload = JSON.stringify(viewerConfig.pdfDataUrl);
    return `window.__PDF_DATA__ = ${payload}; true;`;
  }, [viewerConfig]);

  return (
    <PdfViewerContext.Provider value={{ openPreview, closePreview }}>
      {children}

      <Modal visible={visible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{previewData?.title ?? ''}</Text>
            <TouchableOpacity onPress={closePreview} accessibilityRole="button">
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          {previewData?.pdfAsset ? (
            <View style={styles.pdfWrapper}>
              {isLoadingPdf ? (
                <ActivityIndicator color="#ffffff" size="large" style={styles.loader} />
              ) : viewerConfig ? (
                <WebView
                  originWhitelist={['*']}
                  style={styles.webView}
                  source={{ uri: viewerConfig.uri }}
                  injectedJavaScriptBeforeContentLoaded={injectedPdfScript}
                  key={previewData?.pdfAsset ?? 'pdf-viewer'}
                  allowFileAccess
                  allowFileAccessFromFileURLs
                  allowUniversalAccessFromFileURLs
                  mixedContentMode="always"
                  javaScriptEnabled
                  domStorageEnabled
                  onMessage={({ nativeEvent }) => {
                    try {
                      const payload = JSON.parse(nativeEvent.data);
                      if (payload?.type === 'error') {
                        setPdfError('Unable to load preview');
                        setViewerConfig(null);
                      }
                      console.log('[PDF viewer]', payload);
                    } catch (parseError) {
                      console.log('[PDF viewer]', nativeEvent.data);
                    }
                  }}
                  onError={({ nativeEvent }) => {
                    console.error('WebView error while loading PDF', nativeEvent);
                    setPdfError('Unable to load preview');
                    setViewerConfig(null);
                  }}
                  onHttpError={({ nativeEvent }) => {
                    console.error('WebView HTTP error while loading PDF', nativeEvent);
                    setPdfError('Unable to load preview');
                    setViewerConfig(null);
                  }}
                />
              ) : (
                <View style={styles.pdfError}>
                  <Text style={styles.pdfErrorText}>{pdfError ?? 'Preview unavailable'}</Text>
                </View>
              )}
            </View>
          ) : hasImages ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {previewData?.imageAssets?.map((imgSrc, index) => (
                <View key={index} style={styles.page}>
                  <Image source={imgSrc} style={styles.image} resizeMode="contain" />
                  <Text style={styles.pageNumber}>Page {index + 1}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.pdfError}>
              <Text style={styles.pdfErrorText}>Preview unavailable</Text>
            </View>
          )}
        </View>
      </Modal>
    </PdfViewerContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    color: '#fff',
    fontSize: 26,
    lineHeight: 26,
  },
  pdfWrapper: {
    flex: 1,
    marginTop: 12,
  },
  webView: {
    flex: 1,
    backgroundColor: '#000',
  },
  loader: {
    marginTop: 40,
  },
  pdfError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  pdfErrorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 80,
    alignItems: 'center',
  },
  page: {
    width,
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 0,
    paddingVertical: 0,
    marginBottom: -2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 0.707,
    resizeMode: 'contain',
    marginBottom: -2,
  },

  pageNumber: {
    color: '#bbb',
    fontSize: 12,
    marginTop: 8,
  },
});

export default PdfViewerProvider;
