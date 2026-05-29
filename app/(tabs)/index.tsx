import TaskCard from "@/components/TaskCard";
import { getChildren } from "@/services/childService";
import { styles } from "@/styles/home.styles";
import { Child } from "@/types/Child";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Reading 20 mins", completed: true },
    { id: "2", title: "Math worksheet", completed: true },
    { id: "3", title: "Piano practice", completed: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

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
  useEffect(() => {
    const loadChildren = async () => {
      const childrenData = await getChildren();

      setChildren(childrenData as Child[]);

      if (childrenData.length > 0) {
        setSelectedChild(childrenData[0] as Child);
      }
    };

    loadChildren();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.childSwitcher}>
        <Text style={styles.childName}>
          {selectedChild?.name || "No child"} ▼
        </Text>
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
