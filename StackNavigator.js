import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './screens/Homescreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ThreadsScreen from './screens/ThreadsScreen';
import { Ionicons } from '@expo/vector-icons';
import ActivityScreen from './screens/ActivityScreen';
import ProfileScreen from './screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    function BottomTabs(){
        return (
            <Tab.Navigator screenOptions={{
                headerShown:false
            }
            }>
                <Tab.Screen name="Home" component={Homescreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarLabelStyle:{color:'black',
                    },
                    // headerShown:false,
                    tabBarIcon: ({focused})=>
                    focused ? (
                        <Entypo name="home" size={24} color="black" />
                    ):(
                        <AntDesign name="home" size={24} color="black" />
                    )
                }}
                 />

            <Tab.Screen name="Threads" component={ThreadsScreen}
                options={{
                    tabBarLabel: 'Create',
                    tabBarLabelStyle:{color:'black'},
                    // headerShown:false,
                    tabBarIcon: ({focused})=>
                    focused ? (
                        <Ionicons name="create" size={24} color="black" />
                    ):(
                        <Ionicons name="create-outline" size={24} color="black" />
                    )
                }}
                 />

                <Tab.Screen name="Activity" component={ActivityScreen}
                options={{
                    tabBarLabel: 'Activity',
                    tabBarLabelStyle:{color:'black',headerShown:false},
                    // headerShown:false,
                    tabBarIcon: ({focused})=>
                    focused ? (
                        <AntDesign name="heart" size={24} color="black" />
                    ):(
                        <AntDesign name="hearto" size={24} color="black" />
                    )
                }}
                 />

                <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarLabelStyle:{
                        color:'black',
                        },
                    tabBarIcon: ({focused})=>
                    focused ? (
                        <MaterialCommunityIcons name="account-circle" size={24} color="black" />
                    ):(
                        <MaterialCommunityIcons name="account-circle-outline" size={24} color="black" />
                    )
                }}
                 />
            </Tab.Navigator>
        )
    }
  
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{
            headerShown:false
        }} />
        <Stack.Screen name="Register" component={RegisterScreen}
        options={{
            headerShown:false
        }} 
         />
          <Stack.Screen name="Main" component={BottomTabs}
        options={{
            headerShown:false
        }} 
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator

const styles = StyleSheet.create({})