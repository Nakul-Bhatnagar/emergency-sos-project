import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';

export const ScreenWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
});
