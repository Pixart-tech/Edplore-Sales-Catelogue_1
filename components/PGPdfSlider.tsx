import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';
import type { PGSubject } from '../types';

interface PGPdfSliderProps {
  subjects: PGSubject[];
  onIndexChange?: (index: number) => void;
}

type SliderSubject = PGSubject & { key: string };

const viewabilityConfig = {
  itemVisiblePercentThreshold: 70,
};

const PGPdfSlider: React.FC<PGPdfSliderProps> = ({ subjects, onIndexChange }) => {
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [assetUris, setAssetUris] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderSubjects = useMemo<SliderSubject[]>(() => {
    return subjects
      .filter((subject) => subject.books.length > 0 && subject.books[0]?.pdfAsset)
      .map((subject) => ({
        ...subject,
        key: subject.name,
      }));
  }, [subjects]);

  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      if (sliderSubjects.length === 0) {
        if (isMounted) {
          setAssetUris({});
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);

      try {
        const entries = await Promise.all(
          sliderSubjects.map(async (subject) => {
            const book = subject.books[0];
            if (!book?.pdfAsset) {
              return null;
            }

            const asset = Asset.fromModule(book.pdfAsset);
            if (!asset.localUri) {
              await asset.downloadAsync();
            }

            return [subject.key, asset.localUri ?? asset.uri] as const;
          }),
        );

        if (isMounted) {
          const availableEntries = entries.filter(
            (entry): entry is readonly [string, string] => entry !== null,
          );
          setAssetUris(Object.fromEntries(availableEntries));
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setAssetUris({});
          setIsLoading(false);
        }
      }
    };

    void loadAssets();

    return () => {
      isMounted = false;
    };
  }, [sliderSubjects]);

  useEffect(() => {
    if (!isLoading && sliderSubjects.length > 0) {
      onIndexChange?.(0);
      setCurrentIndex(0);
    }
  }, [isLoading, onIndexChange, sliderSubjects.length]);

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length === 0) {
        return;
      }

      const nextIndex = viewableItems[0].index ?? 0;
      setCurrentIndex(nextIndex);
      onIndexChange?.(nextIndex);
    },
  );

  const slideWidth = Math.max(280, width - 64);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4338ca" />
        <Text style={styles.loadingLabel}>Preparing PDF preview…</Text>
      </View>
    );
  }

  if (sliderSubjects.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No PDF previews are available for PG right now.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={sliderSubjects}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderContent}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => {
          const book = item.books[0];
          const uri = book?.pdfAsset ? assetUris[item.key] : undefined;

          return (
            <View style={[styles.slide, { width: slideWidth }]}> 
              <View style={styles.slideHeader}>
                <Text style={styles.slideSubject}>{item.name}</Text>
                {book?.name ? <Text style={styles.slideBook}>{book.name}</Text> : null}
              </View>
              <View style={styles.pdfContainer}>
                {uri ? (
                  <WebView
                    originWhitelist={["*"]}
                    source={{ uri }}
                    allowFileAccess
                    allowFileAccessFromFileURLs
                    allowUniversalAccessFromFileURLs
                    javaScriptEnabled
                    style={styles.pdf}
                  />
                ) : (
                  <View style={styles.missingPdf}>
                    <Text style={styles.missingPdfText}>PDF file missing for this subject.</Text>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
      <View style={styles.pagination}>
        {sliderSubjects.map((item, index) => (
          <View
            // eslint-disable-next-line react/no-array-index-key
            key={`${item.key}-${index}`}
            style={[styles.dot, index === currentIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    height: 360,
    borderRadius: 16,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#312e81',
  },
  emptyContainer: {
    paddingVertical: 40,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 14,
  },
  sliderContent: {
    paddingHorizontal: 12,
  },
  slide: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    padding: 16,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
    gap: 12,
  },
  slideHeader: {
    gap: 4,
  },
  slideSubject: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  slideBook: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6366f1',
  },
  pdfContainer: {
    height: 360,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
  },
  pdf: {
    flex: 1,
  },
  missingPdf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  missingPdfText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5f5',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#4338ca',
  },
});

export default PGPdfSlider;
