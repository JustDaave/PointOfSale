import { AppIcon, AppIconName } from "@/components/AppIcon";
import { shape, ThemeColors, type } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";

// Material 3 outlined text field https://m3.material.io/components/text-fields
type Props = TextInputProps & {
  label: string;
  icon?: AppIconName;
  error?: string;
  helperText?: string;
  // The label sits on top of the border, so it needs the same color as what's behind the field
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function TextField({ label, icon, error, helperText, backgroundColor, containerStyle, ...inputProps }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [focused, setFocused] = useState(false);

  const accentColor = error ? colors.error : focused ? colors.primary : colors.onSurfaceVariant;

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.field,
          focused && styles.fieldFocused,
          error ? styles.fieldError : null,
          { backgroundColor: backgroundColor ?? colors.surface },
        ]}
      >
        <Text style={[styles.label, { color: accentColor, backgroundColor: backgroundColor ?? colors.surface }]}>
          {label}
        </Text>
        {icon && <AppIcon name={icon} color={colors.onSurfaceVariant} size={20} />}
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.onSurfaceVariant}
          {...inputProps}
          onBlur={(event) => {
            setFocused(false);
            inputProps.onBlur?.(event);
          }}
          onFocus={(event) => {
            setFocused(true);
            inputProps.onFocus?.(event);
          }}
          style={styles.input}
        />
      </View>
      {(error || helperText) && <Text style={[styles.supporting, error ? styles.errorText : null]}>{error || helperText}</Text>}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    field: {
      height: 56,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 1,
      borderColor: colors.outline,
      borderRadius: shape.extraSmall,
    },
    fieldFocused: { borderWidth: 2, borderColor: colors.primary, paddingHorizontal: 15 },
    fieldError: { borderColor: colors.error },
    label: { ...type.bodySmall, position: "absolute", top: -9, left: 12, paddingHorizontal: 4 },
    // outlineWidth hides the browser focus ring on web, the border already shows focus
    input: { ...type.bodyLarge, flex: 1, height: "100%", color: colors.onSurface, outlineWidth: 0 },
    supporting: { ...type.bodySmall, color: colors.onSurfaceVariant, marginTop: 4, marginHorizontal: 16 },
    errorText: { color: colors.error },
  });
}
