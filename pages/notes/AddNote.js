import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState} from 'react';
import {View,Text, StyleSheet, Modal, StatusBar, Keyboard, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView} from 'react-native';



//add note page, input title and desc

const AddNoteScreen = ({ visible, onClose, onSubmit, note, isEdit }) =>{
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        if(isEdit){
            setTitle(note.title);
            setDesc(note.desc);
        }
    }, [isEdit]);

    const handleChangeText = (text, valueFor) => {
        if(valueFor === 'title') 
            setTitle(text);
        if(valueFor === 'desc') 
            setDesc(text);
    };

    const handleSubmit = () => {
        if(!title.trim() && !desc.trim()) 
            return onClose();
        
        if(isEdit){
            onSubmit(title, desc, Date.now());
        }else{
        onSubmit(title, desc);
        setTitle('');
        setDesc('');
        }
        onClose();
    }

    const closeModal = () => {
        if(!isEdit){
            setTitle('');
            setDesc('');
        }
        onClose();
    }

   
    
    return(
        <>
        
        <Modal visible={visible} animationType='fade'>
            <ScrollView style={styles.container}>
            <TextInput value={title} onChangeText={(text) => handleChangeText(text, 'title')} style={styles.title} placeholder={'Your Note Title'} maxLength={20} />
            <TextInput value={desc} onChangeText={(text) => handleChangeText(text, 'desc')}  style={styles.input} placeholder={'Write the details here!'} multiline  />
            
             
            <View style={styles.buttonContainer}>
            {title.trim() || desc.trim() ? (
            <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.addContainer}>
                            <Text>Add</Text>
                        </View>
            </TouchableOpacity>
            ) : null}
            
                <TouchableOpacity onPress={closeModal} >
                            <View style={styles.cancelContainer}>
                                <Text>Cancel</Text>
                            </View>
                </TouchableOpacity>
            
            </View>
            </ScrollView>
            <TouchableWithoutFeedback>
                <View style={[styles.modalBackground, StyleSheet.absoluteFillObject]}/>
            </TouchableWithoutFeedback>
        </Modal>
        </>
    );

};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e4e6f7',
    },
    modalBackground:{
        flex: 1,
        zIndex: -1,
    },

    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        
    },
    inputContainer: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      flexDirection: 'row', 
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    title: {
      paddingVertical: 15,
      paddingHorizontal: 15,  
      backgroundColor: '#fcfcfe',
      borderRadius: 60,
      borderColor: '#3b43c4',
      borderWidth: 1,
      width: '95%', 
      margin: 10,
      fontSize: 30,

    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,  
      backgroundColor: '#fcfcfe',
      borderRadius: 60,
      borderColor: '#3b43c4',
      borderWidth: 1,
      width: '95%', 
      margin: 10,
    },
    addContainer:{
      width: 60,
      height: 60, 
      backgroundColor: '#FFF',
      borderRadius: 60, 
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#3b43c4',
      borderWidth: 1,
    },
    cancelContainer:{
      width: 60,
      height: 60, 
      backgroundColor: '#ED2321',
      borderRadius: 60, 
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#3b43c4',
      borderWidth: 1,
    }
    
  });
export default AddNoteScreen;