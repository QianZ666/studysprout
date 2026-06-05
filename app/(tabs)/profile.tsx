import { router } from "expo-router";
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
import { createChild } from "@/services/childService";
import {
  createTaskTemplate,
  getTaskTemplates,
} from "@/services/taskTemplateService";

export default function ProfileScreen() {
  const { selectedChild, loadChildren } = useCurrentChild();

  // Add child form state
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [taskTemplates, setTaskTemplates] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [dailyGoal, setDailyGoal] = useState("5");
  const [reward, setReward] = useState("$5");
  const [rewardCycleDays, setRewardCycleDays] = useState("7");

  // Long-term task form state
  const [taskTitle, setTaskTitle] = useState("");

  // Create a new child profile
  const handleCreateChild = async () => {
    if (!name.trim()) {
      Alert.alert("Please enter child name");
      return;
    }

    await createChild({
      name: name.trim(),
      dailyGoal: Number(dailyGoal),
      reward: reward.trim(),
      rewardCycleDays: Number(rewardCycleDays),
      createdAt: new Date(),
    });

    Alert.alert("Child created");

    await loadChildren();

    setShowAddChildForm(false);
    setName("");
    setDailyGoal("5");
    setReward("$5");
    setRewardCycleDays("7");
  };
  // Store long-term task templates for the current child
  const loadTaskTemplates = async () => {
    if (!selectedChild?.id) return;

    const templates = await getTaskTemplates(selectedChild.id);

    setTaskTemplates(templates);
  };

  // Create a long-term task for the current selected child
  const handleCreateTaskTemplate = async () => {
    if (!selectedChild?.id) {
      Alert.alert("Please select a child first");
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

    // Refresh task library after creating a new task
    await loadTaskTemplates();

    Alert.alert("Long-term task created");

    setTaskTitle("");
  };

  // Reload task templates whenever the selected child changes
  useEffect(() => {
    loadTaskTemplates();
  }, [selectedChild]);

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
      <Text style={{ fontSize: 28, fontWeight: "700", marginTop: 60 }}>
        Profile
      </Text>

      {/* Current child information */}
      <Text style={sectionTitleStyle}>Current Child</Text>

      <View style={cardStyle}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          {selectedChild?.name ?? "No Child Selected"}
        </Text>

        <Text>Goal: {selectedChild?.dailyGoal ?? "-"} tasks/day</Text>
        <Text>Reward: {selectedChild?.reward ?? "-"}</Text>
        <Text>Cycle: {selectedChild?.rewardCycleDays ?? "-"} days</Text>
      </View>

      {/* Toggle Add Child form */}
      <Pressable
        onPress={() => setShowAddChildForm(!showAddChildForm)}
        style={secondaryButtonStyle}
      >
        <Text style={buttonTextStyle}>+ Add Child</Text>
      </Pressable>

      {/* Add Child form */}
      {showAddChildForm && (
        <>
          <Text style={sectionTitleStyle}>Add Child</Text>

          <Text style={labelStyle}>Child Name</Text>
          <TextInput
            placeholder="e.g. Emma"
            value={name}
            onChangeText={setName}
            style={inputStyle}
          />

          <Text style={labelStyle}>Daily Goal (tasks per day)</Text>
          <TextInput
            placeholder="e.g. 5"
            value={dailyGoal}
            onChangeText={setDailyGoal}
            keyboardType="number-pad"
            style={inputStyle}
          />

          <Text style={labelStyle}>Reward</Text>
          <TextInput
            placeholder="e.g. $5, Pokemon Cards, Movie Night"
            value={reward}
            onChangeText={setReward}
            style={inputStyle}
          />

          <Text style={labelStyle}>Reward Cycle (days)</Text>
          <TextInput
            placeholder="e.g. 7"
            value={rewardCycleDays}
            onChangeText={setRewardCycleDays}
            keyboardType="number-pad"
            style={inputStyle}
          />

          <Pressable onPress={handleCreateChild} style={primaryButtonStyle}>
            <Text style={buttonTextStyle}>Save Child</Text>
          </Pressable>
        </>
      )}

      <View style={cardStyle}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          📚 Task Library
        </Text>

        <Text
          style={{
            marginTop: 8,
            color: "#666",
          }}
        >
          {taskTemplates.length} Tasks
        </Text>

        <Pressable
          onPress={() => router.push("/task-library")}
          style={{
            marginTop: 12,
          }}
        >
          <Text
            style={{
              color: "#4A7C59",
              fontWeight: "600",
            }}
          >
            Manage →
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const sectionTitleStyle = {
  fontSize: 20,
  fontWeight: "600" as const,
  marginTop: 30,
};

const labelStyle = {
  fontSize: 16,
  fontWeight: "600" as const,
  marginTop: 16,
  marginBottom: 6,
};

const inputStyle = {
  backgroundColor: "#FFFFFF",
  padding: 14,
  borderRadius: 14,
  fontSize: 16,
};

const cardStyle = {
  backgroundColor: "#FFFFFF",
  padding: 16,
  borderRadius: 16,
  marginTop: 12,
};

const primaryButtonStyle = {
  backgroundColor: "#CFE3CF",
  padding: 16,
  borderRadius: 16,
  marginTop: 20,
  alignItems: "center" as const,
};

const secondaryButtonStyle = {
  backgroundColor: "#E8F0E8",
  padding: 14,
  borderRadius: 16,
  marginTop: 20,
  alignItems: "center" as const,
};

const buttonTextStyle = {
  fontSize: 16,
  fontWeight: "700" as const,
};
