import { Pressable, StyleSheet, Text } from "react-native";

type TaskCardProps = {
  title: string;
  completed?: boolean;
  onPress?: () => void;
};

export default function TaskCard({
  title,
  completed = false,
  onPress,
}: TaskCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.text}>
        {completed ? "✅" : "☐"} {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  text: {
    fontSize: 18,
  },
});
