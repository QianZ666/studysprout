import TaskCard from "@/components/TaskCard";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Reading 20 mins", completed: true },
    { id: "2", title: "Math worksheet", completed: true },
    { id: "3", title: "Piano practice", completed: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

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
        <Text style={styles.childName}>👧Yuancheng ▼</Text>
      </View>

      <Text style={styles.title}>Today's Tasks</Text>
      <Text style={styles.subtitle}>
        {tasks.filter((task) => task.completed).length} / {tasks.length}{" "}
        completed today
      </Text>
      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => setShowLibrary(!showLibrary)}
        >
          <Text style={styles.actionText}>+ Select Tasks</Text>
        </Pressable>
      </View>
      {showLibrary && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownScroll}>
            {taskLibrary.map((task) => (
              <Pressable
                key={task.id}
                style={styles.dropdownItem}
                onPress={() => addTaskFromLibrary(task.title)}
              >
                <Text style={styles.dropdownText}>{task.title}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
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
      {showAddTask && (
        <View style={styles.addTaskPopup}>
          <TextInput
            style={styles.popupInput}
            placeholder="New temporary task"
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
          />

          <Pressable
            style={styles.popupButton}
            onPress={() => {
              addTask();
              setShowAddTask(false);
            }}
          >
            <Text style={styles.popupButtonText}>Add Task</Text>
          </Pressable>
        </View>
      )}
      <Pressable
        style={styles.fab}
        onPress={() => setShowAddTask(!showAddTask)}
      >
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
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
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 8,
    marginTop: -12,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  dropdownText: {
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownScroll: {
    maxHeight: 220,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 100,

    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#CFE3CF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 6,
  },

  fabText: {
    fontSize: 34,
    fontWeight: "300",
  },
  addTaskPopup: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 180,

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 10,
  },

  popupInput: {
    backgroundColor: "#F3F5F3",
    padding: 14,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 16,
  },

  popupButton: {
    backgroundColor: "#CFE3CF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  popupButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
