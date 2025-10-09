import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedInput from "../../components/ThemedInput";
import { useState } from "react";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import { usePosts } from "../../hooks/usePosts";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { createPost } = usePosts();

  const addHandle = async () => {
    console.log(title, body);

    try {
      await createPost(title, body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // 'padding' works well on iOS
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView safe={true} style={style.container}>
          <ThemedText style={style.title}>Create Post</ThemedText>
          <Spacer />
          <ThemedInput
            placeholder="Title"
            onChangeText={setTitle}
            value={title}
          />
          <Spacer />
          <ThemedInput
            placeholder="Body"
            onChangeText={setBody}
            value={body}
            multiline={true}
            style={{ height: 150 }}
          />
          <Spacer />
          <ThemedButton>
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
              onPress={addHandle}
            >
              Add
            </Text>
          </ThemedButton>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Create;
