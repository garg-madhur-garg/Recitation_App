import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const SlokaCard = ({ sloka, serialNo, onDelete, navigation, currentPlayingId, onPlay }) => {
  const [sound, setSound] = useState(null);
  const isPlaying = currentPlayingId === sloka.id;

  const playAudio = async () => {
    try {
      if (isPlaying) {
        await stopAudio();
        return;
      }

      // Stop any currently playing audio first
      if (currentPlayingId) {
        onPlay(null); // This will trigger stop on currently playing card
        await new Promise(resolve => setTimeout(resolve, 200)); // Small delay
      }

      onPlay(sloka.id);
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: sloka.audioUri },
        { shouldPlay: true, isLooping: true }
      );
      
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Playback failed', error);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    onPlay(null);
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (!isPlaying && sound) {
      stopAudio();
    }
  }, [isPlaying]);

  return (
    <View style={styles.card}>
      <Text style={styles.serialNo}>{serialNo}.</Text>
      
      <TouchableOpacity 
        style={styles.content}
        onPress={() => navigation.navigate('SlokaDetail', { sloka })}
      >
        <Text style={styles.title} numberOfLines={1}>{sloka.title}</Text>
      </TouchableOpacity>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, isPlaying ? styles.stopButton : styles.playButton]}
          onPress={playAudio}
        >
          <Text style={styles.buttonText}>
            {isPlaying ? '⏹' : '▶'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  serialNo: {
    color: '#BB86FC',
    fontSize: 18,
    width: 30,
  },
  content: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#3700B3',
  },
  stopButton: {
    backgroundColor: '#CF6679',
  },
  deleteButton: {
    backgroundColor: '#B00020',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SlokaCard;