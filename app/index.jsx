import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import StartGameScreen from "@/screens/StartGameScreen";

export default function Index() {
  return (
    <View style={styles.container}>
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
});
