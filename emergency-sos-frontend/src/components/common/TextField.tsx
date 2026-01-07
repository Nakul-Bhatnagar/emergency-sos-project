import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';
import { theme } from '../../theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export const TextField: React.FC<Props> = ({ label, error, ...rest }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} placeholderTextColor={theme.colors.textSecondary} {...rest} />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.small,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
  },
  error: {
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.small,
  },
});
