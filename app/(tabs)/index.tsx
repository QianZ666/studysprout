import TaskCard from "@/components/TaskCard";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Reading 20 mins", completed: true },
    { id: "2", title: "Math worksheet", completed: true },
    { id: "3", title: "Piano practice", completed: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);

  const taskLibrary = [
    { id: "1", title: "IXL Math" },
    { id: "2", title: "IXL English" },
    { id: "3", title: "Reading A-Z" },
    { id: "4", title: "Learning Chinese" },
  ];

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
      },
    ]);

    setNewTaskTitle("");
  };

  const addTaskFromLibrary = (title: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now().toString(),
        title,
        completed: false,
      },
    ]);

    setShowLibrary(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.childSwitcher}>
        <Text style={styles.childName}>👧 Emma ▼</Text>
      </View>

      <Text style={styles.title}>Today's Tasks</Text>
      <Text style={styles.subtitle}>
        {tasks.filter((task) => task.completed).length} / {tasks.length}{" "}
        completed today
      </Text>
      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <Text style={styles.actionText}>+ Select Tasks</Text>
        </View>

        <Pressable
          style={styles.actionButton}
          onPress={() => setShowLibrary(!showLibrary)}
        >
          <Text style={styles.actionText}>+ Add Tasks</Text>
        </Pressable>
        {showLibrary && (
          <View style={styles.libraryBox}>
            {taskLibrary.map((task) => (
              <Pressable
                key={task.id}
                style={styles.libraryItem}
                onPress={() => addTaskFromLibrary(task.title)}
              >
                <Text style={styles.libraryText}>{task.title}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <View style={styles.addTaskRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a temporary task"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />

        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <View style={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            completed={task.completed}
            onPress={() => toggleTask(task.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F8FAF8",
  },
  childSwitcher: {
    marginTop: 60,
    marginBottom: 36,
  },
  childName: {
    fontSize: 30,
    fontWeight: "700",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
    marginBottom: 20,
  },
  taskList: {
    gap: 14,
  },
  taskText: {
    fontSize: 18,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  actionButton: {
    backgroundColor: "#E8F0E8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  addTaskRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#DDEBDD",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 14,
  },

  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  libraryBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 20,
  },

  libraryItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  libraryText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
