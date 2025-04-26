import { StyleSheet, View, Text, Button, Image } from "react-native";
import Title from "@/components/ui/Title";
import Card from "@/components/ui/Card";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function GameOverScreen({
  userNumber,
  setGameOver,
  numberPicker,
  turnCount,
}) {
  const resetGame = () => {
    numberPicker("");
    setGameOver({ won: false, home: true });
  };

  return (
    <View style={styles.mainContainer}>
      <Title>Game Over!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Card>
        <View>
          <Text style={styles.cardText}>
            Your phone needed <Text style={styles.bold}>{turnCount}</Text>{" "}
            rounds to guess the number{" "}
            <Text style={styles.bold}>{userNumber}</Text>.
          </Text>
        </View>
        <PrimaryButton handleClick={() => resetGame()}>Start New Game</PrimaryButton>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 50,
    fontSize: 100,
    color: "white",
    alignItems: "center",
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 3,
    overflow: "hidden",
    marginTop: 36,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  cardItems: {},
  cardText: {
    color: "#ddb52f",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 24,
  },
  bold: {
    fontWeight: "bold",
    color: "#e1c25b",
  },
});
