import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { RefObject, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { Feedspot } from '../types';
import { PhotoCarousel } from './PhotoCarousel';

interface FeedspotBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet>;
  selectedFeedspot: Feedspot | null;
  onFill: () => void;
  onOpenReport: () => void;
}

export const FeedspotBottomSheet = ({
  bottomSheetRef,
  selectedFeedspot,
  onFill,
  onOpenReport
}: FeedspotBottomSheetProps) => {
  const snapPoints = useMemo(() => ['12%', '35%', '70%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      enablePanDownToClose={false}
    >
      {selectedFeedspot ? (
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <PhotoCarousel photos={selectedFeedspot.photos} resetKey={selectedFeedspot.id} />

          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{selectedFeedspot.name}</Text>
              <View
                style={[
                  styles.statusPill,
                  selectedFeedspot.status === 'ok' ? styles.statusOk : styles.statusNeedsAttention
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    selectedFeedspot.status === 'ok'
                      ? styles.statusTextOk
                      : styles.statusTextNeedsAttention
                  ]}
                >
                  {selectedFeedspot.status === 'ok' ? 'OK' : 'Precisa de atenção'}
                </Text>
              </View>
            </View>
            <Text style={styles.description}>{selectedFeedspot.description}</Text>
            <Text style={styles.lastFilled}>
              Última reposição:{' '}
              {selectedFeedspot.lastFilledAt
                ? new Date(selectedFeedspot.lastFilledAt).toLocaleString('pt-BR')
                : 'Ainda não registrada'}
            </Text>
          </View>

          <View style={styles.buttonsRow}>
            <Pressable style={[styles.actionButton, styles.fillButton]} onPress={onFill}>
              <Text style={[styles.actionText, styles.fillText]}>Encher</Text>
            </Pressable>
            <Pressable style={[styles.actionButton, styles.reportButton]} onPress={onOpenReport}>
              <Text style={[styles.actionText, styles.reportText]}>Reportar</Text>
            </Pressable>
          </View>
        </BottomSheetScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Selecione um comedouro no mapa</Text>
          <Text style={styles.emptyText}>
            Toque em um marcador para abrir os detalhes e ações rápidas.
          </Text>
        </View>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: colors.border
  },
  handleIndicator: {
    backgroundColor: '#E8D9B8',
    width: 50
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 28
  },
  section: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFEFB',
    padding: 16,
    marginBottom: 16
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    flex: 1
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  statusOk: {
    backgroundColor: '#DCFCE7'
  },
  statusNeedsAttention: {
    backgroundColor: '#FEE2E2'
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700'
  },
  statusTextOk: {
    color: '#047857'
  },
  statusTextNeedsAttention: {
    color: '#B91C1C'
  },
  description: {
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8
  },
  lastFilled: {
    fontSize: 13,
    color: colors.mutedText
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14
  },
  actionButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fillButton: {
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#86EFAC'
  },
  reportButton: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5'
  },
  actionText: {
    fontSize: 16,
    fontWeight: '700'
  },
  fillText: {
    color: colors.success
  },
  reportText: {
    color: colors.danger
  },
  emptyContainer: {
    paddingHorizontal: 24,
    paddingTop: 12
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 4
  },
  emptyText: {
    color: colors.mutedText,
    lineHeight: 20
  }
});
