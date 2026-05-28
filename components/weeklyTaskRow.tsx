import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WeeklyTaskRow() {
  return (
    <View style={styles.row}>
      <Text style={styles.taskName}>Math</Text>

      <Pressable style={styles.cell}>
        <Text>☐</Text>
      </Pressable>

      <Pressable style={styles.cell}>
        <Text>✅</Text>
      </Pressable>

      <Pressable style={styles.cell}>
        <Text>☐</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  taskName: {
    width: 100,
    fontSize: 16,
    fontWeight: "600",
  },

  cell: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
