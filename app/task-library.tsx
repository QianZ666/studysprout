import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import { useCurrentChild } from "@/contexts/CurrentChildContext";
import {
    createTaskTemplate,
    getTaskTemplates,
} from "@/services/taskTemplateService";

export default function TaskLibraryScreen() {
  const { selectedChild } = useCurrentChild();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskTemplates, setTaskTemplates] = useState<any[]>([]);

  // Load tasks for current child
  const loadTaskTemplates = async () => {
    if (!selectedChild?.id) return;

    const templates = await getTaskTemplates(selectedChild.id);

    setTaskTemplates(templates);
  };

  // Reload when child changes
  useEffect(() => {
    loadTaskTemplates();
  }, [selectedChild]);

  // Create task
  const handleCreateTask = async () => {
    if (!selectedChild?.id) {
      Alert.alert("No child selected");
      return;
    }

    if (!taskTitle.trim()) {
      Alert.alert("Please enter task name");
      return;
    }

    await createTaskTemplate({
      childId: selectedChild.id,
      title: taskTitle.trim(),
      createdAt: new Date(),
    });

    await loadTaskTemplates();

    setTaskTitle("");

    Alert.alert("Task created");
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F8FAF8",
      }}
      contentContainerStyle={{
        padding: 24,
        paddingBottom: 100,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginTop: 60,
        }}
      >
        Task Library
      </Text>

      {/* Current child */}
      <View
        style={{
          backgroundColor: "#FFFFFF",
          padding: 16,
          borderRadius: 16,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          {selectedChild?.name}
        </Text>
      </View>

      {/* Current tasks */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginTop: 30,
        }}
      >
        Current Tasks
      </Text>

      {taskTemplates.map((task) => (
        <View
          key={task.id}
          style={{
            backgroundColor: "#FFFFFF",
            padding: 14,
            borderRadius: 14,
            marginTop: 10,
          }}
        >
          <Text>{task.title}</Text>
        </View>
      ))}

      {/* Add task */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginTop: 30,
        }}
      >
        Add New Task
      </Text>

      <TextInput
        placeholder="e.g. IXL Math"
        value={taskTitle}
        onChangeText={setTaskTitle}
        style={{
          backgroundColor: "#FFFFFF",
          padding: 14,
          borderRadius: 14,
          marginTop: 12,
        }}
      />

      <Pressable
        onPress={handleCreateTask}
        style={{
          backgroundColor: "#CFE3CF",
          padding: 16,
          borderRadius: 16,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          Save Task
        </Text>
      </Pressable>
    </ScrollView>
  );
}
