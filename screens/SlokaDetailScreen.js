// // import React, { useState, useEffect } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// // import { Audio } from 'expo-av';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import CustomAlert from '../components/CustomAlert';

// // const SlokaDetailScreen = ({ route, navigation }) => {
// //   const { sloka } = route.params;
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editedTitle, setEditedTitle] = useState(sloka.title);
// //   const [editedText, setEditedText] = useState(sloka.text);
// //   const [sound, setSound] = useState(null);
// //   const [isPlaying, setIsPlaying] = useState(false);

// //   const handlePlayback = async () => {
// //     if (isPlaying) {
// //       await sound.stopAsync();
// //       setIsPlaying(false);
// //     } else {
// //       const { sound: newSound } = await Audio.Sound.createAsync(
// //         { uri: sloka.audioUri },
// //         { isLooping: true, shouldPlay: true }
// //       );
// //       setSound(newSound);
// //       await newSound.playAsync();
// //       setIsPlaying(true);
// //     }
// //   };

// //   const saveChanges = async () => {
// //     const updatedSloka = {
// //       ...sloka,
// //       title: editedTitle,
// //       text: editedText
// //     };

// //     const savedSlokas = await AsyncStorage.getItem('slokas');
// //     let slokas = JSON.parse(savedSlokas);
// //     slokas = slokas.map(item => item.id === sloka.id ? updatedSloka : item);

// //     await AsyncStorage.setItem('slokas', JSON.stringify(slokas));
// //     navigation.goBack();
// //   };

// //   useEffect(() => {
// //     return () => {
// //       if (sound) {
// //         sound.unloadAsync();
// //       }
// //     };
// //   }, [sound]);

// //   return (
// //     <View style={styles.container}>
// //       {isEditing ? (
// //         <TextInput
// //           style={styles.input}
// //           value={editedTitle}
// //           onChangeText={setEditedTitle}
// //           placeholder="Title"
// //           placeholderTextColor="#888"
// //         />
// //       ) : (
// //         <Text style={styles.title}>{sloka.title}</Text>
// //       )}

// //       {isEditing ? (
// //         <TextInput
// //           style={[styles.input, styles.textInput]}
// //           value={editedText}
// //           onChangeText={setEditedText}
// //           placeholder="Sloka Text"
// //           placeholderTextColor="#888"
// //           multiline
// //           textAlignVertical="top"
// //         />
// //       ) : (
// //         <Text style={styles.text}>{sloka.text}</Text>
// //       )}

// //       <View style={styles.buttonContainer}>
// //         <TouchableOpacity
// //           style={[styles.button, isPlaying ? styles.stopButton : styles.playButton]}
// //           onPress={handlePlayback}
// //         >
// //           <Text style={styles.buttonText}>
// //             {isPlaying ? '⏹ Stop' : '▶ Play Loop'}
// //           </Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={[styles.button, styles.editButton]}
// //           onPress={() => {
// //             if (isEditing) saveChanges();
// //             setIsEditing(!isEditing);
// //           }}
// //         >
// //           <Text style={styles.buttonText}>
// //             {isEditing ? '💾 Save' : '✏️ Edit'}
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#121212',
// //   },
// //   title: {
// //     fontSize: 24,
// //     color: '#BB86FC',
// //     marginBottom: 20,
// //     fontWeight: 'bold',
// //   },
// //   text: {
// //     fontSize: 18,
// //     color: '#FFFFFF',
// //     lineHeight: 28,
// //     marginBottom: 30,
// //   },
// //   input: {
// //     backgroundColor: '#1E1E1E',
// //     color: '#FFFFFF',
// //     fontSize: 18,
// //     borderWidth: 1,
// //     borderColor: '#333',
// //     borderRadius: 6,
// //     padding: 12,
// //     marginBottom: 15,
// //   },
// //   textInput: {
// //     height: 200,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 20,
// //     gap: 10,
// //   },
// //   button: {
// //     flex: 1,
// //     padding: 15,
// //     borderRadius: 6,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   playButton: {
// //     backgroundColor: '#3700B3',
// //   },
// //   stopButton: {
// //     backgroundColor: '#CF6679',
// //   },
// //   editButton: {
// //     backgroundColor: '#018786',
// //   },
// //   buttonText: {
// //     color: '#FFFFFF',
// //     fontSize: 16,
// //     fontWeight: '500',
// //   },
// // });

// // export default SlokaDetailScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Audio } from 'expo-av';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomAlert from '../components/CustomAlert';

// const SlokaDetailScreen = ({ route, navigation }) => {
//   const { sloka } = route.params;
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(sloka.title);
//   const [editedText, setEditedText] = useState(sloka.text);
//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [audioUri, setAudioUri] = useState(sloka.audioUri);
//   const [alertVisible, setAlertVisible] = useState(false);

//   const handlePlayback = async () => {
//     if (isPlaying) {
//       await sound.stopAsync();
//       setIsPlaying(false);
//     } else {
//       const { sound: newSound } = await Audio.Sound.createAsync(
//         { uri: sloka.audioUri },
//         { isLooping: true, shouldPlay: true }
//       );
//       setSound(newSound);
//       await newSound.playAsync();
//       setIsPlaying(true);
//     }
//   };

//   // const startRecording = async () => {
//   //   try {
//   //     await Audio.requestPermissionsAsync();
//   //     await Audio.setAudioModeAsync({
//   //       allowsRecordingIOS: true,
//   //       playsInSilentModeIOS: true,
//   //       staysActiveInBackground: true,
//   //     });

//   //     const { recording: newRecording } = await Audio.Recording.createAsync(
//   //       Audio.RecordingOptionsPresets.HIGH_QUALITY
//   //     );
//   //     setRecording(newRecording);
//   //   } catch (err) {
//   //     setAlertVisible(true);
//   //   }
//   // };

//   // const stopRecording = async () => {
//   //   if (!recording) return;

//   //   try {
//   //     await recording.stopAndUnloadAsync();
//   //     const uri = recording.getURI();
//   //     setAudioUri(uri);
//   //     saveSloka(uri);
//   //   } catch (err) {
//   //     setAlertVisible(true);
//   //   }
//   // };

//   const saveChanges = async () => {
//     const updatedSloka = {
//       ...sloka,
//       title: editedTitle,
//       text: editedText
//     };

//     const savedSlokas = await AsyncStorage.getItem('slokas');
//     let slokas = JSON.parse(savedSlokas);
//     slokas = slokas.map(item => item.id === sloka.id ? updatedSloka : item);

//     await AsyncStorage.setItem('slokas', JSON.stringify(slokas));
//     navigation.goBack();
//   };

//   useEffect(() => {
//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, [sound]);

//   return (
//     <View style={styles.container}>
//       {isEditing ? (
//         <TextInput
//           style={styles.input}
//           value={editedTitle}
//           onChangeText={setEditedTitle}
//           placeholder="Title"
//           placeholderTextColor="#888"
//         />
//       ) : (
//         <Text style={styles.title}>{sloka.title}</Text>
//       )}

//       {isEditing ? (
//         <TextInput
//           style={[styles.input, styles.textInput]}
//           value={editedText}
//           onChangeText={setEditedText}
//           placeholder="Sloka Text"
//           placeholderTextColor="#888"
//           multiline
//           textAlignVertical="top"
//         />
//       ) : (
//         <Text style={styles.text}>{sloka.text}</Text>
//       )}

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, isPlaying ? styles.stopButton : styles.playButton]}
//           onPress={handlePlayback}
//         >
//           <Text style={styles.buttonText}>
//             {isPlaying ? '⏹ Stop' : '▶ Play Loop'}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.editButton]}
//           onPress={() => {
//             if (isEditing) saveChanges();
//             setIsEditing(!isEditing);
//           }}
//         >
//           <Text style={styles.buttonText}>
//             {isEditing ? '💾 Save' : '✏️ Edit'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#121212',
//   },
//   title: {
//     fontSize: 24,
//     color: '#BB86FC',
//     marginBottom: 20,
//     fontWeight: 'bold',
//   },
//   text: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     lineHeight: 28,
//     marginBottom: 30,
//   },
//   input: {
//     backgroundColor: '#1E1E1E',
//     color: '#FFFFFF',
//     fontSize: 18,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 6,
//     padding: 12,
//     marginBottom: 15,
//   },
//   textInput: {
//     height: 200,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     gap: 10,
//   },
//   button: {
//     flex: 1,
//     padding: 15,
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   playButton: {
//     backgroundColor: '#3700B3',
//   },
//   stopButton: {
//     backgroundColor: '#CF6679',
//   },
//   editButton: {
//     backgroundColor: '#018786',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default SlokaDetailScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';

const SlokaDetailScreen = ({ route, navigation }) => {
    const { sloka } = route.params;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(sloka.title);
    const [editedText, setEditedText] = useState(sloka.text);
    const [recording, setRecording] = useState(null);
    const [audioUri, setAudioUri] = useState(sloka.audioUri);
    const [alertVisible, setAlertVisible] = useState(false);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayback = async () => {
        if (isPlaying) {
            await sound.stopAsync();
            setIsPlaying(false);
        } else {
            const { sound: newSound } = await Audio.Sound.createAsync(
                // { uri: sloka.audioUri },
                { uri: audioUri }, // Use updated audioUri
                { isLooping: true, shouldPlay: true }
            );
            setSound(newSound);
            await newSound.playAsync();
            setIsPlaying(true);
        }
    };

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
            });

            const { recording: newRecording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(newRecording);
        } catch (err) {
            setAlertVisible(true);
        }
    };

    const stopRecording = async () => {
        if (!recording) return;

        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setAudioUri(uri);
            setRecording(null); // Reset recording state
            // saveSloka(uri);
        } catch (err) {
            setAlertVisible(true);
            setRecording(null); // Reset even on error
        }
    };

    // const saveChanges = async (newAudioUri = null) => {
    const saveChanges = async () => {
        const updatedSloka = {
            ...sloka,
            title: editedTitle,
            text: editedText,
            // audioUri: newAudioUri || sloka.audioUri,
            audioUri: audioUri, // Use current audioUri
        };

        const savedSlokas = await AsyncStorage.getItem('slokas');
        let slokas = JSON.parse(savedSlokas);
        slokas = slokas.map(item => item.id === sloka.id ? updatedSloka : item);

        await AsyncStorage.setItem('slokas', JSON.stringify(slokas));
        navigation.goBack();
    };

    const handleEditToggle = async () => {
        if (isEditing) {
            await saveChanges();
            // saveChanges(audioUri);
        } else {
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
                setIsPlaying(false);
            }
        }
        setIsEditing(!isEditing);
        // setSound(false);
    };

    useEffect(() => {
        return () => {
            if (recording) {
                recording.stopAndUnloadAsync();
            }
        };
    }, [recording]);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return (
        <View style={styles.container}>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={editedTitle}
                    onChangeText={setEditedTitle}
                    placeholder="Title"
                    placeholderTextColor="#888"
                />
            ) : (
                <Text style={styles.title}>{sloka.title}</Text>
            )}

            {isEditing ? (
                <TextInput
                    style={[styles.input, styles.textInput]}
                    value={editedText}
                    onChangeText={setEditedText}
                    placeholder="Sloka Text"
                    placeholderTextColor="#888"
                    multiline
                    textAlignVertical="top"
                />
            ) : (
                <Text style={styles.text}>{sloka.text}</Text>
            )}

            <View style={styles.buttonContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            recording ? styles.stopButton : styles.recordButton,
                        ]}
                        onPress={recording ? stopRecording : startRecording}
                    >
                        <Text style={styles.buttonText}>
                            {recording ? '⏹ Stop Recording' : '🎤 Record Audio'}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.button, isPlaying ? styles.stopButton : styles.playButton]}
                        onPress={handlePlayback}
                    >
                        <Text style={styles.buttonText}>
                            {isPlaying ? '⏹ Stop' : '▶ Play Loop'}
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={handleEditToggle}
                >
                    <Text style={styles.buttonText}>
                        {isEditing ? '💾 Save' : '✏️ Edit'}
                    </Text>
                </TouchableOpacity>
            </View>

            <CustomAlert
                visible={alertVisible}
                title="Recording Error"
                message="Failed to handle audio recording"
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
        padding: 20,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 24,
        color: '#BB86FC',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        color: '#FFFFFF',
        lineHeight: 28,
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#1E1E1E',
        color: '#FFFFFF',
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 6,
        padding: 12,
        marginBottom: 15,
    },
    textInput: {
        height: 200,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        backgroundColor: '#3700B3',
    },
    recordButton: {
        backgroundColor: '#3700B3',
    },
    stopButton: {
        backgroundColor: '#CF6679',
    },
    editButton: {
        backgroundColor: '#018786',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SlokaDetailScreen;