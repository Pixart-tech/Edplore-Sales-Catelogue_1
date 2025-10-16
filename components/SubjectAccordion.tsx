import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { StandardSubject, Book } from '../types';
import { CoreIcon } from './icons/CoreIcon';
import { VariationIcon } from './icons/VariationIcon';
import { AddOnIcon } from './icons/AddOnIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import BookItem from './BookItem';
import { getSubjectAppearance } from '../utils/subjectIcons';

interface SubjectAccordionProps {
  subject: StandardSubject;
  isOpen: boolean;
  onToggle: () => void;
}

interface DetailListProps {
  title: string;
  items: Book[];
  icon: React.ReactNode;
}

const DetailList: React.FC<DetailListProps> = ({ title, items, icon }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.detailSection}>
      <View style={styles.detailHeader}>
        {icon}
        <Text style={styles.detailTitle}>{title}</Text>
      </View>
      <View style={styles.detailContent}>
        {items.map((book, index) => (
          <BookItem key={`${title}-${book.name}-${index}`} book={book} />
        ))}
      </View>
    </View>
  );
};

const SubjectAccordion: React.FC<SubjectAccordionProps> = ({ subject, isOpen, onToggle }) => {
  const { Icon, backgroundColor, iconColor } = getSubjectAppearance(subject.name);

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [styles.header, pressed && styles.headerPressed]}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <View style={styles.headerContent}>
          <View style={[styles.iconWrapper, { backgroundColor }]}>
            <Icon size={20} color={iconColor} />
          </View>
          <Text style={styles.subjectName}>{subject.name}</Text>
        </View>
        <ChevronDownIcon
          size={20}
          color="#64748b"
          style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
        />
      </Pressable>
      {isOpen ? (
        <View style={styles.content}>
          <View style={styles.detailGrid}>
            <DetailList
              title="Core"
              items={subject.core}
              icon={<CoreIcon size={18} color="#0284c7" />}
            />
            <DetailList
              title="Variations"
              items={subject.variations}
              icon={<VariationIcon size={18} color="#d97706" />}
            />
            <DetailList
              title="Add ons"
              items={subject.addOns}
              icon={<AddOnIcon size={18} color="#059669" />}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerPressed: {
    backgroundColor: '#f8fafc',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  content: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailGrid: {
    marginTop: 12,
    gap: 16,
  },
  detailSection: {
    gap: 12,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  detailContent: {
    gap: 10,
  },
});

export default SubjectAccordion;
