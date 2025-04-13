// screens/UserScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { updateProfile } from 'firebase/auth';

import { auth } from '../components/FirebaseConfig';
import EditNameModal from '../components/EditNameModal';
import GlobalStyles from '../styles/GlobalStyles';
import { handlePickImage, getLocalImageUri } from '../utils/MediaUtils';

export default function UserScreen({ navigation }) {

  // state variables
  const [profileImageFilename, setProfileImageFilename] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  // set user
  const user = auth.currentUser;

  // on mount
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || 'Anonymous User');
      if (user.photoURL) {
        setProfileImageFilename(user.photoURL); //local filename
      }
    }
  }, [user]);


  /* Setting Profile Pic */
  const handlePickAvatar = async () => {
    await handlePickImage(async (filename) => {
      setProfileImageFilename(filename);
      try {
        await updateProfile(user, { photoURL: filename });
      } catch (err) {
        Alert.alert('Error updating profile picture.');
      }
    }, 'avatars');
  };

  /* Update Name */
  const handleNameUpdate = async () => {
    try {
      await updateProfile(user, { displayName: nameInput });
      setDisplayName(nameInput);
      setEditingName(false);
    } catch (err) {
      Alert.alert('Failed to update display name.');
    }
  };

  /* Log Out */
  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  //
  return (
    <View style={GlobalStyles.user.container}>
      <TouchableOpacity onPress={handlePickAvatar}>
        <Image
          source={
            profileImageFilename
              ? { uri: getLocalImageUri(profileImageFilename, 'avatars') }
              : require('../assets/default-profile.png')
          }
          style={GlobalStyles.user.avatar}
        />
      </TouchableOpacity>

      <Text style={GlobalStyles.user.label}>Display Name:</Text>
      <Text style={GlobalStyles.user.text}>{displayName}</Text>
      <TouchableOpacity
        onPress={() => {
          setNameInput(displayName);
          setEditingName(true);
        }}
      >
        <Text style={{ color: '#999999', marginBottom: 12 }}>Edit Name</Text>
      </TouchableOpacity>

      <Text style={GlobalStyles.user.label}>User ID:</Text>
      <Text style={GlobalStyles.user.text}>{user?.uid}</Text>

      <Text style={GlobalStyles.user.label}>Email:</Text>
      <Text style={GlobalStyles.user.text}>{user?.email}</Text>

      <TouchableOpacity
        style={GlobalStyles.user.logoutButton}
        onPress={handleLogout}
      >
        <Text style={GlobalStyles.user.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <EditNameModal
        visible={editingName}
        onClose={() => setEditingName(false)}
        value={nameInput}
        onChange={setNameInput}
        onConfirm={handleNameUpdate}
      />
    </View>
  );
}
