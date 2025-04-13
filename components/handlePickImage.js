import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const IMAGES_DIR = FileSystem.documentDirectory + 'images/';

export async function handlePickImage(setImageFilename) {
  try {
    // Ask for permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    // Let user pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const pickedUri = result.assets[0].uri;
      const filename = pickedUri.split('/').pop();

      // Ensure images/ directory exists
      const dirInfo = await FileSystem.getInfoAsync(IMAGES_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(IMAGES_DIR, { intermediates: true });
      }

      // Copy image to app storage
      const destPath = IMAGES_DIR + filename;
      await FileSystem.copyAsync({ from: pickedUri, to: destPath });

      // Store only the filename
      setImageFilename(filename);
    }
  } catch (err) {
    console.error('Error picking image:', err);
    alert('Could not pick image.');
  }
}
