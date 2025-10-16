import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PDFView from 'react-native-pdf-view';
import type { PdfDocument } from '../utils/pdf';

interface PdfViewerModalProps {
  visible: boolean;
  document: PdfDocument | null;
  title?: string;
  isLoading: boolean;
  errorMessage: string | null;
  onClose: () => void;
}

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  visible,
  document,
  title,
  isLoading,
  errorMessage,
  onClose,
}) => {
  const hasDocument = Boolean(document?.path);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {title || 'PDF Preview'}
          </Text>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
            accessibilityRole="button"
            accessibilityLabel="Close PDF viewer"
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#4338ca" />
          ) : errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : hasDocument ? (
            <PDFView
              style={styles.pdf}
              path={document!.path}
              onLoadComplete={(pageCount: number) => {
                console.log(`PDF loaded with ${pageCount} pages.`);
              }}
            />
          ) : (
            <Text style={styles.placeholderText}>Select a PDF to preview.</Text>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#111827',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    marginRight: 12,
  },
  closeButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: '#4338ca',
  },
  closeButtonPressed: {
    opacity: 0.85,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 12,
  },
  pdf: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
  },
  errorText: {
    color: '#f87171',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  placeholderText: {
    color: '#cbd5f5',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default PdfViewerModal;
