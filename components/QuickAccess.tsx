import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { QuickAccessItem, QuickAccessSection } from '../types';
import { usePdfViewer } from '../providers/PdfViewerProvider';
import { EyeIcon } from './icons/EyeIcon';

interface QuickAccessTabsProps {
  sections: QuickAccessSection[];
  activeTitle: string | null;
  onChange: (title: string) => void;
}

const QuickAccessTabs: React.FC<QuickAccessTabsProps> = ({ sections, activeTitle, onChange }) => {
  if (!sections.length) {
    return null;
  }

  const titles = sections.map((section) => section.title);

  return (
    <View style={styles.tabsWrapper}>
      {titles.map((title) => {
        const isActive = activeTitle === title;
        return (
          <Pressable
            key={title}
            onPress={() => onChange(title)}
            style={({ pressed }) => [
              styles.tab,
              isActive && styles.activeTab,
              pressed && !isActive && styles.tabPressed,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.tabLabel, isActive ? styles.activeLabel : styles.inactiveLabel]}>
              {title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

interface QuickAccessSectionContentProps {
  section?: QuickAccessSection;
}

export const QuickAccessSectionContent: React.FC<QuickAccessSectionContentProps> = ({ section }) => {
  const { openPreview } = usePdfViewer();

  if (!section || section.items.length === 0) {
    return null;
  }

  const handlePress = (item: QuickAccessItem) => {
    if (item.pdfAsset) {
      openPreview({ pdfAsset: item.pdfAsset, title: item.previewTitle });
      return;
    }

    if (item.imageAssets?.length) {
      openPreview({ imageAssets: item.imageAssets, title: item.previewTitle });
      return;
    }

    openPreview({ title: item.previewTitle });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{section.title}</Text>
      <View style={styles.cardBody}>
        {section.items.map((item, index) => {
          const key = `${section.title}-${item.title ?? 'action'}-${index}`;
          const buttonLabel = item.buttonLabel ?? 'View';
          const hasTitle = Boolean(item.title);

          return (
            <View key={key} style={[styles.row, !hasTitle && styles.rowSingleButton]}>
              {hasTitle ? <Text style={styles.rowTitle}>{item.title}</Text> : null}
              <Pressable
                onPress={() => handlePress(item)}
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                accessibilityRole="button"
                accessibilityLabel={`${buttonLabel} ${item.previewTitle}`}
              >
                <EyeIcon size={14} color="#ffffff" />
                <Text style={styles.buttonLabel}>{buttonLabel}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    padding: 4,
    gap: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabPressed: {
    opacity: 0.85,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeLabel: {
    color: '#4338ca',
  },
  inactiveLabel: {
    color: '#475569',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  cardBody: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowSingleButton: {
    justifyContent: 'center',
  },
  rowTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 9999,
    backgroundColor: '#4338ca',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default QuickAccessTabs;
