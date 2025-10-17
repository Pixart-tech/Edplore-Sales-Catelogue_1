import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

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
  };

  return (
    <PdfViewerContext.Provider value={{ openPreview, closePreview }}>
      {children}

      <Modal visible={visible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{previewData?.title}</Text>
            <TouchableOpacity onPress={closePreview}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable content */}
          {previewData && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {previewData.imageAssets.map((imgSrc, index) => (
                <View key={index} style={styles.page}>
                  <Image
                    source={imgSrc} // ✅ Direct static require()
                    style={styles.image}
                    resizeMode="contain" // ✅ Ensures full image fits in screen
                  />
                  <Text style={styles.pageNumber}>Page {index + 1}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </PdfViewerContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000', // dark background for PDF-like look
    paddingTop: 60,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
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
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 80,
    alignItems: 'center',
  },
  page: {
    width: width,
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
