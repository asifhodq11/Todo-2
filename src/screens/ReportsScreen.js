import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReportsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Performance Reports</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.placeholderText}>No data to display yet.</Text>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F7F8FA' }, header: { padding: 20, backgroundColor: 'white' }, headerTitle: { fontSize: 22, fontWeight: 'bold' }, content: { flex: 1, justifyContent: 'center', alignItems: 'center' }, placeholderText: { fontSize: 18, color: 'gray' } });
export default ReportsScreen;
