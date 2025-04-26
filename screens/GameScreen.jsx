import { StyleSheet, Text, View, Button, Alert, FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

import SecondaryButton from "../components/game/SecondaryButton";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";

const generateRandomBetween = (min, max, exclude) => {
  const randomNum = Math.floor(Math.random() * (max - min) + min);

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

const GameScreen = ({ userNumber, setGameOver, numberPicker, setTurn }) => {
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
    setTurn(id.current);
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
      <Card>
        <NumberContainer>{currentGuess}</NumberContainer>

        <View>
          <Text style={styles.instructionText}>Lower or Higher?</Text>
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
      </Card>

      <View style={styles.listContainer}>
        <FlatList
          data={guessList}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>#{item.id}</Text>
              <Text style={styles.listText}>Opponent's Guess: {item.num}</Text>
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
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  listContainer: {
    width: "100%",
    height: 225,
    marginBottom: 50,
  },
  listItem: {
    marginTop: 15,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 24,
    borderColor: "#3c0320",
    padding: 5,
    paddingLeft: 20,
    backgroundColor: "#ddb52f",
    shadowRadius: 5,
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 5 },
  },

  listText: {
    flex: 1,
    color: "#3c0320",
    fontSize: 12,
    fontWeight: "600",
  },
  instructionText: {
    color: "#ddb52f",
    textAlign: "center",
  },
  header: {
    marginLeft: 45,
    flexDirection: "row",
    gap: 50,
    borderWidth: 1,
    width: "100%",
  },
});

export default GameScreen;
