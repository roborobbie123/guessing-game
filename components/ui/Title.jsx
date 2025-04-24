import { Text, StyleSheet } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ddb52f",
    borderWidth: 2,
    borderColor: "#ddb52f",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default Title;
