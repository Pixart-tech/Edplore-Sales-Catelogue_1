import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CURRICULUM_DATA, PRE_WRITTEN_DATA } from './constants';
import type { ClassName, RegularClassName } from './types';
import ClassTabs from './components/ClassTabs';
import SubjectAccordion from './components/SubjectAccordion';
import PreWrittenContent from './components/PreWrittenContent';
import PGContent from './components/PGContent';
import { BookOpenIcon } from './components/icons/BookOpenIcon';

const App: React.FC = () => {
  const classNames: ClassName[] = useMemo(
    () => ['PG', 'Nursery', 'LKG', 'UKG', 'Pre-Written'],
    [],
  );
  const [activeClass, setActiveClass] = useState<ClassName>(classNames[0]);
  const [openSubjectIndex, setOpenSubjectIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenSubjectIndex((current) => (current === index ? null : index));
  };

  const renderContent = () => {
    if (activeClass === 'Pre-Written') {
      return <PreWrittenContent data={PRE_WRITTEN_DATA} />;
    }

    if (activeClass === 'PG') {
      return <PGContent subjects={CURRICULUM_DATA.PG} />;
    }

    const activeClassData = CURRICULUM_DATA[activeClass as Exclude<RegularClassName, 'PG'>];
    return (
      <View style={styles.accordionList}>
        {activeClassData.map((subject, index) => (
          <SubjectAccordion
            key={`${activeClass}-${subject.name}-${index}`}
            subject={subject}
            isOpen={openSubjectIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.logo}>
                <BookOpenIcon size={26} color="#ffffff" />
              </View>
              <Text style={styles.title}>Curriculum Preview</Text>
            </View>
            <ClassTabs
              classes={classNames}
              activeClass={activeClass}
              setActiveClass={(className) => {
                setActiveClass(className);
                setOpenSubjectIndex(null);
              }}
            />
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {renderContent()}
          </ScrollView>

          <Text style={styles.footer}>Curriculum data for educational purposes.</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 16,
  },
  header: {
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#4338ca',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
  },
  content: {
    paddingBottom: 24,
    gap: 20,
  },
  accordionList: {
    gap: 16,
  },
  footer: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 12,
  },
});

export default App;
