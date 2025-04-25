import { StyleSheet, Text, View, Button, Alert, FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";
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

const GameScreen = ({ userNumber, setGameOver, numberPicker }) => {
  const minBoundary = useRef(0);
  const maxBoundary = useRef(100);
  const id = useRef(1);

  useEffect(() => {
    minBoundary.current = 0;
    maxBoundary.current = 100;
    id.current = 1;
  }, [userNumber]);

  const initialGuess = generateRandomBetween(
    minBoundary.current,
    maxBoundary.current,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessList, setGuessList] = useState([
    { num: currentGuess, id: id.current },
  ]);

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
      maxBoundary.current = currentGuess;
    } else if (direction === "greater") {
      minBoundary.current = currentGuess;
    }
    const newRndNum = generateRandomBetween(
      minBoundary.current,
      maxBoundary.current,
      currentGuess
    );
    if (newRndNum === userNumber) {
      setCurrentGuess(newRndNum);
      setGameOver({ won: true, home: true });
      return;
    }
    setCurrentGuess(newRndNum);
    id.current += 1;
    setGuessList((prevGuesses) => [
      { num: newRndNum, id: id.current },
      ...prevGuesses,
    ]);
  };

  const resetGame = () => {
    numberPicker("");
    setGameOver({ won: false, home: true });
  };

  return (
    <View style={styles.mainContainer}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <View>
        <Text>Lower or Higher?</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <SecondaryButton handleClick={nextGuessHandler.bind(this, "lower")}>
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
      <Button title="Return" onPress={() => resetGame()} />
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
    marginBottom: 50,
  },
  list: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },

  listText: {
    flex: 1,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export default GameScreen;
