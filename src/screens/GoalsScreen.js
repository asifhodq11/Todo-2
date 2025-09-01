import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GoalsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Goals & Milestones</Text>
            </View>
             <View style={styles.content}>
                <Text style={styles.placeholderIcon}>🎯</Text>
                <Text style={styles.placeholderText}>No goals yet</Text>
                <Text style={styles.placeholderSubText}>Set your first goal and start achieving your dreams!</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8FA' },
    header: { padding: 20, backgroundColor: 'white' },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    placeholderIcon: { fontSize: 50, marginBottom: 10 },
    placeholderText: { fontSize: 18, color: 'gray' },
    placeholderSubText: { fontSize: 14, color: '#aaa', marginTop: 5 },
});

export default GoalsScreen;
