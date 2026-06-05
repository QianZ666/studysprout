import TaskCard from "@/components/TaskCard";
import { useCurrentChild } from "@/contexts/CurrentChildContext";
import { getTaskTemplates } from "@/services/taskTemplateService";
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

  const [taskLibrary, setTaskLibrary] = useState<any[]>([]);
  const [showChildDropdown, setShowChildDropdown] = useState(false);
  const { children, selectedChild, setSelectedChild } = useCurrentChild();
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
    const loadTaskTemplates = async () => {
      if (!selectedChild?.id) return;

      const templates = await getTaskTemplates(selectedChild.id);
      setTaskLibrary(templates);
    };

    loadTaskTemplates();
  }, [selectedChild]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.childSwitcher}
        onPress={() => setShowChildDropdown(!showChildDropdown)}
      >
        <Text style={styles.childName}>
          👧 {selectedChild?.name || "No child"} ▼
        </Text>
      </Pressable>
      {showChildDropdown && (
        <View style={styles.childDropdown}>
          {children.map((child: Child) => (
            <Pressable
              key={child.id}
              style={styles.childDropdownItem}
              onPress={() => {
                setSelectedChild(child);
                setShowChildDropdown(false);
              }}
            >
              <Text style={styles.childDropdownText}>{child.name}</Text>
            </Pressable>
          ))}
        </View>
      )}

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
