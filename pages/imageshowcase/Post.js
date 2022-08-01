import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'

const Post = ({item, onPress}) =>{
    const{title, desc} = item;
return (
    
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text numberOfLines={2}>{title}</Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
    );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#fff',
        width: width/2,
        padding: 8,
        borderRadius: 10,
    }
})

export default Post;