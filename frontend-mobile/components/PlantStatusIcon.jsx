import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme } from '../theme/colors';

export default function PlantStatusIcon({ status }) {
  const backgroundColor =
    status === 'Healthy' ? '#3F6133' : status === 'Unhealthy' ? '#FFDE8D' : status === 'Dying' ? '#FF0000' : 'grey';

  return <View style={[styles.statusIcon, { backgroundColor }]} />;
}

const styles = StyleSheet.create({
  statusIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: lightTheme.card,
    marginLeft: 10,
  },
});