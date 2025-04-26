import { View, Text, StyleSheet, Pressable } from "react-native";

const SecondaryButton = ({ children, handleClick }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={handleClick}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 100,
    height: 50,
    width: 75,
    margin: 5,
    overflow: "hidden",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowColor: "black",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonInnerContainer: {
    flex: 1,
    backgroundColor: "#72063c",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    fontSize: 40,
    textAlign: "center",
    color: "white",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default SecondaryButton;
