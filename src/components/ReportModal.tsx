import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { colors } from '../theme/colors';
import { ReportForm } from '../types';

const reasons: ReportForm['reason'][] = ['Quebrado', 'Sujo', 'Perigoso', 'Outro'];

interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: ReportForm) => void;
}

export const ReportModal = ({ visible, onClose, onSubmit }: ReportModalProps) => {
  const [selectedReason, setSelectedReason] = useState<ReportForm['reason']>('Quebrado');
  const [notes, setNotes] = useState('');

  const canSubmit = useMemo(() => selectedReason.length > 0, [selectedReason]);

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    onSubmit({ reason: selectedReason, notes: notes.trim() });
    setSelectedReason('Quebrado');
    setNotes('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Reportar problema</Text>
          <Text style={styles.subtitle}>Selecione o motivo e adicione detalhes (opcional).</Text>

          <View style={styles.reasonsWrap}>
            {reasons.map((reason) => {
              const selected = selectedReason === reason;
              return (
                <Pressable
                  key={reason}
                  style={[styles.reasonPill, selected && styles.reasonPillSelected]}
                  onPress={() => setSelectedReason(reason)}
                >
                  <Text
                    style={[styles.reasonPillText, selected && styles.reasonPillTextSelected]}
                  >
                    {reason}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Detalhes adicionais..."
            multiline
            numberOfLines={4}
            style={styles.input}
            placeholderTextColor={colors.mutedText}
          />

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!canSubmit}
            >
              <Text style={styles.submitText}>Enviar report</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.45)',
    justifyContent: 'flex-end'
  },
  card: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderColor: colors.border,
    borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6
  },
  subtitle: {
    fontSize: 14,
    color: colors.mutedText,
    marginBottom: 16
  },
  reasonsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14
  },
  reasonPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#FFFDF7'
  },
  reasonPillSelected: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5'
  },
  reasonPillText: {
    color: colors.text,
    fontWeight: '600'
  },
  reasonPillTextSelected: {
    color: '#B91C1C'
  },
  input: {
    minHeight: 96,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlignVertical: 'top',
    color: colors.text,
    marginBottom: 16,
    backgroundColor: '#FFFCF4'
  },
  actions: {
    flexDirection: 'row',
    gap: 10
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF'
  },
  cancelText: {
    color: colors.text,
    fontWeight: '600'
  },
  submitButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger
  },
  submitButtonDisabled: {
    opacity: 0.55
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
