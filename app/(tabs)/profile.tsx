import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import { createChild } from "@/services/childService";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [dailyGoal, setDailyGoal] = useState("5");
  const [reward, setReward] = useState("$5");
  const [rewardCycleDays, setRewardCycleDays] = useState("7");

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

    setName("");
    setDailyGoal("5");
    setReward("$5");
    setRewardCycleDays("7");
  };

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: "#F8FAF8" }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginTop: 60 }}>
        Profile
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 30 }}>
        Add Child
      </Text>

      <TextInput
        placeholder="Child name"
        value={name}
        onChangeText={setName}
        style={inputStyle}
      />

      <TextInput
        placeholder="Daily goal"
        value={dailyGoal}
        onChangeText={setDailyGoal}
        keyboardType="number-pad"
        style={inputStyle}
      />

      <TextInput
        placeholder="Reward"
        value={reward}
        onChangeText={setReward}
        style={inputStyle}
      />

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
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Save Child</Text>
      </Pressable>
    </View>
  );
}

const inputStyle = {
  backgroundColor: "#FFFFFF",
  padding: 14,
  borderRadius: 14,
  fontSize: 16,
  marginTop: 14,
};
