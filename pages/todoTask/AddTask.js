import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//create singular task to display on screen
const Task = (props) =>{
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
            <MaterialCommunityIcons name='check' style={styles.check}/>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor:'#3b43c4',
        padding: 15, 
        borderRadius: 40,
        borderWidth: 1,
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
   text: {
    color: '#fff'
   },
    check: {
        paddingRight: 10,
        color: '#fff'
    },
});

export default Task;