import { StyleSheet, View } from "react-native";

export default function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 8,
    marginHorizontal: 24,
    marginTop: 50,
    padding: 16,
    backgroundColor: "#3c0320",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    alignItems: "center",
  },
});
