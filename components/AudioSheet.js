// components/AudioSheet.js
import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

export default function AudioSheet({ visible, onClose }) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={GlobalStyles.audioSheet.sheetOverlay} onPress={onClose}>
        <View style={GlobalStyles.audioSheet.sheetContainer}>
          <Text style={GlobalStyles.audioSheet.sheetTitle}>Audio Recorder</Text>
          <View style={GlobalStyles.audioSheet.audioControls}>
            <TouchableOpacity style={GlobalStyles.audioSheet.controlButton}>
              <Text style={GlobalStyles.audioSheet.controlText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={GlobalStyles.audioSheet.controlButton}>
              <Text style={GlobalStyles.audioSheet.controlText}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={GlobalStyles.audioSheet.controlButton}>
              <Text style={GlobalStyles.audioSheet.controlText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
