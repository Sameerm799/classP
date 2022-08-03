import 'react-native-gesture-handler';
import * as React from 'react'; 
import { Text, View, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TodoScreen from './pages/todoTask/TodoPage';
import NotesScreen from './pages/notes/NotesPage';
import ShowcasesScreen from './pages/imageshowcase/ShowcasePage';
import NoteDetail from './pages/notes/NoteDetail';
import NoteProvider from './pages/context/NoteProvider';
import PostProvider from './pages/context/PostProvider';
import PostDetail from './pages/imageshowcase/PostDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TodoStack(){
  return(
    <Stack.Navigator
      initialRouteName='todo'
      >
        <Stack.Screen
          name="Todo"
          component={TodoScreen}
          options={{
            headerShown: false
          }}
          />
      </Stack.Navigator>
  );
}
function NotesStack(){
  return(
    <>
    <NoteProvider>
    <Stack.Navigator
    initialRouteName='notes'
    screenOptions={{headerTitle: '', headerTransparent: true}}
    >
      <Stack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen
        name="NoteDetail"
        component={NoteDetail}
        options={{
          
        }}
        />
    </Stack.Navigator>
    </NoteProvider>
    
    </>
  );
}
function ShowcaseStack(){
  return(
    <PostProvider>
    <Stack.Navigator
    initialRouteName='showcase'
    screenOptions={{headerTitle: '', headerTransparent: true}}
    >
      <Stack.Screen
        name="Showcase"
        component={ShowcasesScreen}
        options={{
          headerShown: false
        }}
        />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          
        }}
        />
    </Stack.Navigator>
    </PostProvider>
  );
}

function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Feed'
        >
          <Tab.Screen
            name="Your Tasks"
            component={TodoStack}
            options={{
              tabBarLabel: 'To-do List',
              tabBarActiveTintColor: '#3b43c4',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name='check'
                  color={color}
                  size = {size}/>
              )
            }} />
          <Tab.Screen
            name='Your Notes'
            component={NotesStack}
            options={{
              tabBarLabel: 'Notes',
              tabBarActiveTintColor: '#3b43c4',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name='pencil'
                  color={color}
                  size = {size}/>
              )
            }}/>
          <Tab.Screen
            name='Your Hardwork'
            component={ShowcaseStack}
            options={{
              tabBarLabel: 'Showcase',
              tabBarActiveTintColor: '#3b43c4',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name='image'
                  color={color}
                  size = {size}/>
              )
            }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;