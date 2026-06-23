import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const COLORS = {
  bg: '#020810',
  cyan: '#00d4ff',
  cyanDim: '#0088cc',
  green: '#00ff88',
  text: '#b8e8f8',
  card: '#0a1628',
  border: '#1a3a5c',
};

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Review suit diagnostics', done: false },
    { id: '2', text: 'Calibrate arc reactor', done: true },
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      { id: Date.now().toString(), text: trimmed, done: false },
      ...prev,
    ]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={styles.header}>
        <Text style={styles.logo}>J.A.R.V.I.S.</Text>
        <Text style={styles.subtitle}>STARK OS — MOBILE</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{tasks.length}</Text>
          <Text style={styles.statLabel}>TASKS</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: COLORS.green }]}>
            {doneCount}
          </Text>
          <Text style={styles.statLabel}>COMPLETE</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {tasks.length > 0
              ? Math.round((doneCount / tasks.length) * 100)
              : 0}
            %
          </Text>
          <Text style={styles.statLabel}>STATUS</Text>
        </View>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter directive, sir..."
          placeholderTextColor={COLORS.cyanDim}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No directives pending, sir.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskCard, item.done && styles.taskDone]}
            onPress={() => toggleTask(item.id)}
            onLongPress={() => removeTask(item.id)}
          >
            <View
              style={[
                styles.checkbox,
                item.done && styles.checkboxDone,
              ]}
            >
              {item.done && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text
              style={[styles.taskText, item.done && styles.taskTextDone]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.footer}>Tap to complete · Long press to remove</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.cyan,
    letterSpacing: 6,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.cyanDim,
    letterSpacing: 3,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.cyan,
  },
  statLabel: {
    fontSize: 9,
    color: COLORS.cyanDim,
    letterSpacing: 2,
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.text,
    fontSize: 15,
  },
  addBtn: {
    backgroundColor: COLORS.cyan,
    borderRadius: 8,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.bg,
  },
  list: {
    padding: 16,
    paddingTop: 8,
    gap: 8,
  },
  empty: {
    color: COLORS.cyanDim,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  taskDone: {
    borderColor: COLORS.green,
    opacity: 0.7,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: COLORS.cyan,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  checkmark: {
    color: COLORS.bg,
    fontSize: 14,
    fontWeight: '700',
  },
  taskText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
  },
  taskTextDone: {
    color: COLORS.green,
    textDecorationLine: 'line-through',
  },
  footer: {
    textAlign: 'center',
    color: COLORS.cyanDim,
    fontSize: 11,
    paddingBottom: 16,
    letterSpacing: 1,
  },
});
