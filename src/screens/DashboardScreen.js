import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-svg-charts';

const quotes = [
    "If you are working on something that you really care about, you don't have to be pushed. - Steve Jobs",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
];

const DashboardScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [quote, setQuote] = useState('');

    useEffect(() => {
        loadTasks();
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks !== null) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveTasks = async (newTasks) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
            setTasks(newTasks);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTask = () => {
        if (taskTitle.trim() === '') return;
        const newTask = { id: Date.now().toString(), title: taskTitle, description: taskDesc, completed: false, category: 'Personal', priority: 'Medium' };
        const updatedTasks = [...tasks, newTask];
        saveTasks(updatedTasks);
        setTaskTitle('');
        setTaskDesc('');
        setModalVisible(false);
    };
    
    const toggleTaskCompletion = (id) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks(updatedTasks);
    };

    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = tasks.length - completedTasks;
    const completionPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
    
    const chartData = [
        {
            key: 1,
            amount: completionPercentage,
            svg: { fill: '#4A90E2' },
        },
        {
            key: 2,
            amount: 100 - completionPercentage,
            svg: { fill: '#E8E8E8' }
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Good night! 👋</Text>
                    <Text style={styles.headerSubtitle}>Level 1 - 0 pts</Text>
                </View>

                <View style={styles.progressContainer}>
                     <PieChart style={{ height: 150, width: 150 }} outerRadius={'100%'} innerRadius={'85%'} data={chartData} />
                     <View style={styles.progressTextContainer}>
                        <Text style={styles.progressText}>{`${Math.round(completionPercentage)}%`}</Text>
                     </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{completedTasks}</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{remainingTasks}</Text>
                        <Text style={styles.statLabel}>Remaining</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{tasks.length}</Text>
                        <Text style={styles.statLabel}>Total Tasks</Text>
                    </View>
                </View>

                <View style={styles.quoteContainer}>
                    <Text style={styles.quoteIcon}>💡</Text>
                    <Text style={styles.quoteText}>{quote}</Text>
                </View>

                <View style={styles.tasksHeader}>
                    <Text style={styles.tasksTitle}>Today's Tasks</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons name="add-circle" size={32} color="#4A90E2" />
                    </TouchableOpacity>
                </View>
                
                {tasks.length === 0 ? (
                    <View style={styles.noTasksContainer}>
                        <Text style={styles.noTasksText}>No tasks yet</Text>
                        <Text style={styles.noTasksSubText}>Start your productive day by adding your first task!</Text>
                    </View>
                ) : (
                    tasks.map(task => (
                        <TouchableOpacity key={task.id} style={styles.taskItem} onPress={() => toggleTaskCompletion(task.id)}>
                            <Ionicons name={task.completed ? "checkbox" : "square-outline"} size={24} color={task.completed ? "#4A90E2" : "#ccc"} />
                            <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>{task.title}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

             <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Add New Task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Task Title"
                            value={taskTitle}
                            onChangeText={setTaskTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description (optional)"
                            value={taskDesc}
                            onChangeText={setTaskDesc}
                        />
                        <View style={styles.modalButtons}>
                           <Button title="Cancel" onPress={() => setModalVisible(false)} color="#777" />
                           <Button title="Add Task" onPress={handleAddTask} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

// Add styles here...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'gray',
    },
    progressContainer: {
        alignItems: 'center',
        marginVertical: 20,
        position: 'relative',
    },
    progressTextContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: '30%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    statNumber: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: 'gray',
    },
    quoteContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    quoteIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    quoteText: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
        flex: 1,
    },
    tasksHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    tasksTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    noTasksContainer: {
        alignItems: 'center',
        paddingVertical: 50,
    },
    noTasksText: {
        fontSize: 18,
        color: 'gray',
    },
    noTasksSubText: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 5,
    },
    taskItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskTitle: {
        fontSize: 16,
        marginLeft: 10,
    },
    taskTitleCompleted: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});


export default DashboardScreen;
