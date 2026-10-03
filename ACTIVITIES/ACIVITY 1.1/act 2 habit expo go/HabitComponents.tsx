import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Habit } from './types';
import { theme } from './theme';
interface HabitItemProps {
  habit: Habit;
  isCompleted: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
export const HabitItem: React.FC<HabitItemProps> = ({ habit, isCompleted, onToggle }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, isCompleted && styles.cardCompleted]} 
      onPress={() => onToggle(habit.id)}
      activeOpacity={0.8}
    >
      <View style={styles.leftSection}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{habit.emoji}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, isCompleted && styles.titleCompleted]}>
            {habit.title}
          </Text>
          <Text style={styles.subtitle}>{habit.target} • {habit.category}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 {habit.streak}</Text>
        </View>
        <View style={[styles.checkbox, isCompleted && styles.checkboxActive]}>
          <Text style={styles.checkmark}>{isCompleted ? '✓' : ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const ProgressHero: React.FC<{ percentage: number; completed: number; total: number }> = ({
  percentage,
  completed,
  total
}) => {
  return (
    <View style={styles.heroCard}>
      <Text style={styles.heroTag}>DAILY PROGRESS</Text>
      <Text style={styles.heroTitle}>{percentage}% Completed</Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.heroSub}>{completed} of {total} daily goals achieved</Text>
    </View>
  );
};
export const DateStrip: React.FC = () => {
  const days = [
    { day: 'MON', date: '21' },
    { day: 'TUE', date: '22' },
    { day: 'WED', date: '23' },
    { day: 'THU', date: '24' },
    { day: 'FRI', date: '25' },
    { day: 'SAT', date: '26' },
    { day: 'SUN', date: '27', active: true },
  ];
  return (
    <View style={styles.stripContainer}>
      {days.map((item, index) => (
        <View key={index} style={[styles.stripItem, item.active && styles.stripItemActive]}>
          <Text style={[styles.stripDay, item.active && styles.stripDayActive]}>{item.day}</Text>
          <Text style={[styles.stripDate, item.active && styles.stripDateActive]}>{item.date}</Text>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderDark
  },
  cardCompleted: {
    borderColor: 'rgba(99, 102, 241, 0.4)',
    backgroundColor: 'rgba(99, 102, 241, 0.08)'
  },
  leftSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  emojiContainer: {
    width: 42,
    height: 42,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  emoji: { fontSize: 20 },
  textContainer: { flex: 1 },
  title: { fontSize: 14, fontWeight: '700', color: theme.colors.textDark },
  titleCompleted: { textDecorationLine: 'line-through', opacity: 0.5 },
  subtitle: { fontSize: 11, color: theme.colors.textSecondaryDark, marginTop: 2 },
  rightSection: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  streakBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: theme.borderRadius.full
  },
  streakText: { fontSize: 11, fontWeight: '700', color: '#F59E0B' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.borderDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  checkmark: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  heroCard: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderDark
  },
  heroTag: { fontSize: 10, fontWeight: '800', color: theme.colors.primary, letterSpacing: 1 },
  heroTitle: { fontSize: 20, fontWeight: '800', color: theme.colors.textDark, marginVertical: 4 },
  barBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: theme.colors.primary, borderRadius: 4 },
  heroSub: { fontSize: 11, color: theme.colors.textSecondaryDark, marginTop: 6 },
  stripContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 6, marginBottom: theme.spacing.md },
  stripItem: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center'
  },
  stripItemActive: { backgroundColor: theme.colors.primary },
  stripDay: { fontSize: 8, fontWeight: '800', color: theme.colors.textSecondaryDark },
  stripDayActive: { color: '#FFF' },
  stripDate: { fontSize: 12, fontWeight: '700', color: theme.colors.textDark, marginTop: 2 },
  stripDateActive: { color: '#FFF' }
  });