import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Book, PGSubject } from '../types';
import { getSubjectAppearance } from '../utils/subjectIcons';
import { EyeIcon } from './icons/EyeIcon';
import { usePdfViewer } from '../providers/PdfViewerProvider';

interface PGContentProps {
  subjects: PGSubject[];
}

const PGContent: React.FC<PGContentProps> = ({ subjects }) => {
  const { openPreview } = usePdfViewer();

  const handleOpenPreview = useCallback(
    (book: Book) => {
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
      }
    },
    [openPreview]
  );

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {subjects.map((subject) => {
          const { Icon, backgroundColor, iconColor } = getSubjectAppearance(subject.name);
          const book = subject.books[0];
          const hasPreview = Boolean(book?.pdfAsset || book?.imageAssets?.length);

          return (
            <View
              key={subject.name}
              style={styles.row}
              accessibilityLabel={`${subject.name} curriculum details`}
            >
              <View style={styles.rowContent}>
                <View style={[styles.iconWrapper, { backgroundColor }]}>
                  <Icon size={20} color={iconColor} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  {book?.name ? <Text style={styles.bookName}>{book.name}</Text> : null}
                </View>
              </View>

              {hasPreview ? (
                <Pressable
                  onPress={() => handleOpenPreview(book)}
                  style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                  accessibilityRole="link"
                  accessibilityLabel={`View preview for ${subject.name}`}
                >
                  <EyeIcon size={16} color="#ffffff" />
                  <Text style={styles.buttonLabel}>View</Text>
                </Pressable>
              ) : (
                <Text style={styles.previewUnavailable}>Preview unavailable</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    gap: 12,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  bookName: {
    fontSize: 13,
    color: '#475569',
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
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  previewUnavailable: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
});

export default PGContent;
