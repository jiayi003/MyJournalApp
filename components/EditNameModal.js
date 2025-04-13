// components/EditNameModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

export default function EditNameModal({ visible, onClose, value, onChange, onConfirm }) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={GlobalStyles.modalCenteredContainer.overlay}>
        <View style={GlobalStyles.modalCenteredContainer.contentBox}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            Edit Display Name
          </Text>

          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="New display name"
            style={GlobalStyles.modalCenteredContainer.input}
          />

          <View style={GlobalStyles.modalCenteredContainer.buttonRow}>


            <TouchableOpacity
              style={[
                GlobalStyles.modalCenteredContainer.button,
                GlobalStyles.modalCenteredContainer.cancelButton,
              ]}
              onPress={onClose}
            >
              <Text style={GlobalStyles.modalCenteredContainer.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                GlobalStyles.modalCenteredContainer.button,
                GlobalStyles.modalCenteredContainer.confirmButton,
              ]}
              onPress={onConfirm}
            >
              <Text style={GlobalStyles.modalCenteredContainer.buttonText}>OK</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </Modal>
  );
}
