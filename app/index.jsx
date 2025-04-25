import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import StartGameScreen from "@/screens/StartGameScreen";
import GameScreen from "@/screens/GameScreen";
import GameOverScreen from "@/screens/GameOverScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState({
    won: false,
    home: true,
  });

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.root}>
      <ImageBackground
        source={require("../assets/images/dices.jpg")}
        resizeMode="cover"
        style={styles.root}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.root}>
          {gameOver.won && <GameOverScreen userNumber={userNumber} setGameOver={setGameOver} numberPicker={pickedNumberHandler}/>}
          {userNumber && !gameOver.won && (
            <GameScreen userNumber={userNumber} setGameOver={setGameOver} numberPicker={pickedNumberHandler} />
          )}
          ;
          {(!userNumber && !gameOver.won && gameOver.home) && (
            <StartGameScreen numberHandler={pickedNumberHandler} />
          )}
        </SafeAreaView>
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
