// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewEntryScreen from '../screens/NewEntryScreen';
import EntryDetailsScreen from '../screens/EntryDetailsScreen';
import UserScreen from '../screens/UserScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ navigation }) => ({
                    headerTitle: 'MyJournal',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('User')}>
                        <Ionicons
                            name="person-circle-outline"
                            size={28}
                            color="black"
                            style={{ marginRight: 10 }}
                        />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: '#fff',
                        elevation: 4,
                        shadowOpacity: 0.1,
                    },
                    })}
                />
                <Stack.Screen
                    name="NewEntry"
                    component={NewEntryScreen}
                    options={{
                    headerBackTitleVisible: false,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#fff',
                        elevation: 4,
                        shadowOpacity: 0.1,
                    },
                    }}
                />
                <Stack.Screen
                    name="EntryDetails"
                    component={EntryDetailsScreen}
                    options={{
                    headerBackTitleVisible: false,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#fff',
                        elevation: 4,
                        shadowOpacity: 0.1,
                    },
                    }}
                />
                <Stack.Screen
                    name="User"
                    component={UserScreen}
                    options={{
                        headerTitle: 'Profile',
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                        headerStyle: {
                        backgroundColor: '#fff',
                        elevation: 4,
                        shadowOpacity: 0.1,
                        },
                    }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default AppNavigator;