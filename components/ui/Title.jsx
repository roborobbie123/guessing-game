import { Text, StyleSheet } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginBottom: 10,
    textAlign: 'center'
  },
});

export default Title;
