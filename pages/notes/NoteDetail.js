import { View, Text, StyleSheet, ScrollView, TouchableOpacity,  Alert, } from 'react-native'
import React, {useState} from 'react'
import {useHeaderHeight} from '@react-navigation/elements'
import AddNoteScreen from './AddNote';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/NoteProvider';

//note pressed, show this screen showing contents of note
const NoteDetail = (props) => {
   
   const [note, setNote] = useState(props.route.params.note)
   const headerHeight = useHeaderHeight();
   const {setNotes} = useNotes();
   const [showModal, setShowModal] = useState(false);
   const [isEdit, setIsEdit] = useState(false);

   const deleteNote = async () => {
   const result = await AsyncStorage.getItem('notes');
   let notes = [];
   if(result !== null ) 
    notes = JSON.parse(result);

   const newNotes = notes.filter(n => n.id !== note.id);
   setNotes(newNotes);
   await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
   props.navigation.goBack();
   }

   

   const formatDate = time => {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${month}/${day}/${year} - ${hour}:${min}:${sec}`;
   }

   const displayDeleteAlert = () =>{
    Alert.alert('Are you sure?', 'This will delete your note forever',[
        {
            text: 'Delete', 
            onPress: deleteNote
        },
        {
            text: 'No',
            onPress: () => console.log('no'),
        }
    ], {
        cancelable: true
    });
   };

   const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes')
    let notes = [];
    if(result !== null)
        notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
        if(n.id === note.id){
            n.title = title;
            n.desc = desc;
            n.isUpdated = true;
            n.time = time;

            setNote(n);
        }
        return n;
    })

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
   };
   const handleClose = () => setShowModal(false);

   const openEditModal = () =>{
    setIsEdit(true);
    setShowModal(true);
   }

  return (
    <>
    <ScrollView contentContainerStyle={[styles.container, {paddingTop: headerHeight}]}>
      <Text style={styles.time}>{note.isUpdated ? `Edited At ${formatDate(note.time)}` : `Created At ${formatDate(note.time)}`}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text>{note.desc}</Text>

     
    </ScrollView>

    <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={openEditModal}>
        <View style={styles.editContainer}>
            <Text style={styles.editText}>Edit</Text>
        </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={displayDeleteAlert}>
        <View style={styles.deleteContainer}>
            <Text style={styles.deleteText}>Delete</Text>
        </View>
     </TouchableOpacity>
     </View>
     <AddNoteScreen isEdit={isEdit} note={note} onClose={handleClose} onSubmit={handleUpdate} visible={showModal}/>

     
    </>
    
  )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#e4e6f7',
        paddingHorizontal: 15, 
    },
    title:{
        fontSize: 30, 
        
    },
    time:{
        opacity: 0.5,
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#e4e6f7',
    },
    editContainer:{
        width: 60,
        height: 60, 
        backgroundColor: '#FFF',
        borderRadius: 60, 
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#3b43c4',
        borderWidth: 1,
        position: 'absolute',
        right: 30,
        
      },
      deleteContainer:{
        width: 60,
        height: 60, 
        backgroundColor: '#FFF',
        borderRadius: 60, 
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#3b43c4',
        borderWidth: 1,
        left: 90,
        
      },
});

export default NoteDetail;