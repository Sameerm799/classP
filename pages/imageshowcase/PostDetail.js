import { View, Text, StyleSheet, ScrollView, TouchableOpacity,  Alert, } from 'react-native'
import React, {useState} from 'react'
import {useHeaderHeight} from '@react-navigation/elements'
import AddcardScreen from './AddPost'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePosts } from '../context/PostProvider';

const PostDetail = (props) =>{
    const [post, setPost] = useState(props.route.params.post);
    const headerHeight = useHeaderHeight();
    const {setPosts} = usePosts();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const deletePost = async () => {
        const result = await AsyncStorage.getItem('posts');
        let posts = []; 
        if(result !== null) 
            posts = JSON.parse(result);

        const newPosts = posts.filter(p => p.id !== post.id);
        setPosts(newPosts);
        await AsyncStorage.setItem('posts', JSON.stringify(newPosts));
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
        Alert.alert('Are you sure?', 'This action will delete your post',[
            {
                text: 'Delete', 
                onPress: deletePost
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
        const result = await AsyncStorage.getItem('posts')
        let posts = [];
        if(result !== null)
            posts = JSON.parse(result);

        const newPosts = posts.filter(p=>{
            if(p.id === post.id){
                p.title = title;
                p.desc = desc; 
                p.isUpdated = true;
                p.time = time;

                setPost(p);
            }
            return p; 
        })

        setPosts(newPosts);
        await AsyncStorage.setItem('posts', JSON.stringify(newPosts));
       };

       const handClose = () => setShowModal(false);

       const openEditModal = () =>{
        setIsEdit(true);
        setShowModal(true);
       }
       

       return(
        <>
        <ScrollView contentContainerStyle={[styles.container, {paddingTop: headerHeight}]}>
            <Text style={styles.time}>{post.isUpdated ? `Updated at ${formatDate(post.time)}` : `Created at ${formatDate(post.time)}`}</Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text>{post.desc}</Text>
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
        <AddcardScreen isEdit={isEdit} post={post} onClose={handClose} onSubmit={handleUpdate} visible={showModal} />
        </>
       )
}

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
    buttonWrapper:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#e4e6f7',
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
        right: 30,
         
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
        left: 90,
         
         //change this after 
        
      },
});

export default PostDetail;