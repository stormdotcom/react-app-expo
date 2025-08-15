import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export default function TodoScreen() {
  const insets = useSafeAreaInsets();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const addTodo = useCallback(() => {
    if (inputText.trim().length === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputText.trim(),
      completed: false,
      priority: selectedPriority,
      createdAt: new Date(),
    };

    setTodos([newTodo, ...todos]);
    setInputText('');
    setSelectedPriority('medium');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [inputText, selectedPriority, todos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [todos]);

  const deleteTodo = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTodos(todos.filter((todo) => todo.id !== id));
  }, [todos]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFA726';
      case 'low': return '#66BB6A';
      default: return '#FFA726';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return 'flag';
      case 'medium': return 'flag-outline';
      case 'low': return 'remove';
      default: return 'flag-outline';
    }
  };

  const renderPrioritySelector = () => (
    <View style={styles.priorityContainer}>
      <Text style={styles.priorityLabel}>Priority:</Text>
      {(['low', 'medium', 'high'] as const).map((priority) => (
        <TouchableOpacity
          key={priority}
          style={[
            styles.priorityButton,
            selectedPriority === priority && {
              backgroundColor: getPriorityColor(priority),
              borderColor: getPriorityColor(priority),
            },
          ]}
          onPress={() => setSelectedPriority(priority)}>
          <Ionicons
            name={getPriorityIcon(priority)}
            size={16}
            color={selectedPriority === priority ? 'white' : getPriorityColor(priority)}
          />
          <Text
            style={[
              styles.priorityText,
              selectedPriority === priority && styles.priorityTextSelected,
            ]}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTodoItem = ({ item, index }: { item: TodoItem; index: number }) => (
    <Animated.View
      style={[
        styles.todoItem,
        { transform: [{ scale: 1 }] },
      ]}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item.id)}
        activeOpacity={0.7}>
        <View style={styles.checkboxContainer}>
          <Ionicons
            name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={28}
            color={item.completed ? '#4CAF50' : '#666'}
          />
          <View style={styles.priorityIndicator}>
            <Ionicons
              name={getPriorityIcon(item.priority)}
              size={12}
              color={getPriorityColor(item.priority)}
            />
          </View>
        </View>
        <View style={styles.todoTextContainer}>
          <Text
            style={[
              styles.todoText,
              item.completed && styles.completedTodoText,
            ]}>
            {item.text}
          </Text>
          <Text style={styles.todoDate}>
            {item.createdAt.toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
        activeOpacity={0.7}>
        <Ionicons name="trash-outline" size={22} color="#FF6B6B" />
      </TouchableOpacity>
    </Animated.View>
  );

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>My Tasks</Text>
        {totalCount > 0 && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              {completedCount} of {totalCount} completed
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` },
                ]}
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Add a new task..."
            placeholderTextColor="#999"
            onSubmitEditing={addTodo}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={addTodo}
            activeOpacity={0.8}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {renderPrioritySelector()}
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        style={styles.todoList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.todoListContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle-outline" size={64} color="#DDD" />
            <Text style={styles.emptyStateText}>No tasks yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first task to get started
            </Text>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  statsContainer: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButton: {
    width: 56,
    height: 56,
    backgroundColor: '#007AFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  priorityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  priorityTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  todoList: {
    flex: 1,
  },
  todoListContent: {
    padding: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    position: 'relative',
    marginRight: 16,
  },
  priorityIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 2,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 22,
    marginBottom: 4,
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  todoDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#BBB',
    textAlign: 'center',
  },
});
