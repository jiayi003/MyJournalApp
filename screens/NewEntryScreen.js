// screens/NewEntryScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, push } from 'firebase/database';

import { db, auth } from '../components/FirebaseConfig';
import WeatherBanner from '../components/WeatherBanner';
import MediaOptionsModal from '../components/MediaOptionsModal';
import {
  handlePickImage,
  getLocalImageUri,
  startAudioRecording,
  stopAndSaveRecording,
} from '../utils/MediaUtils';
import GlobalStyles from '../styles/GlobalStyles';

export default function NewEntryScreen({ navigation, route }) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showAudioSheet, setShowAudioSheet] = useState(false);
  const [audioPath, setAudioPath] = useState(null);
  const [imageFilenames, setImageFilenames] = useState([]);
  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const saveEntry = async () => {
    if (!title || !text) {
      alert('Please enter both title and content.');
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const entry = {
      title,
      text,
      timestamp: Date.now(),
      imagePaths: imageFilenames,
      audioPath,
      weather,
      city,
    };

    const userRef = ref(db, `users/${userId}/entries`);
    try {
      await push(userRef, entry);
      alert('Entry saved!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert('Failed to save entry.');
    }
  };

  return (
    <View style={GlobalStyles.base.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{route.params?.today}</Text>
      <WeatherBanner onWeatherFetched={(w, c) => {
        setWeather(w);
        setCity(c);
      }} />
      <Text style={{ fontSize: 16, color: '#777', marginTop: 12, marginBottom: 16 }}>
        What's on your mind today?
      </Text>

      <TextInput
        style={GlobalStyles.base.titleInput}
        placeholder="Give your entry a title..."
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={GlobalStyles.base.input}
        multiline
        placeholder="Start writing..."
        value={text}
        onChangeText={setText}
      />

      <Text style={GlobalStyles.base.label}>Add Media</Text>
      <View style={GlobalStyles.mediaGrid.container}>
        {imageFilenames.map((filename, index) => (
          <Image
            key={index}
            source={{ uri: getLocalImageUri(filename) }}
            style={GlobalStyles.mediaGrid.thumbnail}
          />
        ))}
        {imageFilenames.length < 9 && (
          <TouchableOpacity
            style={GlobalStyles.mediaGrid.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={32} color="#777" />
          </TouchableOpacity>
        )}
      </View>

      <MediaOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPhotoPress={() => {
          setModalVisible(false);
          if (imageFilenames.length < 9) {
            handlePickImage((filename) => {
              setImageFilenames((prev) => [...prev, filename]);
            });
          }
        }}
        onAudioPress={() => {
          setModalVisible(false);
          setShowAudioSheet(true);
        }}
      />

      <Modal
        transparent
        animationType="slide"
        visible={showAudioSheet}
        onRequestClose={() => setShowAudioSheet(false)}
      >
        <Pressable
          style={GlobalStyles.audioSheet.sheetOverlay}
          onPress={() => setShowAudioSheet(false)}
        >
          <View style={GlobalStyles.audioSheet.sheetContainer}>
            <Text style={GlobalStyles.audioSheet.sheetTitle}>Audio Recorder</Text>
            <View style={GlobalStyles.audioSheet.audioControls}>
              {isRecording ? (
                <TouchableOpacity
                  style={GlobalStyles.audioSheet.iconButton}
                  onPress={async () => {
                    await stopAndSaveRecording((filename) => {
                      setAudioPath(filename);
                      setIsRecording(false);
                      setRecordingTime(0);
                    });
                  }}
                >
                  <Ionicons name="stop-circle" size={48} color="#e53935" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={GlobalStyles.audioSheet.iconButton}
                  onPress={async () => {
                    await startAudioRecording();
                    setIsRecording(true);
                  }}
                >
                  <Ionicons name="mic-circle" size={48} color="#4CAF50" />
                </TouchableOpacity>
              )}
            </View>
            {isRecording && (
              <Text style={{ marginTop: 10, fontSize: 16, textAlign: 'center', color: '#666' }}>
                ⏱ Recording: {Math.floor(recordingTime / 60)}:
                {(recordingTime % 60).toString().padStart(2, '0')}
              </Text>
            )}
          </View>
        </Pressable>
      </Modal>

      <TouchableOpacity style={GlobalStyles.base.saveButton} onPress={saveEntry}>
        <Ionicons name="save" size={20} color="white" />
        <Text style={GlobalStyles.base.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
}
