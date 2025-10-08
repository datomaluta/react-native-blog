import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedInput from "../../components/ThemedInput";
import Spacer from "../../components/Spacer";
import { useState } from "react";
import ThemedButton from "../../components/ThemedButton";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../hooks/useUser";

const Login = () => {
  const [email, setEmail] = useState("datomaluta@gmail.com");
  const [password, setPassword] = useState("dato");
  const [error, setError] = useState(null);
  const { login } = useUser();

  const handleSubmit = async () => {
    setError(null);

    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // 'padding' works well on iOS
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView safe={true} style={styles.container}>
          <ThemedText style={styles.title}>Login</ThemedText>

          <Spacer height={20} />

          <ThemedInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Spacer height={20} />

          <ThemedInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Spacer height={20} />

          <ThemedButton onPress={handleSubmit}>
            <Text style={{ color: "white" }}>Login</Text>
          </ThemedButton>

          <Spacer height={20} />

          <Link href={"/register"}>
            <ThemedText>Register instead</ThemedText>
          </Link>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  input: {
    width: "85%",
  },
});

export default Login;
