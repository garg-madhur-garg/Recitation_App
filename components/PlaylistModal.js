import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Audio } from 'expo-av';

const PlaylistModal = ({ visible, slokas, onClose }) => {
  const [selectedSlokas, setSelectedSlokas] = useState([]);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playOrder, setPlayOrder] = useState([]);


  // Reset selections when modal is closed
  useEffect(() => {
    if (!visible) {
      setSelectedSlokas([]);
      setPlayOrder([]);
    }
  }, [visible]);
  
  const toggleSelection = (id) => {
    if (!isPlaying) {
      setSelectedSlokas(prev => {
        const newSelection = prev.includes(id) 
          ? prev.filter(i => i !== id)
          : [...prev, id];
        
        // Create play order based on original sloka list order
        const orderedSelection = slokas
          .filter(s => newSelection.includes(s.id))
          .map(s => s.id);
        
        setPlayOrder(orderedSelection);
        return newSelection;
      });
    }
  };

  const playSelected = async () => {
    if (playOrder.length === 0 || isPlaying) return;
    
    setIsPlaying(true);
    let currentIndex = 0;
    
    const playNext = async () => {
      if (currentIndex >= playOrder.length) currentIndex = 0;
      
      const sloka = slokas.find(s => s.id === playOrder[currentIndex]);
      try {
        if (sound) await sound.unloadAsync();
        
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
        });
        
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: sloka.audioUri },
          { shouldPlay: true }
        );
        
        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.didJustFinish) {
            await newSound.unloadAsync();
            currentIndex++;
            playNext();
          }
        });
      } catch (err) {
        setIsPlaying(false);
      }
    };

    playNext();
  };

  const stopPlayback = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      setIsPlaying(false);
      setSelectedSlokas([]);
      setPlayOrder([]);
    } catch (err) {
      console.error('Stop playback error:', err);
    }
  };

  const handleClose = () => {
    stopPlayback();
    onClose();
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

return (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Slokas to Play</Text>
        
        <FlatList
          data={slokas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => toggleSelection(item.id)}
              disabled={isPlaying}
            >
              <View style={[
                styles.checkbox,
                selectedSlokas.includes(item.id) && styles.checked
              ]} />
              <Text style={styles.slokaTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={handleClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, isPlaying ? styles.stopButton : styles.playButton]}
            onPress={isPlaying ? stopPlayback : playSelected}
            disabled={playOrder.length === 0}
          >
            <Text style={styles.buttonText}>
              {isPlaying ? '⏹ Stop' : '▶ Play'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#BB86FC',
    borderRadius: 4,
    marginRight: 12,
  },
  checked: {
    backgroundColor: '#BB86FC',
  },
  slokaTitle: {
    color: 'white',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#3700B3',
  },
  stopButton: {
    backgroundColor: '#CF6679',
  },
  cancelButton: {
    backgroundColor: '#4A4A4A',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PlaylistModal;