// components/MediaOptionsModal.js
import React from 'react';
import {
  Modal,
  Pressable,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';

export default function MediaOptionsModal({ visible, onClose, onPhotoPress, onAudioPress }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        style={GlobalStyles.audioSheet.modalOverlay}
        onPress={onClose}
      >
        <View style={GlobalStyles.audioSheet.modalContentRow}>
          <TouchableOpacity style={GlobalStyles.audioSheet.modalOption} onPress={onPhotoPress}>
            <Ionicons name="image-outline" size={32} color="#444" />
            <Text style={GlobalStyles.audioSheet.optionText}>Add Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={GlobalStyles.audioSheet.modalOption} onPress={onAudioPress}>
            <Ionicons name="mic-outline" size={32} color="#444" />
            <Text style={GlobalStyles.audioSheet.optionText}>Record Audio</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}
