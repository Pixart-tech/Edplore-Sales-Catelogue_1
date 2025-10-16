import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import type { PGSubject } from '../types';
import { getSubjectAppearance } from '../utils/subjectIcons';
import { EyeIcon } from './icons/EyeIcon';

interface PGContentProps {
  subjects: PGSubject[];
}

const PGContent: React.FC<PGContentProps> = ({ subjects }) => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {subjects.map((subject) => {
          if (subject.books.length === 0) {
            return null;
          }

          const book = subject.books[0];
          const { Icon, backgroundColor, iconColor } = getSubjectAppearance(subject.name);

          const handleOpen = () => {
            void Linking.openURL(book.pdfUrl);
          };

          return (
            <View key={subject.name} style={styles.row}>
              <View style={styles.rowContent}>
                <View style={[styles.iconWrapper, { backgroundColor }]}>
                  <Icon size={20} color={iconColor} />
                </View>
                <Text style={styles.subjectName}>{subject.name}</Text>
              </View>
              <Pressable
                onPress={handleOpen}
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                accessibilityRole="link"
                accessibilityLabel={`View PDF for ${subject.name}`}
              >
                <EyeIcon size={18} color="#ffffff" />
                <Text style={styles.buttonLabel}>View</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
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
    color: '#1e293b',
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

export default PGContent;
