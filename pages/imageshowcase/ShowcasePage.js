import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { KeyboardAvoidingView, TextInput,TouchableOpacity, StyleSheet, ScrollView, View, Text, SafeAreaView, Image, ImagePickerIOS, FlatList } from 'react-native';
import {Avatar, Card, Title, Paragraph, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AddcardScreen from './AddCard';
import { usePosts } from '../context/PostProvider';
import Post from './Post';

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
     
    // const[card, setCard] = useState();
    // const[cardItems, setCardItems] = useState([]);

    const openPost = (post) =>{
      navigation.navigate('PostDetail', {post});
    }
    

    // const pickImage = async () =>{
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //       });
      
    //       console.log(result);
      
    //       if (!result.cancelled) {
    //         setImage(result.uri);
    //       }
    //     };
    // return(
    //     <>
    //     {/*<Card>
    //         <Card.Content>
    //             <Title>Yo</Title>
    //             <Paragraph>Some words about image</Paragraph>
    //         </Card.Content>
    //         <Card.Cover source={{uri: image }}/>
    //         <Card.Actions>
    //             <Button onPress={pickImage}>Add</Button>
               
    //         </Card.Actions>
    // </Card>*/}
    //    <View>
    //     <FlatList
    //         data={cards}
    //         renderItem={({item}) => <CardItem card={item}/>}
    //         />
    //     <TouchableOpacity
    //     onPress={() => navigation.navigate('AddShowcase')}><Text>Press</Text></TouchableOpacity>
        
    //    </View>
    //    </>
    // )
   
    
    // const addElementToarray = () =>{
    //     cards.push(InputDATA.toString());
    //     Alert.alert('Data added successfully ....');
    //     console.log(cards);
    // }
    //
    
    
    return(
        // <ScrollView>
        //   {postState.map((item) => 
        //   <Card>
        //     <Card.Content>
        //         <Title>{item.title}</Title>
        //         <Paragraph>{item.desc}</Paragraph>
        //     </Card.Content>
        //     <Card.Cover source={{uri: item.image }}/>
            
        //   </Card>)}
        //   <KeyboardAvoidingView>
        //   <TouchableOpacity onPress={() => navigation.navigate('AddShowcase')}>
        //                 <View style={styles.addWrapper}>
        //                     <Text style={styles.addText}>+</Text>
        //                 </View>
        //             </TouchableOpacity>
        //         </KeyboardAvoidingView>
        //    {/* <Button onPress={addElementToarray} title={'add that'}/>*/}
           
        // </ScrollView>
        <View>
          <FlatList
            data={posts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Post onPress={() => openPost(item)} item={item} />}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                        </View>
          </TouchableOpacity>
          <AddcardScreen visible={modalVisible} onClose={() => setModalVisible(false)} 
          onSubmit={handleSubmit}/>
        </View> 
    );
};
const styles = StyleSheet.create({
    
    addWrapper:{
      
      width: 60,
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