// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { auth } from '../components/FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Please enter email and password');
      return;
    }

    const action = isRegistering ? createUserWithEmailAndPassword : signInWithEmailAndPassword;

    try {
      await action(auth, email, password);
      //Alert.alert(isRegistering ? 'Registered!' : 'Logged in!');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={GlobalStyles.login.container}>
      <Text style={GlobalStyles.login.title}>MyJournal</Text>
      <Text style={GlobalStyles.login.subtitle}>
        {isRegistering ? 'Register' : 'Login'} with Firebase
      </Text>

      <TextInput
        style={GlobalStyles.login.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={GlobalStyles.login.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={GlobalStyles.login.loginButton}
        onPress={handleAuth}
      >
        <Text style={GlobalStyles.login.loginText}>
          {isRegistering ? 'Register' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[GlobalStyles.login.loginButton, { backgroundColor: '#1e90ff', marginTop: 10 }]}
        onPress={() => setIsRegistering(!isRegistering)}
      >
        <Text style={GlobalStyles.login.loginText}>
          {isRegistering ? 'Login' : 'Register'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
