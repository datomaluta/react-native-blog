import { Text, useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedCard = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View
      style={[
        {
          backgroundColor: theme.card,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedCard;
