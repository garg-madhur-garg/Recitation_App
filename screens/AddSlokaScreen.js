import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { Audio } from 'expo-av';
// import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';

const AddSlokaScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [slokaText, setSlokaText] = useState('');
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  // const [uploading, setUploading] = useState(false);
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);

  const validateFields = () => {
    if (!title || !slokaText) {
      // Alert.alert('Error', 'Please fill all fields');
      setAlertVisible(true);
      return false;
    }
    return true;
  };

  const startRecording = async () => {
    if (!validateFields()) return;
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    setRecording(recording);
  };

  const stopRecording = async () => {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioUri(uri);
    saveSloka(uri);
  };

  // const uploadAudio = async () => {
  //   if (!validateFields()) return;
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: 'audio/*',
  //       copyToCacheDirectory: true,
  //     });

  //     if (result.type === 'success') {
  //       setUploading(true);
  //       setUploadProgress(0);

  //       const interval = setInterval(() => {
  //         setUploadProgress(prev => prev >= 95 ? 95 : prev + 5);
  //       }, 100);

  //       setTimeout(() => {
  //         clearInterval(interval);
  //         setUploadProgress(100);
  //         setAudioUri(result.uri);
  //         saveSloka(result.uri);
  //         setUploading(false);
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to upload audio');
  //   }
  // };

  const saveSloka = async (audioUri) => {
    const newSloka = {
      id: Date.now().toString(),
      title,
      text: slokaText,
      audioUri,
    };

    const savedSlokas = await AsyncStorage.getItem('slokas');
    const slokas = savedSlokas ? JSON.parse(savedSlokas) : [];
    slokas.push(newSloka);
    await AsyncStorage.setItem('slokas', JSON.stringify(slokas));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Sloka Text"
        placeholderTextColor="#888"
        value={slokaText}
        onChangeText={setSlokaText}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={[
          styles.button,
          recording ? styles.stopButton : styles.recordButton,
          { marginBottom: 8 }
        ]}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {recording ? 'Stop Recording' : 'Record Audio'}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={[
          styles.button,
          uploading ? styles.uploadingButton : styles.uploadButton,
          { marginBottom: 8 }
        ]}
        onPress={uploadAudio}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Audio'}
        </Text>
      </TouchableOpacity> */}

      {/* {uploadProgress > 0 && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${uploadProgress}%` }]} />
        </View>
      )} */}
      <CustomAlert
        visible={alertVisible}
        title="Missing Fields"
        message="Please fill all fields"
        buttons={[
          {
            text: 'OK',
            onPress: () => setAlertVisible(false),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: 'white',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#3700B3',
  },
  stopButton: {
    backgroundColor: '#CF6679',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  // uploadButton: {
  //   backgroundColor: '#018786',
  // },
  // uploadingButton: {
  //   backgroundColor: '#4A4A4A',
  // },
  // progressBar: {
  //   height: 4,
  //   backgroundColor: '#333',
  //   borderRadius: 2,
  // },
  // progressFill: {
  //   height: '100%',
  //   backgroundColor: '#BB86FC',
  //   borderRadius: 2,
  // },
});

export default AddSlokaScreen;