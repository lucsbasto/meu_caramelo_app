import BottomSheet from '@gorhom/bottom-sheet';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedspotBottomSheet } from '../components/FeedspotBottomSheet';
import { ReportModal } from '../components/ReportModal';
import { FEEDSPOTS_MOCK } from '../data/feedspots.mock';
import { colors } from '../theme/colors';
import { Feedspot, ReportForm } from '../types';

const initialRegion: Region = {
  latitude: -23.55052,
  longitude: -46.633308,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

export const MapScreen = () => {
  const [feedspots, setFeedspots] = useState<Feedspot[]>(FEEDSPOTS_MOCK);
  const [selectedFeedspotId, setSelectedFeedspotId] = useState<string | null>(null);
  const [reportVisible, setReportVisible] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const selectedFeedspot = useMemo(
    () => feedspots.find((spot) => spot.id === selectedFeedspotId) ?? null,
    [feedspots, selectedFeedspotId]
  );

  const handleSelectFeedspot = (feedspot: Feedspot) => {
    setSelectedFeedspotId(feedspot.id);
    bottomSheetRef.current?.snapToIndex(2);
  };

  const handleFillFeedspot = () => {
    if (!selectedFeedspot) {
      return;
    }

    const now = new Date().toISOString();

    setFeedspots((current) =>
      current.map((spot) =>
        spot.id === selectedFeedspot.id
          ? { ...spot, lastFilledAt: now, status: 'ok' }
          : spot
      )
    );

    Alert.alert('Tudo certo', 'Comedouro marcado como cheio');
  };

  const handleSubmitReport = (_report: ReportForm) => {
    if (!selectedFeedspot) {
      return;
    }

    setFeedspots((current) =>
      current.map((spot) =>
        spot.id === selectedFeedspot.id ? { ...spot, status: 'needs_attention' } : spot
      )
    );

    Alert.alert('Obrigado!', 'Report enviado');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Meu Caramelo</Text>
        <Pressable style={styles.filterButton}>
          <MaterialIcons name="tune" size={22} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.mapContainer}>
        <MapView style={StyleSheet.absoluteFill} initialRegion={initialRegion}>
          {feedspots.map((spot) => (
            <Marker
              key={spot.id}
              coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
              onPress={() => handleSelectFeedspot(spot)}
              tracksViewChanges={false}
            >
              <View style={styles.markerOuter}>
                <View style={styles.markerInner} />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      <FeedspotBottomSheet
        bottomSheetRef={bottomSheetRef}
        selectedFeedspot={selectedFeedspot}
        onFill={handleFillFeedspot}
        onOpenReport={() => setReportVisible(true)}
      />

      <ReportModal
        visible={reportVisible}
        onClose={() => setReportVisible(false)}
        onSubmit={handleSubmitReport}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  },
  headerSpacer: {
    width: 38
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: colors.text
  },
  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3D8',
    borderWidth: 1,
    borderColor: colors.border
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden'
  },
  markerOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  markerInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.secondary
  }
});
