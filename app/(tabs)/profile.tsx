import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { createChild, getChildren } from "@/services/childService";
import { createTaskTemplate } from "@/services/taskTemplateService";
import { Child } from "@/types/Child";

export default function ProfileScreen() {
  // Child form state
  const [name, setName] = useState("");
  const [dailyGoal, setDailyGoal] = useState("5");
  const [reward, setReward] = useState("$5");
  const [rewardCycleDays, setRewardCycleDays] = useState("7");
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  // Long-term task form state
  const [taskTitle, setTaskTitle] = useState("");

  // Children list state
  const [children, setChildren] = useState<Child[]>([]);
  const [showAddChildForm, setShowAddChildForm] = useState(false);

  // Load all children from Firestore
  const loadChildren = async () => {
    const childrenData = await getChildren();
    const typedChildren = childrenData as Child[];

    setChildren(typedChildren);

    if (typedChildren.length > 0 && !selectedChild) {
      setSelectedChild(typedChildren[0]);
    }
  };

  // Load children when Profile screen opens
  useEffect(() => {
    loadChildren();
  }, []);

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

    // Refresh children list after saving
    await loadChildren();

    // Hide form and reset fields
    setShowAddChildForm(false);
    setName("");
    setDailyGoal("5");
    setReward("$5");
    setRewardCycleDays("7");
  };

  // Create a long-term task template
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

    Alert.alert("Task template created");
    setTaskTitle("");
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
      <Text style={{ fontSize: 28, fontWeight: "700", marginTop: 60 }}>
        Profile
      </Text>

      {/* Children list */}
      <Text style={sectionTitleStyle}>Children</Text>

      {children.map((child) => (
        <View key={child.id} style={cardStyle}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>{child.name}</Text>
          <Text>Goal: {child.dailyGoal} tasks/day</Text>
          <Text>Reward: {child.reward}</Text>
          <Text>Cycle: {child.rewardCycleDays} days</Text>
        </View>
      ))}

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

      {/* Long-term task library */}
      <Text style={sectionTitleStyle}>Long-term Task Library</Text>
      <Text style={labelStyle}>Select Child</Text>

      <View style={cardStyle}>
        {children.map((child) => (
          <Pressable
            key={child.id}
            onPress={() => setSelectedChild(child)}
            style={{
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: selectedChild?.id === child.id ? "700" : "400",
              }}
            >
              {selectedChild?.id === child.id ? "✅ " : ""}
              {child.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={labelStyle}>Task Name</Text>
      <TextInput
        placeholder="e.g. IXL Math, Reading A-Z, Piano"
        value={taskTitle}
        onChangeText={setTaskTitle}
        style={inputStyle}
      />

      <Pressable onPress={handleCreateTaskTemplate} style={primaryButtonStyle}>
        <Text style={buttonTextStyle}>Save Task</Text>
      </Pressable>
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
