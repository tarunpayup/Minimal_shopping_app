import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image, StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    axios.post('https://tarunbansal.co.in/android/react/login.php', {
      email,
      password
    })
    .then(response => {
      const res = response.data;
      if (res.success) {
        Alert.alert('Welcome', res.message);
        router.replace('/dashboard'); // Go to dashboard after login
      } else {
        Alert.alert('Login Failed', res.message);
      }
    })
    .catch(error => {
      Alert.alert('Server Error', 'Something went wrong');
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/login-top.png')}
        style={styles.image}
      />
      <Text style={styles.heading}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#95D09C',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#95D09C',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16
  },
  button: {
    backgroundColor: '#95D09C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});
