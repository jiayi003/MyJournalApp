import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

// filesystem directories
const IMAGES_DIR = FileSystem.documentDirectory + 'images/';
const AUDIO_DIR = FileSystem.documentDirectory + 'audio/';

/* Image Functionality */
export async function handlePickImage(setFilename, folder = 'images') {
  
  // try to get permission
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access media is required!');
      return;
    }

    // crop 1:1, image only
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    // if they select something
    if (!result.canceled) {
      const pickedUri = result.assets[0].uri;
      const filename = pickedUri.split('/').pop();
      const destFolder = `${FileSystem.documentDirectory}${folder}/`;

      // ensure folder exists
      const folderInfo = await FileSystem.getInfoAsync(destFolder);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(destFolder, { intermediates: true });
      }

      // copy the file to app's local filesystem
      const destPath = destFolder + filename;
      await FileSystem.copyAsync({ from: pickedUri, to: destPath });

      // send back filename
      setFilename(filename);
    }
  } catch (err) {
    console.error('Image picker error:', err);
    alert('Could not pick image.');
  }
}

// generates the full local path to a saved image, use this when displaying images
export function getLocalImageUri(filename, folder = 'images') {
  return `${FileSystem.documentDirectory}${folder}/${filename}`;
}


/* Audio Functionality */
let recordingInstance = null;

export async function startAudioRecording() {
  try {

    // requests permission
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );

    recordingInstance = recording;
    return recording;
  } catch (err) {
    console.error('Failed to start recording', err);
    alert('Could not start recording.');
  }
}

// stops recording, saves file locally to audio/
// Calls callback with filename so it can store in Firebase
export async function stopAndSaveRecording(onSave) {
  try {
    if (!recordingInstance) return;

    await recordingInstance.stopAndUnloadAsync();
    const uri = recordingInstance.getURI();
    const filename = uri.split('/').pop();

    const folderInfo = await FileSystem.getInfoAsync(AUDIO_DIR);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(AUDIO_DIR, { intermediates: true });
    }

    const destPath = AUDIO_DIR + filename;
    await FileSystem.moveAsync({ from: uri, to: destPath });

    onSave(filename);
    recordingInstance = null;
  } catch (err) {
    console.error('Failed to stop/save recording', err);
    alert('Could not save recording.');
  }
}





