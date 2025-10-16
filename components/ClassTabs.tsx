import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ClassName } from '../types';

interface ClassTabsProps {
  classes: ClassName[];
  activeClass: ClassName;
  setActiveClass: (className: ClassName) => void;
}

const ClassTabs: React.FC<ClassTabsProps> = ({ classes, activeClass, setActiveClass }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollView}
    >
      <View style={styles.container}>
        {classes.map((className) => {
          const isActive = activeClass === className;
          return (
            <Pressable
              key={className}
              onPress={() => setActiveClass(className)}
              style={[styles.tab, isActive && styles.activeTab]}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.tabLabel, isActive ? styles.activeLabel : styles.inactiveLabel]}>{className}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignSelf: 'stretch',
  },
  scrollContent: {
    paddingVertical: 4,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    padding: 4,
    gap: 6,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
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
});

export default ClassTabs;
