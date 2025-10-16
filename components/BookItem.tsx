import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Book } from '../types';
import { EyeIcon } from './icons/EyeIcon';
import { usePdfViewer } from '../providers/PdfViewerProvider';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const { openPdf } = usePdfViewer();

  const handleOpen = useCallback(() => {
    openPdf({ pdfUrl: book.pdfUrl, pdfAsset: book.pdfAsset, title: book.name });
  }, [book.pdfUrl, book.pdfAsset, book.name, openPdf]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.name}</Text>
      <Pressable
        onPress={handleOpen}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityRole="link"
        accessibilityLabel={`View PDF for ${book.name}`}
      >
        <EyeIcon size={18} color="#ffffff" />
        <Text style={styles.buttonLabel}>View</Text>
      </Pressable>
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
});

export default BookItem;
