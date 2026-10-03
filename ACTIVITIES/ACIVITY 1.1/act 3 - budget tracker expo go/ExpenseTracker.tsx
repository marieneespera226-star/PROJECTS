import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Expense, UserProfile } from './types';

// Pre-loaded initial items
const INITIAL_EXPENSES: Expense[] = [
  { id: '1', title: 'Groceries', amount: 1500, category: 'Food', isPaid: true },
  { id: '2', title: 'Electric Bill', amount: 2400, category: 'Utilities', isPaid: false },
  { id: '3', title: 'Gym Pass', amount: 500, category: 'Health', isPaid: true },
];

export const ExpenseTracker: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'tracker' | 'profile'>('tracker');

  // Budget & Expense States
  const [cashInBudget, setCashInBudget] = useState<number>(10000); // Default Cash In
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  // Cash In Modal States
  const [isCashInModalVisible, setCashInModalVisible] = useState<boolean>(false);
  const [newCashInInput, setNewCashInInput] = useState<string>('');

  // Profile States
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@example.com',
  });
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(profile.name);

  // --- HANDLERS FOR EXPENSES ---
  const handleAddExpense = () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter an expense title.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parsedAmount,
      category: 'General',
      isPaid: false,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setTitle('');
    setAmount('');
  };

  const handleTogglePaid = (id: string) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPaid: !item.isPaid } : item
      )
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  // --- HANDLERS FOR CASH IN / BUDGET ---
  const handleSaveCashIn = () => {
    const parsed = parseFloat(newCashInInput);
    if (isNaN(parsed) || parsed < 0) {
      Alert.alert('Invalid Cash In', 'Please enter a valid number.');
      return;
    }
    setCashInBudget(parsed);
    setCashInModalVisible(false);
    setNewCashInInput('');
  };

  // --- HANDLERS FOR PROFILE ---
  const handleSaveProfile = () => {
    if (!editName.trim()) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }
    setProfile((prev) => ({ ...prev, name: editName.trim() }));
    setIsEditingProfile(false);
  };

  // Calculations
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = expenses
    .filter((item) => item.isPaid)
    .reduce((sum, item) => sum + item.amount, 0);
  const remainingBalance = cashInBudget - totalPaid;

  // Render FlatList Expense Item
  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View style={[styles.card, item.isPaid && styles.cardPaid]}>
      <TouchableOpacity
        style={styles.cardMainInfo}
        onPress={() => handleTogglePaid(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, item.isPaid && styles.checkboxActive]}>
          {item.isPaid && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.itemTitle, item.isPaid && styles.textCompleted]}>
            {item.title}
          </Text>
          <Text style={styles.itemCategory}>
            {item.category} • {item.isPaid ? 'Paid' : 'Pending'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.cardRight}>
        <Text style={[styles.itemAmount, item.isPaid && styles.textCompleted]}>
          ₱{item.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
        </Text>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDeleteExpense(item.id)}
          activeOpacity={0.6}
        >
          <Text style={styles.deleteBtnText}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {activeTab === 'tracker' ? (
          /* ================= BUDGET TRACKER TAB ================= */
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerTopRow}>
                <View>
                  <Text style={styles.headerSubtitle}>ACTIVITY 3</Text>
                  <Text style={styles.headerTitle}>Budget Tracker</Text>
                </View>
                <TouchableOpacity
                  style={styles.cashInBtn}
                  onPress={() => setCashInModalVisible(true)}
                >
                  <Text style={styles.cashInBtnText}>+ Cash In</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.summaryContainer}>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryLabel}>TOTAL CASH IN</Text>
                  <Text style={styles.summaryValue}>
                    ₱{cashInBudget.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryLabel}>REMAINING</Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      { color: remainingBalance < 0 ? '#F87171' : '#34D399' },
                    ]}
                  >
                    ₱{remainingBalance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </Text>
                </View>
              </View>
            </View>

            {/* Input Form */}
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Add New Expense</Text>
              
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, { flex: 2 }]}
                  placeholder="Title (e.g. Jeep Fare)"
                  placeholderTextColor="#64748B"
                  value={title}
                  onChangeText={setTitle}
                />
                <TextInput
                  style={[styles.input, { flex: 1, marginLeft: 8 }]}
                  placeholder="Amount (₱)"
                  placeholderTextColor="#64748B"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>

              <TouchableOpacity
                style={styles.addBtn}
                onPress={handleAddExpense}
                activeOpacity={0.8}
              >
                <Text style={styles.addBtnText}>+ Add Expense</Text>
              </TouchableOpacity>
            </View>

            {/* Dynamic FlatList */}
            <View style={styles.listContainer}>
              <Text style={styles.sectionHeader}>
                RECENT EXPENSES ({expenses.length})
              </Text>

              <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={renderExpenseItem}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>No expenses recorded yet.</Text>
                  </View>
                }
              />
            </View>
          </View>
        ) : (
          /* ================= PROFILE PAGE TAB ================= */
          <ScrollView contentContainerStyle={styles.profileContainer}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>
                  {profile.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileEmail}>{profile.email}</Text>
            </View>

            {/* Profile Statistics Card */}
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Overview</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{expenses.length}</Text>
                  <Text style={styles.statLabel}>Total Items</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    ₱{totalExpenses.toLocaleString('en-PH')}
                  </Text>
                  <Text style={styles.statLabel}>Total Cost</Text>
                </View>
              </View>
            </View>

            {/* Edit Profile Form */}
            <View style={styles.editProfileCard}>
              <Text style={styles.editProfileTitle}>Edit Profile Settings</Text>
              {isEditingProfile ? (
                <View>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    value={editName}
                    onChangeText={setEditName}
                    placeholderTextColor="#64748B"
                  />
                  <TouchableOpacity
                    style={[styles.addBtn, { marginTop: 12 }]}
                    onPress={handleSaveProfile}
                  >
                    <Text style={styles.addBtnText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => setIsEditingProfile(true)}
                >
                  <Text style={styles.editBtnText}>✏️ Edit Name</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>

      {/* CASH IN MODAL POPUP */}
      <Modal
        visible={isCashInModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCashInModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cash In / Set Budget</Text>
            <Text style={styles.modalSubtitle}>
              Enter your total available cash budget in Pesos (₱):
            </Text>

            <TextInput
              style={[styles.input, { marginTop: 14 }]}
              placeholder="e.g. 5000"
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              value={newCashInInput}
              onChangeText={setNewCashInInput}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setCashInModalVisible(false)}
              >
                <Text style={styles.modalCancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleSaveCashIn}
              >
                <Text style={styles.modalSaveBtnText}>Save Budget</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navTab}
          onPress={() => setActiveTab('tracker')}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === 'tracker' && styles.navTabTextActive,
            ]}
          >
            📊 Budget
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navTab}
          onPress={() => setActiveTab('profile')}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === 'profile' && styles.navTabTextActive,
            ]}
          >
            👤 Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ExpenseTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 20,
    backgroundColor: '#1E293B',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubtitle: {
    color: '#6366F1',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 2,
  },
  cashInBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cashInBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  summaryBox: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#334155',
  },
  summaryLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  summaryValue: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  formTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionHeader: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardPaid: {
    opacity: 0.6,
  },
  cardMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6366F1',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#6366F1',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '600',
  },
  itemCategory: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAmount: {
    color: '#38BDF8',
    fontWeight: '700',
    fontSize: 14,
    marginRight: 10,
  },
  deleteBtn: {
    padding: 6,
  },
  deleteBtnText: {
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    color: '#64748B',
    fontSize: 14,
  },
  // Profile Screen Styles
  profileContainer: {
    padding: 20,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
  },
  profileEmail: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 2,
  },
  statsCard: {
    backgroundColor: '#1E293B',
    width: '100%',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statsTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#38BDF8',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  editProfileCard: {
    backgroundColor: '#1E293B',
    width: '100%',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  editProfileTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  inputLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 6,
  },
  editBtn: {
    backgroundColor: '#334155',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editBtnText: {
    color: '#F8FAFC',
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  modalSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 6,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  modalCancelBtnText: {
    color: '#94A3B8',
    fontWeight: '600',
  },
  modalSaveBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalSaveBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingVertical: 12,
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
  },
  navTabText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  navTabTextActive: {
    color: '#6366F1',
    fontWeight: '800',
  },
});