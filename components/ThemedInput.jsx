import { TextInput, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedInput = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <TextInput
      style={[
        style,
        {
          backgroundColor: theme.card,
          padding: 20,
          borderRadius: 6,
          color: theme.text,
        },
      ]}
      {...props}
    />
  );
};

export default ThemedInput;
