import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Book } from '../types';
import { EyeIcon } from './icons/EyeIcon';
import { usePdfViewer } from '../providers/PdfViewerProvider';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const { openPreview } = usePdfViewer();
  const hasPreview = Boolean(book.pdfAsset || (book.imageAssets && book.imageAssets.length > 0));

  const handleOpen = useCallback(() => {
    if (book.pdfAsset) {
      openPreview({
        pdfAsset: book.pdfAsset,
        title: book.name,
      });
      return;
    }

    if (book.imageAssets && book.imageAssets.length > 0) {
      openPreview({
        imageAssets: book.imageAssets,
        title: book.name,
      });
      return;
    }

    openPreview({
      title: book.name,
    });
  }, [book.imageAssets, book.name, book.pdfAsset, openPreview]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.name}</Text>
      {hasPreview ? (
        <Pressable
          onPress={handleOpen}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          accessibilityRole="link"
          accessibilityLabel={`View preview for ${book.name}`}
        >
          <EyeIcon size={18} color="#ffffff" />
          <Text style={styles.buttonLabel}>View</Text>
        </Pressable>
      ) : (
        <Text style={styles.previewUnavailable}>Preview unavailable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    paddingRight: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
    backgroundColor: '#4338ca',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  previewUnavailable: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default BookItem;
