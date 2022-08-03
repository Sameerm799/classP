import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker'
import {Card, Title, Paragraph, Button} from 'react-native-paper'
const Post = ({item, onPress}) =>{
    const{title, desc} = item;
    const[image, setImage] = useState(null);

    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.cancelled) {
            setImage(result.uri);
          }
        };
return (
    
    // <TouchableOpacity style={styles.container} onPress={onPress}>
    //   <Text numberOfLines={2}>{title}</Text>
    //   <Text numberOfLines={3}>{desc}</Text>
    // </TouchableOpacity>
    <>
    <TouchableOpacity onPress = {onPress}>
    <Card.Content style={styles.cardContainer}>
        <Title style={styles.cTitle}>{title}</Title>
        <Paragraph>{desc}</Paragraph>
    </Card.Content>
    <Card.Cover source={{uri: image}} />
    </TouchableOpacity>
    <Card.Actions>
        <Button style={styles.cButton} onPress={pickImage}>Add</Button>
    </Card.Actions>
    
    </>
    );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#e4e6f7',
        padding: 8,
        borderRadius: 10,
        marginBottom: 10,
        paddingBottom: 150,
    },
    cardContainer:{
        
    },
    title:{
        fontSize: 30,
    },
    cTitle:{
        
    },
    cButton:{
        marginBottom: 5,
        borderColor: '#3b43c4',
    }
})

export default Post;