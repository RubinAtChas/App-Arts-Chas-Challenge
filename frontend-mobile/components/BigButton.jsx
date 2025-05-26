import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { lightTheme } from "../theme/colors";

const BigButton = ({ title, variant, onPress, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.buttonPressed,
        style
      ]}
      activeStyle={[styles.button, styles[variant], styles.buttonActive]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, styles[variant]]}>{title}</Text>
    </Pressable>
  );
};

export default BigButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: "auto",
    padding: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 550,
    textAlign: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: lightTheme.neutralButton,
    color: lightTheme.textSecondary,
  },
  secondary: {
    backgroundColor: lightTheme.darkButton,
    color: lightTheme.textSecondary,
  },
  accent: {
    backgroundColor: lightTheme.lightButton,
    color: lightTheme.textPrimary,
  },
});
