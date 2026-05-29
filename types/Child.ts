export interface Child {
  id?: string;

  name: string;

  // Number of tasks required each day
  dailyGoal: number;

  // Reward description
  reward: string;

  // Reward cycle length in days
  rewardCycleDays: number;

  createdAt: Date;
}