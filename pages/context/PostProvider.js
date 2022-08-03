import React, { createContext, useContext, useEffect, useState  } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

//provide the context and data of post
const PostContext = createContext();
const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([]);

    const findPosts = async () => {
        const result = await AsyncStorage.getItem('posts');
        if(result !== null)
            setPosts(JSON.parse(result));
    }
    useEffect(() => {
        findPosts();
    }, []);
    
    return(
        <PostContext.Provider value={{posts, setPosts, findPosts}}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => useContext(PostContext);

export default PostProvider;