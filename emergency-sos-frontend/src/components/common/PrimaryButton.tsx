import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ title, onPress, loading }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
      {loading ? <ActivityIndicator /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: 999,
    alignItems: 'center',
    marginVertical: theme.spacing.sm,

    // subtle shadow / elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    color: '#fff',
    fontSize: theme.typography.body,
    fontWeight: '600',
  },
});

