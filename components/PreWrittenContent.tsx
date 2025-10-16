import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Book, PreWrittenClass } from '../types';
import { getSubjectAppearance } from '../utils/subjectIcons';
import { EyeIcon } from './icons/EyeIcon';
import { usePdfViewer } from './PdfViewerProvider';

interface PreWrittenContentProps {
  data: PreWrittenClass[];
}

const PreWrittenContent: React.FC<PreWrittenContentProps> = ({ data }) => {
  const { openPdf } = usePdfViewer();

  return (
    <View style={styles.container}>
      {data.map((classData) => (
        <View key={classData.className} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{classData.className}</Text>
          </View>
          <View style={styles.cardBody}>
            {classData.subjects.map((subject) => {
              if (subject.books.length === 0) {
                return null;
              }

              const book = subject.books[0];
              const { Icon, backgroundColor, iconColor } = getSubjectAppearance(subject.subjectName);

              const handleOpen = () => {
                const potentialAsset =
                  typeof (book as Partial<Book>).pdfAsset === 'number'
                    ? (book as Partial<Book>).pdfAsset
                    : undefined;

                openPdf(book.pdfUrl, potentialAsset, {
                  title: `${subject.subjectName} • ${classData.className}`,
                });
              };

              return (
                <View key={subject.subjectName} style={styles.row}>
                  <View style={styles.rowContent}>
                    <View style={[styles.iconWrapper, { backgroundColor }]}>
                      <Icon size={20} color={iconColor} />
                    </View>
                    <Text style={styles.subjectName}>{subject.subjectName}</Text>
                  </View>
                  <Pressable
                    onPress={handleOpen}
                    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                    accessibilityRole="link"
                    accessibilityLabel={`View PDF for ${subject.subjectName}`}
                  >
                    <EyeIcon size={18} color="#ffffff" />
                    <Text style={styles.buttonLabel}>View</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4c1d95',
  },
  cardBody: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
    gap: 12,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  subjectName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
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

export default PreWrittenContent;
