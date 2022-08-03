import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//create singular task to display on screen
const Task = (props) =>{
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
            <MaterialCommunityIcons name='check' style={styles.check}/>
                <Text>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor:'#fcfcfe',
        padding: 15, 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#3b43c4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'

    },
    square: {
        width:24,
        height:24,
        backgroundColor: '#55BCF6',
        opacity:0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    
    check: {
        paddingRight: 10,
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2, 
        borderRadius: 5,
    },
});

export default Task;