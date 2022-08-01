import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Note from './Note';
import AddNoteScreen from './AddNote';
import NoteDetail from './NoteDetail';
import { useNotes } from '../context/NoteProvider';


const NotesScreen = ({ navigation }) =>{
    
const[modalVisible, setModalVisible] = useState(false);
const {notes, setNotes} = useNotes([]);

const handleSubmit = async (title, desc) =>{
  const note = { id: Date.now(), title, desc, time: Date.now() };
  const updatedNotes = [...notes, note];
  
  setNotes(updatedNotes);
  await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
};

const openNote = (note) =>{
  navigation.navigate('NoteDetail', {note});
}

    return(
        <View>
          <FlatList 
            data={notes} 
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15,}} 
            keyExtractor={item=> item.id.toString()} 
            renderItem={({item}) => <Note onPress={() => openNote(item)} item={item} />} 
          />
          
          <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </TouchableOpacity>
                    <AddNoteScreen visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleSubmit}/>
        </View>
    )

}

const styles2 = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e4e6f7',
    },
    noteWrapper:{
      paddingTop: 10,
      paddingHorizontal: 20,
    },
    note:{
      marginTop: 30,
    },
    inputWrapper: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      flexDirection: 'row', 
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,  
      backgroundColor: '#fcfcfe',
      borderRadius: 60,
      borderColor: '#3b43c4',
      borderWidth: 1,
      width: 250, 
    },
    addWrapper:{
      width: 60,
      height: 60, 
      backgroundColor: '#FFF',
      borderRadius: 60, 
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#3b43c4',
      borderWidth: 1,
      position: 'absolute',
      right: 15, 
      //change this after 
      
    },
    addText:{},
  });
export default NotesScreen;