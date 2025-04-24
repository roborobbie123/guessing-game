import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import StartGameScreen from "@/screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.root}>
      <ImageBackground
        source={require("../assets/images/dices.jpg")}
        resizeMode="cover"
        style={styles.root}
        imageStyle={styles.backgroundImage}
      >
        <StartGameScreen />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
