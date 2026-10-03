export type Category = 'Health' | 'Mindfulness' | 'Fitness' | 'Learning' | 'Productivity';
export interface Habit {
  id: string;
  title: string;
  emoji: string;
  streak: number;
  completedDays: Record<string, boolean>;
  target: string;
  category: Category;
}
export type TabType = 'today' | 'stats' | 'settings';
export interface UserStats {
  bestStreak: number;
  totalCompleted: number;
  completionRate: number;
}