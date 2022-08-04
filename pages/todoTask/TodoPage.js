import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, View, Text, SafeAreaView, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Task from './AddTask';

//screen that displays all the tasks
//creates the task fomr ./AddTask import 

const TodoScreen = ({ navigation }) => {
    const[task, setTask] = useState();
    const[tasks, setTasks] = useState([]);

    const completeTask = (index) =>{
        let itemsCopy = [...tasks];
        itemsCopy.splice(index, 1);
        setTasks(itemsCopy);
    }

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTasks([...tasks, task]);
        setTask(null);
    }
    
    return(
        <View style = {styles.container}>

            <View style={styles.taskContainer}>
                <View style={styles.task}>
                    {
                        tasks.map((item, index) => {
                            return(
                                <TouchableOpacity key={index} onPress={() =>completeTask(index)}>
                                    <Task text={item} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inputContainer}>

                    <TextInput style={styles.input} placeholder={'What to do today'} maxLength={20} value={task} onChangeText= {text => setTask(text)}/>

                    <TouchableOpacity onPress={() => handleAddTask()}>
                        <View style={styles.addContainer}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e4e6f7',
    },
    taskContainer:{
      paddingTop: 10,
      paddingHorizontal: 20,
    },
    task:{
      marginTop: 30,
    },
    inputContainer: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      flexDirection: 'row', 
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 10,  
      backgroundColor: '#fcfcfe',
      borderRadius: 40,
      borderColor: '#3b43c4',
      borderWidth: 1,
      width: 290, 
    },
    addContainer:{
      width: 60,
      height: 60, 
      backgroundColor: '#FFF',
      borderRadius: 40, 
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#3b43c4',
      borderWidth: 1,
    },
    
  });

export default TodoScreen;