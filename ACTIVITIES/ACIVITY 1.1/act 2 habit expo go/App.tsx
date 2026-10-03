import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Alert,
  SafeAreaView
} from 'react-native';
import { HabitItem, ProgressHero, DateStrip } from './HabitComponents';
import { Habit, Category } from './types';
import { theme } from './theme';

const INITIAL_HABITS: Habit[] = [
  { id: '1', title: 'Morning Meditate', emoji: '🧘', streak: 12, completedDays: { '2026-09-27': true }, target: '10 mins', category: 'Mindfulness' },
  { id: '2', title: 'Read 20 Pages', emoji: '📚', streak: 5, completedDays: { '2026-09-27': true }, target: '20 pages', category: 'Learning' },
  { id: '3', title: 'Hydrate (2L Water)', emoji: '💧', streak: 18, completedDays: { '2026-09-27': false }, target: '2000 ml', category: 'Health' },
  { id: '4', title: 'Evening Walk', emoji: '🚶‍♂️', streak: 3, completedDays: { '2026-09-27': false }, target: '30 mins', category: 'Fitness' },
  { id: '5', title: 'Code Workout', emoji: '💻', streak: 8, completedDays: { '2026-09-27': true }, target: '45 mins', category: 'Productivity' }
];

export const HabitScreen: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('15 mins');
  const [newEmoji, setNewEmoji] = useState('⚡');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Health');

  const todayKey = '2026-09-27';

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const isDone = !h.completedDays[todayKey];
        return {
          ...h,
          streak: isDone ? h.streak + 1 : Math.max(0, h.streak - 1),
          completedDays: { ...h.completedDays, [todayKey]: isDone }
        };
      }
      return h;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const handleAddHabit = () => {
    if (!newTitle.trim()) {
      Alert.alert('Validation Error', 'Please enter a habit title.');
      return;
    }
    const newHabit: Habit = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      emoji: newEmoji,
      streak: 0,
      completedDays: { [todayKey]: false },
      target: newTarget || 'Daily',
      category: selectedCategory
    };
    setHabits(prev => [newHabit, ...prev]);
    setNewTitle('');
    setModalVisible(false);
  };

  const completedCount = habits.filter(h => h.completedDays[todayKey]).length;
  const progressPct = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.dateLabel}>Sunday, Sep 27</Text>
            <Text style={styles.headerTitle}>Daily Habits</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <DateStrip />
        <ProgressHero 
          percentage={progressPct} 
          completed={completedCount} 
          total={habits.length} 
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TODAY'S HABITS</Text>
          <Text style={styles.sectionBadge}>{habits.length} ACTIVE</Text>
        </View>

        {habits.map(habit => (
          <HabitItem 
            key={habit.id} 
            habit={habit} 
            isCompleted={!!habit.completedDays[todayKey]} 
            onToggle={toggleHabit} 
            onDelete={deleteHabit} 
          />
        ))}
      </ScrollView>

      {/* Add Habit Modal Sheet */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Daily Habit</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>HABIT TITLE</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g., Read 20 pages" 
              placeholderTextColor="#64748B"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={styles.inputLabel}>TARGET DURATION / GOAL</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g., 15 mins" 
              placeholderTextColor="#64748B"
              value={newTarget}
              onChangeText={setNewTarget}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleAddHabit}>
              <Text style={styles.submitBtnText}>Create Habit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// THIS WAS MISSING:
export default HabitScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.backgroundDark },
  scrollContent: { padding: theme.spacing.md, paddingBottom: 40 },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: theme.spacing.md,
    marginTop: 10
  },
  dateLabel: { fontSize: 12, color: theme.colors.textSecondaryDark, fontWeight: '600' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: theme.colors.textDark },
  addButton: {
    width: 38,
    height: 38,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: -2 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm 
  },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: theme.colors.textSecondaryDark, letterSpacing: 1 },
  sectionBadge: { fontSize: 10, fontWeight: '700', color: theme.colors.primary },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { 
    backgroundColor: theme.colors.surfaceDark, 
    borderTopLeftRadius: theme.borderRadius.lg, 
    borderTopRightRadius: theme.borderRadius.lg, 
    padding: theme.spacing.lg 
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.textDark },
  closeText: { fontSize: 18, color: theme.colors.textSecondaryDark },
  inputLabel: { fontSize: 10, fontWeight: '800', color: theme.colors.textSecondaryDark, marginBottom: 6 },
  input: {
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.sm,
    padding: 12,
    color: theme.colors.textDark,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderDark
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: 14,
    alignItems: 'center',
    marginTop: 8
  },
  submitBtnText: { color: '#FFF', fontWeight: '800', fontSize: 14 }
});