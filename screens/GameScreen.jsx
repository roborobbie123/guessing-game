import { StyleSheet, Text, View, Button, Alert, FlatList } from "react-native";
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

let minBoundary = 1;
let maxBoundary = 100;
let id = 1;

const GameScreen = ({ userNumber, numberHandler }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [gameWon, setGameWon] = useState(false);
  const [guessList, setGuessList] = useState([{ num: currentGuess, id: id }]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", {
        text: "sorry",
        style: "cancel",
      });
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else if (direction === "greater") {
      minBoundary = currentGuess;
    }
    const newRndNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    if (newRndNum === userNumber) {
      setCurrentGuess(newRndNum);
      setGameWon(true);
      return;
    }
    setCurrentGuess(newRndNum);
    id += 1;
    setGuessList((prevGuesses) => [{ num: newRndNum, id: id }, ...prevGuesses]);
  };

  return (
    <View style={styles.mainContainer}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      {gameWon ? (
        <View>
          <Title>GAME WON!</Title>
        </View>
      ) : (
        <View>
          <Text>Lower or Higher?</Text>
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <SecondaryButton
                handleClick={nextGuessHandler.bind(this, "lower")}
              >
                -
              </SecondaryButton>
            </View>
            <View style={styles.button}>
              <SecondaryButton
                handleClick={nextGuessHandler.bind(this, "greater")}
              >
                +
              </SecondaryButton>
            </View>
          </View>
        </View>
      )}

      <View style={styles.listContainer}>
        <FlatList
          data={guessList}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <Text style={styles.listText}>#{item.id}</Text>
              <Text style={styles.listText}>{item.num}</Text>
            </View>
          )}
        />
      </View>
      <Button title="Return" onPress={() => numberHandler("")} />
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
  listContainer: {
    width: 200,
    height: 300,
  },
  list: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
 
  listText: {
    flex: 1,
    color: "white",
    fontSize: 20,
    textAlign: 'center'
  },
});

export default GameScreen;
