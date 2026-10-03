export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  isPaid: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}