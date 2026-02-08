import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { colors } from '../theme/colors';

interface PhotoCarouselProps {
  photos: string[];
  resetKey: string;
}

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 20;
const carouselWidth = screenWidth - horizontalPadding * 2;

export const PhotoCarousel = ({ photos, resetKey }: PhotoCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sanitizedPhotos = useMemo(() => photos.filter(Boolean), [photos]);

  const onProgressChange = useCallback((_: number, absoluteProgress: number) => {
    setActiveIndex(Math.round(absoluteProgress));
  }, []);

  return (
    <View key={resetKey} style={styles.wrapper}>
      <Carousel
        width={carouselWidth}
        height={200}
        data={sanitizedPhotos}
        scrollAnimationDuration={500}
        onProgressChange={onProgressChange}
        renderItem={({ item }) => (
          <View style={styles.imageCard}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          </View>
        )}
      />
      <View style={styles.dotsContainer}>
        {sanitizedPhotos.map((photo, index) => (
          <View
            key={`${photo}-${index}`}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18
  },
  imageCard: {
    width: carouselWidth,
    height: 200,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  image: {
    width: '100%',
    height: '100%'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#E7D7B2'
  },
  activeDot: {
    width: 18,
    backgroundColor: colors.primary
  }
});
