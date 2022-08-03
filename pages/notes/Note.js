import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native-web';
import { Colors } from 'react-native/Libraries/NewAppScreen';

//show on note page, small bubble to be pressed
const Note = ({item, onPress}) =>{
    const {title, desc} = item; 
  return (
    
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 10,
        margin:8,
    },
    title:{
      fontSize: 30,
      
    }
})

export default Note;