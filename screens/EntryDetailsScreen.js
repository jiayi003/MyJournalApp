// screens/EntryDetailsScreen.js
import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { getLocalImageUri } from '../utils/MediaUtils';
import GlobalStyles from '../styles/GlobalStyles';

export default function EntryDetailsScreen({ route, navigation }) {
  const { entry } = route.params;

  const formattedDate = new Date(entry.timestamp).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const soundRef = useRef(null);

  // Play or pause audio
  const toggleAudioPlayback = async () => {
    if (soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
      return;
    }

    const uri = getLocalImageUri(entry.audioPath, 'audio');
    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    soundRef.current = newSound;
    setSound(newSound);
    setIsPlaying(true);
    newSound.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded && status.durationMillis > 0) {
        setProgress(status.positionMillis / status.durationMillis);
      }
      if (status.didJustFinish) {
        setIsPlaying(false);
        setProgress(0);
      }
    });
    await newSound.playAsync();
  };

  return (
    <View style={[GlobalStyles.entry.container, { backgroundColor: '#f5f5f5' }]}>
      {/* Entry meta info */}
      <Text style={GlobalStyles.entry.date}>{formattedDate}</Text>
      <Text style={GlobalStyles.entry.location}>📍 {entry.city || 'Unknown Location'}</Text>
      <Text style={GlobalStyles.entry.weather}>🌤 {entry.weather || 'Weather Unavailable'}</Text>

      {/* Title and full text content */}
      <Text style={GlobalStyles.entry.sectionTitle}>{entry.title || 'Untitled'}</Text>
      <Text style={GlobalStyles.entry.content}>{entry.text || 'No content available.'}</Text>

      {/* Image grid if multiple imagePaths are present */}
      {Array.isArray(entry.imagePaths) && entry.imagePaths.length > 0 && (
        <View style={GlobalStyles.entry.mediaBlock}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {entry.imagePaths.map((filename, index) => (
              <Image
                key={index}
                source={{ uri: getLocalImageUri(filename) }}
                style={{ width: 100, height: 100, borderRadius: 10, margin: 5 }}
              />
            ))}
          </View>
        </View>
      )}

      {/* Single image fallback for older entries (backward compatible) */}
      {entry.imagePath && (
        <View style={GlobalStyles.entry.mediaBlock}>
          <Image source={{ uri: entry.imagePath }} style={GlobalStyles.entry.image} />
        </View>
      )}

      {/* Audio block if audioPath is present */}
      {entry.audioPath && (
        <View style={GlobalStyles.entry.mediaBlock}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight:50 }}>

          {/* Play/pause button */}
          <TouchableOpacity
            style={GlobalStyles.entry.audioButton}
            onPress={toggleAudioPlayback}
          >
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
          </TouchableOpacity>

          {/* Progress bar */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
              marginHorizontal: 8,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 4,
                backgroundColor: '#ccc',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${progress * 100}%`,
                  height: '100%',
                  backgroundColor: '#4CAF50',
                }}
              />
            </View>
            </View>
            
          </View>
        </View>
      )}

      {/* Delete button */}
      <TouchableOpacity style={GlobalStyles.entry.deleteButton}>
        <Ionicons name="trash" size={20} color="white" />
        <Text style={GlobalStyles.entry.deleteButtonText}>Delete Entry</Text>
      </TouchableOpacity>
    </View>
  );
}
