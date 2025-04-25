import { StyleSheet, View, Text, Button } from "react-native";

export default function GameOverScreen({
  userNumber,
  setGameOver,
  numberPicker,
}) {
  const resetGame = () => {
    numberPicker("");
    setGameOver({ won: false, home: true });
  };

  return (
    <View style={styles.mainContainer}>
      <Text>Game Over</Text>
      <Text>{userNumber}</Text>
      <Button title="Reset Game" onPress={() => resetGame()} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 50,
    fontSize: 100,
    color: "white",
    borderWidth: 1,
  },
});
