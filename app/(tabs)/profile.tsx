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
  const [name, setName] = useState("");
  const [dailyGoal, setDailyGoal] = useState("5");
  const [reward, setReward] = useState("$5");
  const [rewardCycleDays, setRewardCycleDays] = useState("7");
  const [taskTitle, setTaskTitle] = useState("");
  const [children, setChildren] = useState<Child[]>([]);
  const [showAddChildForm, setShowAddChildForm] = useState(false);

  const loadChildren = async () => {
    const childrenData = await getChildren();
    setChildren(childrenData as Child[]);
  };

  useEffect(() => {
    loadChildren();
  }, []);

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

  const handleCreateTaskTemplate = async () => {
    if (!taskTitle.trim()) {
      Alert.alert("Please enter task name");
      return;
    }

    await createTaskTemplate({
      childId: "TEMP_CHILD_ID",
      title: taskTitle.trim(),
      createdAt: new Date(),
    });

    Alert.alert("Task template created");
    setTaskTitle("");
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F8FAF8" }}
      contentContainerStyle={{
        padding: 24,
        paddingBottom: 80,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "700", marginTop: 60 }}>
        Profile
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 30 }}>
        Children
      </Text>

      {children.map((child) => (
        <View
          key={child.id}
          style={{
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 16,
            marginTop: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700" }}>{child.name}</Text>
          <Text>Goal: {child.dailyGoal} tasks/day</Text>
          <Text>Reward: {child.reward}</Text>
          <Text>Cycle: {child.rewardCycleDays} days</Text>
        </View>
      ))}

      <Pressable
        onPress={() => setShowAddChildForm(!showAddChildForm)}
        style={{
          backgroundColor: "#E8F0E8",
          padding: 14,
          borderRadius: 16,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700" }}>+ Add Child</Text>
      </Pressable>

      {showAddChildForm && (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginTop: 30,
            }}
          >
            Add Child
          </Text>
          <Text style={labelStyle}>Child Name</Text>
          <TextInput
            placeholder="Child name"
            value={name}
            onChangeText={setName}
            style={inputStyle}
          />
          <Text style={labelStyle}>Daily Goal (tasks per day)</Text>
          <TextInput
            placeholder="Daily goal"
            value={dailyGoal}
            onChangeText={setDailyGoal}
            keyboardType="number-pad"
            style={inputStyle}
          />
          <Text style={labelStyle}>Reward</Text>
          <TextInput
            placeholder="Reward"
            value={reward}
            onChangeText={setReward}
            style={inputStyle}
          />
          <Text style={labelStyle}>Reward Cycle (days)</Text>
          <TextInput
            placeholder="Reward cycle days"
            value={rewardCycleDays}
            onChangeText={setRewardCycleDays}
            keyboardType="number-pad"
            style={inputStyle}
          />

          <Pressable
            onPress={handleCreateChild}
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
              Save Child
            </Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}
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
  marginTop: 14,
};
