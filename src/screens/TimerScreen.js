import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TimerScreen = () => {
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(time => time - 1);
            }, 1000);
        } else if (!isActive || time === 0) {
            clearInterval(interval);
            if (time === 0) setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.header}>
                <Text style={styles.headerTitle}>Focus Time</Text>
            </View>
            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime()}</Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={() => setIsActive(!isActive)}>
                    <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.button} onPress={() => { setTime(25 * 60); setIsActive(false); }}>
                    <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8FA', alignItems: 'center' },
    header: { padding: 20, alignSelf: 'stretch', backgroundColor: 'white' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
    timerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    timerText: { fontSize: 80, fontWeight: 'bold' },
    controls: { flexDirection: 'row', marginBottom: 50 },
    button: { backgroundColor: '#4A90E2', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10, marginHorizontal: 10 },
    buttonText: { color: 'white', fontSize: 18 },
});

export default TimerScreen;
