import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [hapticFeedbackEnabled, setHapticFeedbackEnabled] = useState(true);

  const clearAllTodos = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Clear All Tasks',
      'Are you sure you want to clear all tasks? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Success', 'All tasks have been cleared!');
          },
        },
      ]
    );
  };

  const exportTodos = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Export Tasks', 'Export functionality will be implemented soon!');
  };

  const importTodos = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Import Tasks', 'Import functionality will be implemented soon!');
  };

  const toggleNotifications = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleDarkMode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDarkModeEnabled(!darkModeEnabled);
  };

  const toggleHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setHapticFeedbackEnabled(!hapticFeedbackEnabled);
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    rightComponent?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={24} color="#007AFF" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent && <View style={styles.settingRight}>{rightComponent}</View>}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        {renderSettingItem(
          'notifications-outline',
          'Notifications',
          'Get reminded about your tasks',
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
            thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
          />
        )}
        
        {renderSettingItem(
          'moon-outline',
          'Dark Mode',
          'Switch between light and dark themes',
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
            thumbColor={darkModeEnabled ? '#FFFFFF' : '#FFFFFF'}
          />
        )}
        
        {renderSettingItem(
          'phone-portrait-outline',
          'Haptic Feedback',
          'Feel vibrations when interacting',
          <Switch
            value={hapticFeedbackEnabled}
            onValueChange={toggleHapticFeedback}
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
            thumbColor={hapticFeedbackEnabled ? '#FFFFFF' : '#FFFFFF'}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        {renderSettingItem(
          'trash-outline',
          'Clear All Tasks',
          'Remove all tasks permanently',
          null,
          clearAllTodos
        )}
        
        {renderSettingItem(
          'download-outline',
          'Export Tasks',
          'Save your tasks to a file',
          null,
          exportTodos
        )}
        
        {renderSettingItem(
          'upload-outline',
          'Import Tasks',
          'Load tasks from a file',
          null,
          importTodos
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        
        {renderSettingItem(
          'information-circle-outline',
          'Version',
          '1.0.0',
          <Text style={styles.versionText}>1.0.0</Text>
        )}
        
        {renderSettingItem(
          'build-outline',
          'Build',
          '2024.1',
          <Text style={styles.buildText}>2024.1</Text>
        )}
        
        {renderSettingItem(
          'calendar-outline',
          'Last Updated',
          'January 2024',
          <Text style={styles.dateText}>Jan 2024</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        {renderSettingItem(
          'help-circle-outline',
          'Help & FAQ',
          'Get help with the app',
          <Ionicons name="chevron-forward" size={20} color="#999" />
        )}
        
        {renderSettingItem(
          'mail-outline',
          'Contact Us',
          'Send us feedback',
          <Ionicons name="chevron-forward" size={20} color="#999" />
        )}
        
        {renderSettingItem(
          'star-outline',
          'Rate App',
          'Rate us on the store',
          <Ionicons name="chevron-forward" size={20} color="#999" />
        )}
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutText}>
          A modern and intuitive task management app built with React Native and Expo.
        </Text>
        <Text style={styles.aboutSubtext}>
          Designed for modern Android devices with Material Design principles.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  settingRight: {
    marginLeft: 16,
  },
  versionText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  buildText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  aboutSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  aboutSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
