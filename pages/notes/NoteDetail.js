import { View, Text, StyleSheet, ScrollView, TouchableOpacity,  Alert, } from 'react-native'
import React, {useState} from 'react'
import {useHeaderHeight} from '@react-navigation/elements'
import AddNoteScreen from './AddNote';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/NoteProvider';

const NoteDetail = (props) => {
   //const {note} = props.route.params;
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
    Alert.alert('Are you sure?', 'This action will delete your note',[
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
      <Text style={styles.time}>{note.isUpdated ? `Updated At ${formatDate(note.time)}` : `Created At ${formatDate(note.time)}`}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.desc}>{note.desc}</Text>

     
    </ScrollView>

    <View style={styles.buttonWrapper}>
    <TouchableOpacity onPress={openEditModal}>
        <View style={styles.editWrapper}>
            <Text style={styles.editText}>Edit</Text>
        </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={displayDeleteAlert}>
        <View style={styles.deleteWrapper}>
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
        
        paddingHorizontal: 15, 
    },
    title:{
        fontSize: 30, 
        
    },
    desc:{

    },
    time:{

    },
    buttonWrapper:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    editWrapper:{
        width: 60,
        height: 60, 
        backgroundColor: '#FFF',
        borderRadius: 60, 
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#3b43c4',
        borderWidth: 1,
        position: 'absolute',
        right: 50,
         
         //change this after 
        
      },
      deleteWrapper:{
        width: 60,
        height: 60, 
        backgroundColor: '#FFF',
        borderRadius: 60, 
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#3b43c4',
        borderWidth: 1,
         
         //change this after 
        
      },
});

export default NoteDetail;