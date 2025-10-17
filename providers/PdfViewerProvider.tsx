import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { ImageURISource, ViewToken } from 'react-native';
import type { PreviewImageSource } from '../types';

type PreviewOpenParams = {
  imageAssets: readonly PreviewImageSource[];
  title?: string;
};

type PdfViewerContextValue = {
  openPreview: (params: PreviewOpenParams) => void;
  closePreview: () => void;
};

const PdfViewerContext = createContext<PdfViewerContextValue | undefined>(undefined);

type NormalizedImageSource = number | ImageURISource;

interface PreviewState {
  visible: boolean;
  title: string;
  imageAssets: NormalizedImageSource[];
}

const initialState: PreviewState = {
  visible: false,
  title: '',
  imageAssets: [],
};

const normalizeImageSource = (
  source: PreviewImageSource,
): NormalizedImageSource[] => {
  if (!source) {
    return [];
  }

  if (Array.isArray(source)) {
    return source.flatMap((item) => normalizeImageSource(item));
  }

  if (typeof source === 'number') {
    return [source];
  }

  if (typeof source === 'string') {
    return source ? [{ uri: source }] : [];
  }

  if (typeof source === 'object') {
    if ('uri' in source && source.uri) {
      return [source as ImageURISource];
    }

    if ('default' in (source as Record<string, unknown>)) {
      const defaultSource = (source as { default: PreviewImageSource }).default;
      return defaultSource ? normalizeImageSource(defaultSource) : [];
    }
  }

  return [];
};

export const PdfViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PreviewState>(initialState);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const closePreview = useCallback(() => {
    console.log('🔴 CLOSE: Closing preview');
    setState(initialState);
    setCurrentImageIndex(0);
  }, []);

  const openPreview = useCallback(({ imageAssets, title }: PreviewOpenParams) => {
    console.log('🟢 OPEN PREVIEW CALLED');
    console.log('📊 Title:', title);
    console.log('📊 Image Assets Count:', imageAssets?.length);

    if (!imageAssets || imageAssets.length === 0) {
      console.warn('⚠️ openPreview called without any image assets.');
      return;
    }

    const normalizedImages = imageAssets.flatMap((asset) => normalizeImageSource(asset));
    console.log('📦 Normalized Images Count:', normalizedImages.length);

    if (!normalizedImages.length) {
      console.warn('⚠️ No valid image assets available for preview.');
      return;
    }

    setState({
      visible: true,
      title: title ?? 'Preview',
      imageAssets: normalizedImages,
    });
    setCurrentImageIndex(0);

    console.log('✅ Preview state updated successfully');
  }, []);

  const contextValue = useMemo(
    () => ({ openPreview, closePreview }),
    [openPreview, closePreview],
  );

  const viewabilityConfig = useMemo(
    () => ({ viewAreaCoveragePercentThreshold: 80 }),
    [],
  );

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (!viewableItems || viewableItems.length === 0) {
        return;
      }
      const nextIndex = viewableItems[0]?.index;
      if (typeof nextIndex === 'number') {
        console.log('📄 Page changed to:', nextIndex + 1);
        setCurrentImageIndex(nextIndex);
      }
    },
    [],
  );

  const sliderWidth = Math.max(screenWidth - 32, 280);
  const sliderHeight = Math.max(screenHeight - 260, 240);

  const renderContent = () => {
    if (!sliderWidth || !sliderHeight) {
      return null;
    }

    if (!state.imageAssets.length) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Preview is not available.</Text>
        </View>
      );
    }

    return (
      <View style={styles.imageSliderContainer}>
        <View style={[styles.imageListWrapper, { width: sliderWidth }]}>
          <FlatList
            data={state.imageAssets}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={[styles.imageSlide, { width: sliderWidth }]}>
                <Image
                  source={item}
                  style={[styles.image, { width: sliderWidth - 32, height: sliderHeight }]}
                  resizeMode="contain"
                  onLoadStart={() => console.log(`📥 Image ${index + 1} loading...`)}
                  onLoad={() => console.log(`✅ Image ${index + 1} loaded!`)}
                  onError={(error) => console.error(`❌ Image ${index + 1} failed:`, error.nativeEvent)}
                />
              </View>
            )}
            style={styles.imageList}
            contentContainerStyle={styles.imageListContent}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            scrollEnabled={true}
          />
        </View>
        <View style={styles.pagination}>
          <Text style={styles.paginationText}>
            Page {currentImageIndex + 1} of {state.imageAssets.length}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <PdfViewerContext.Provider value={contextValue}>
      {children}
      <Modal
        visible={state.visible}
        animationType="slide"
        transparent={Platform.OS === 'ios'}
        onRequestClose={closePreview}
        presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'fullScreen'}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{state.title}</Text>
              <Pressable
                onPress={closePreview}
                accessibilityRole="button"
                accessibilityLabel="Close preview"
                style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
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
  overlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.65)', justifyContent: 'center', padding: 16 },
  modalContent: { flex: 1, backgroundColor: '#ffffff', borderRadius: 20, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#f1f5f9', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e2e8f0' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', flex: 1, paddingRight: 16 },
  closeButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 9999, backgroundColor: '#4338ca' },
  closeButtonPressed: { opacity: 0.85 },
  closeButtonLabel: { color: '#ffffff', fontSize: 13, fontWeight: '600', textTransform: 'uppercase' },
  modalBody: { flex: 1, backgroundColor: '#111827', paddingVertical: 12, alignItems: 'center' },
  imageSliderContainer: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', gap: 16 },
  imageList: { flexGrow: 0, flex: 1 },
  imageListContent: { alignItems: 'stretch' },
  imageListWrapper: { flex: 1 },
  imageSlide: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  image: { borderRadius: 12, backgroundColor: '#1f2937' },
  pagination: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 9999, backgroundColor: 'rgba(15, 23, 42, 0.75)' },
  paginationText: { color: '#e2e8f0', fontSize: 13, fontWeight: '600' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  emptyText: { textAlign: 'center', color: '#94a3b8', fontSize: 15, fontWeight: '600' },
});