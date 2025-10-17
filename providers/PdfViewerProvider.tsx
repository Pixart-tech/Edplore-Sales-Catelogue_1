import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type PreviewImageSource = number;

interface PreviewData {
  title: string;
  imageAssets: PreviewImageSource[];
}

interface PdfViewerContextProps {
  openPreview: (data: PreviewData) => void;
  closePreview: () => void;
}

const PdfViewerContext = createContext<PdfViewerContextProps>({
  openPreview: () => {},
  closePreview: () => {},
});

export const usePdfViewer = () => useContext(PdfViewerContext);

export const PdfViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const openPreview = (data: PreviewData) => {
    console.log('🟢 OPEN PREVIEW CALLED');
    console.log('📊 Title:', data.title);
    console.log('📊 Image Assets Count:', data.imageAssets.length);
    setPreviewData(data);
    setVisible(true);
  };

  const closePreview = () => {
    setVisible(false);
    setPreviewData(null);
    setPageIndex(0);
  };

  const renderItem = ({ item }: { item: number }) => (
    <View style={styles.page}>
      <Image
        source={item} // ✅ Direct static asset require()
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <PdfViewerContext.Provider value={{ openPreview, closePreview }}>
      {children}

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{previewData?.title}</Text>
            <TouchableOpacity onPress={closePreview}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {previewData && (
            <FlatList
              data={previewData.imageAssets}
              keyExtractor={(_, i) => i.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
                setPageIndex(newIndex);
              }}
              renderItem={renderItem}
            />
          )}

          {previewData && (
            <Text style={styles.pageIndicator}>
              Page {pageIndex + 1} / {previewData.imageAssets.length}
            </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    color: '#fff',
    fontSize: 22,
  },
  page: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height,
    resizeMode: 'contain',
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14,
  },
});
