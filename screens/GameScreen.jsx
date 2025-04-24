import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";
import SecondaryButton from "../components/game/SecondaryButton";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";

const generateRandomBetween = (min, max, exclude) => {
  const randomNum = Math.floor(Math.random() * (max - min) + min);

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

const GameScreen = ({ userNumber, numberHandler }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessList, setGuessList] = useState();

  const guessHigherHandler = (userNumber) => {
    if (userNumber === targetNumber) {
      console.log("correct");
    } else if (userNumber > targetNumber) {
      console.log("correct guess, it is higher");
    } else if (userNumber < targetNumber) {
      console.log("incorrect guess");
    }
  };

  const guessLowerHandler = (userNumber) => {
    if (userNumber === targetNumber) {
      console.log("correct");
    } else if (userNumber < targetNumber) {
      console.log("correct guess, it is lower");
    } else if (userNumber > targetNumber) {
      console.log("incorrect guess");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <SecondaryButton handleClick={guessLowerHandler}>-</SecondaryButton>
          </View>
          <View style={styles.button}>
            <SecondaryButton handleClick={guessHigherHandler}>
              +
            </SecondaryButton>
          </View>
        </View>
      </View>
      <View></View>
      <Button title="cancel" onPress={() => numberHandler("")} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default GameScreen;
