import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, FlatList } from 'react-native';

import AddcardScreen from './AddPost';
import { usePosts } from '../context/PostProvider';
import Post from './Post';

//show all posts screen, add post button

const ShowcasesScreen = ({ navigation }) => {
     const[image, setImage] = useState(null);
     const[modalVisible, setModalVisible] = useState(false);
     const {posts, setPosts} = usePosts([]);

     const handleSubmit = async (title, desc) =>{
      const post = {id: Date.now(), title, desc, time: Date.now() };
      const updatedPosts = [...posts, post];

      setPosts(updatedPosts);
      await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
     };
     

    const openPost = (post) =>{
      navigation.navigate('PostDetail', {post});
    }
    

    
    return(
  
        <View style = {styles.container}>
          <FlatList
            style={styles.flatlist}
            data={posts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Post onPress={() => openPost(item)} item={item} />}
          />
          
          <TouchableOpacity style={styles.inputWrapper} onPress={() => setModalVisible(true)}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>Showoff your Work +</Text>
                        </View>
          </TouchableOpacity>
          <AddcardScreen visible={modalVisible} onClose={() => setModalVisible(false)} 
          onSubmit={handleSubmit}/>
        </View> 
    );
};
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#e4e6f7'
    },

    inputWrapper:{
      position: 'absolute',
      left: 110, 
      bottom: 30,
      width: '100%',
      flexDirection: 'row', 
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    addWrapper:{
      width: 160,
      height: 60, 
      backgroundColor: '#FFF',
      borderRadius: 60, 
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#3b43c4',
      borderWidth: 1,
    },
    addText:{},
  });

export default ShowcasesScreen;