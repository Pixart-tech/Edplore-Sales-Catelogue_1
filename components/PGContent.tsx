import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { PGSubject } from '../types';
import { getSubjectAppearance } from '../utils/subjectIcons';
import PGPdfSlider from './PGPdfSlider';

interface PGContentProps {
  subjects: PGSubject[];
}

const PGContent: React.FC<PGContentProps> = ({ subjects }) => {
  const previewableSubjects = useMemo(
    () => subjects.filter((subject) => subject.books.length > 0 && subject.books[0]?.pdfAsset),
    [subjects],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSubject = previewableSubjects[activeIndex];

  return (
    <View style={styles.container}>
      <View style={styles.sliderSection}>
        <Text style={styles.sliderTitle}>Playgroup curriculum preview</Text>
        <PGPdfSlider subjects={previewableSubjects} onIndexChange={setActiveIndex} />
      </View>

      <View style={styles.list}>
        {subjects.map((subject) => {
          const { Icon, backgroundColor, iconColor } = getSubjectAppearance(subject.name);
          const book = subject.books[0];
          const isActive = activeSubject?.name === subject.name;

          return (
            <View
              key={subject.name}
              style={[styles.row, isActive && styles.rowActive]}
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
              {book?.pdfUrl ? (
                <Text style={styles.pdfHint}>Swipe to view PDF</Text>
              ) : (
                <Text style={styles.pdfUnavailable}>PDF unavailable</Text>
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
  sliderSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
    gap: 12,
  },
  sliderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
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
  rowActive: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
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
  rowText: {
    gap: 2,
    flex: 1,
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
  pdfHint: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4338ca',
    textTransform: 'uppercase',
  },
  pdfUnavailable: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
});

export default PGContent;
