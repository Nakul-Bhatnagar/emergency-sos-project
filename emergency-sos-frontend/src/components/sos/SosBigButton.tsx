import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface Props {
  active?: boolean;
  onPress: () => void;
}

export const SosBigButton: React.FC<Props> = ({ active, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, active && styles.buttonActive]} onPress={onPress}>
      <Text style={styles.text}>{active ? 'CANCEL SOS' : 'SOS'}</Text>
    </TouchableOpacity>
  );
};

const SIZE = 200;

const styles = StyleSheet.create({
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: theme.spacing.lg,
  },
  buttonActive: {
    backgroundColor: theme.colors.danger,
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
  },
});
