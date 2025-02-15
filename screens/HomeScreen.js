// import React, { useState, useCallback, useEffect } from 'react';
// import { View, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, Keyboard } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons'; // Import icons
// import SlokaCard from '../components/SlokaCard';
// import PlaylistModal from '../components/PlaylistModal';
// import CustomAlert from '../components/CustomAlert';

// const HomeScreen = ({ navigation }) => {
//   const [slokas, setSlokas] = useState([]);
//   const [showPlaylist, setShowPlaylist] = useState(false);
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredSlokas, setFilteredSlokas] = useState([]);
//   const [currentPlayingId, setCurrentPlayingId] = useState(null); // Track currently playing sloka

//   // Load slokas
//   useFocusEffect(
//     useCallback(() => {
//       const loadSlokas = async () => {
//         const savedSlokas = await AsyncStorage.getItem('slokas');
//         if (savedSlokas) {
//           const slokas = JSON.parse(savedSlokas);
//           setSlokas(slokas);
//           setFilteredSlokas(slokas); // Initialize filtered slokas
//         }
//       };
//       loadSlokas();
//     }, [])
//   );

//   // Toggle search bar in header
//   const toggleSearch = () => {
//     setIsSearchVisible(!isSearchVisible);
//     if (!isSearchVisible) {
//       setSearchQuery(''); // Reset search query when opening search
//       setFilteredSlokas(slokas); // Show all slokas when opening search
//     } else {
//       Keyboard.dismiss(); // Dismiss keyboard when closing search
//       setFilteredSlokas(slokas); // Show all slokas when closing search
//     }
//   };

//   // Update header options dynamically
//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <View style={styles.headerRight}>
//           {isSearchVisible ? (
//             <View style={styles.searchContainer}>
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search Slokas"
//                 placeholderTextColor="#888"
//                 value={searchQuery}
//                 onChangeText={(text) => {
//                   setSearchQuery(text);
//                   filterSlokas(text);
//                 }}
//                 autoFocus
//               />
//               <TouchableOpacity onPress={toggleSearch} style={styles.closeButton}>
//                 <Ionicons name="close" size={24} color="#FFFFFF" />
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity onPress={toggleSearch}>
//               <Ionicons name="search" size={24} color="#FFFFFF" />
//             </TouchableOpacity>
//           )}
//         </View>
//       ),
//     });
//   }, [navigation, isSearchVisible, searchQuery]);

//   // Filter slokas based on search query
//   const filterSlokas = (query) => {
//     if (query.trim() === '') {
//       setFilteredSlokas(slokas); // Show all slokas if query is empty
//     } else {
//       const filtered = slokas.filter((sloka) =>
//         sloka.title.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredSlokas(filtered);
//     }
//   };

//   // Handle playback state
//   const handlePlay = (id) => {
//     if (currentPlayingId === id) {
//       setCurrentPlayingId(null); // Stop playback if the same sloka is clicked
//     } else {
//       setCurrentPlayingId(id); // Start playback for the selected sloka
//     }
//   };

//   // Delete sloka
//   const deleteSloka = async (id) => {
//     const updatedSlokas = slokas.filter((sloka) => sloka.id !== id);
//     await AsyncStorage.setItem('slokas', JSON.stringify(updatedSlokas));
//     setSlokas(updatedSlokas);
//     setFilteredSlokas(updatedSlokas); // Update filtered slokas
//     setAlertVisible(false);
//   };

//   // Confirm deletion
//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setAlertVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={filteredSlokas}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => (
//           <SlokaCard
//             sloka={item}
//             serialNo={index + 1}
//             onDelete={() => confirmDelete(item.id)}
//             navigation={navigation}
//             currentPlayingId={currentPlayingId}
//             onPlay={handlePlay} // Pass playback handler
//           />
//         )}
//       />

//       <PlaylistModal
//         visible={showPlaylist}
//         slokas={slokas}
//         onClose={() => setShowPlaylist(false)}
//       />

//       <View style={styles.bottomButtons}>
//         <TouchableOpacity
//           style={[styles.button, styles.selectButton]}
//           onPress={() => setShowPlaylist(true)}
//         >
//           <Text style={styles.buttonText}>Select Slokas</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity
//           style={[styles.button, styles.addButton]}
//           onPress={() => navigation.navigate('AddSloka')}
//         >
//           <Text style={styles.buttonText}>Add Sloka</Text>
//         </TouchableOpacity>
//       </View>

//       <CustomAlert
//         visible={alertVisible}
//         title="Delete Sloka"
//         message="Are you sure you want to delete this sloka?"
//         buttons={[
//           {
//             text: 'Cancel',
//             style: 'cancel',
//             onPress: () => setAlertVisible(false),
//           },
//           {
//             text: 'Delete',
//             style: 'destructive',
//             onPress: () => deleteSloka(deleteId),
//           },
//         ]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     paddingHorizontal: 12,
//   },
//   bottomButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     gap: 8,
//   },
//   button: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButton: {
//     backgroundColor: '#BB86FC',
//   },
//   selectButton: {
//     backgroundColor: '#3700B3',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1E1E1E',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     width: 250, // Fixed width for search bar
//   },
//   searchInput: {
//     flex: 1,
//     color: '#FFFFFF',
//     fontSize: 16,
//     paddingVertical: 8,
//     minWidth: 200, // Ensure minimum width for stability
//   },
//   closeButton: {
//     marginLeft: 8,
//   },
// });

// export default HomeScreen;

import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, Keyboard } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import SlokaCard from '../components/SlokaCard';
import PlaylistModal from '../components/PlaylistModal';
import CustomAlert from '../components/CustomAlert';

const HomeScreen = ({ navigation }) => {
  const [slokas, setSlokas] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSlokas, setFilteredSlokas] = useState([]);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);

  // Load slokas
  useFocusEffect(
    useCallback(() => {
      const loadSlokas = async () => {
        const savedSlokas = await AsyncStorage.getItem('slokas');
        if (savedSlokas) {
          const parsedSlokas = JSON.parse(savedSlokas);
          setSlokas(parsedSlokas);
          setFilteredSlokas(parsedSlokas);
        }
      };
      loadSlokas();
    }, [])
  );

  // Memoized search toggle
  const toggleSearch = useCallback(() => {
    setIsSearchVisible(prev => {
      if (!prev) {
        setSearchQuery('');
        setFilteredSlokas(slokas);
      } else {
        Keyboard.dismiss();
        setFilteredSlokas(slokas);
      }
      return !prev;
    });
  }, [slokas]);

  // Memoized filtering function
  const filterSlokas = useCallback(
    query => {
      if (query.trim() === '') {
        setFilteredSlokas(slokas);
      } else {
        const filtered = slokas.filter(sloka =>
          sloka.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSlokas(filtered);
      }
    },
    [slokas]
  );

  // Memoized header component
  const headerRight = useCallback(
    () => (
      <View style={styles.headerRight}>
        {isSearchVisible ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Slokas"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text);
                filterSlokas(text);
              }}
              autoFocus
              autoCorrect={false}
            />
            <TouchableOpacity onPress={toggleSearch} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={toggleSearch}>
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    ),
    [isSearchVisible, searchQuery, filterSlokas, toggleSearch]
  );

  // Set header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, [navigation, headerRight]);

  // Playback control
  const handlePlay = useCallback(id => {
    setCurrentPlayingId(prevId => (prevId === id ? null : id));
  }, []);

  // Delete functionality
  const deleteSloka = useCallback(
    async id => {
      const updatedSlokas = slokas.filter(sloka => sloka.id !== id);
      await AsyncStorage.setItem('slokas', JSON.stringify(updatedSlokas));
      setSlokas(updatedSlokas);
      setFilteredSlokas(updatedSlokas);
      setAlertVisible(false);
    },
    [slokas]
  );

  const confirmDelete = useCallback(id => {
    setDeleteId(id);
    setAlertVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredSlokas}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <SlokaCard
            sloka={item}
            serialNo={index + 1}
            onDelete={() => confirmDelete(item.id)}
            navigation={navigation}
            currentPlayingId={currentPlayingId}
            onPlay={handlePlay}
          />
        )}
        keyboardDismissMode="on-drag"
      />

      <PlaylistModal
        visible={showPlaylist}
        slokas={slokas}
        onClose={() => setShowPlaylist(false)}
      />

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.button, styles.selectButton]}
          onPress={() => setShowPlaylist(true)}
        >
          <Text style={styles.buttonText}>Select Slokas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => navigation.navigate('AddSloka')}
        >
          <Text style={styles.buttonText}>Add Sloka</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={alertVisible}
        title="Delete Sloka"
        message="Are you sure you want to delete this sloka?"
        buttons={[
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setAlertVisible(false),
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => deleteSloka(deleteId),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 9,
    paddingTop: 5,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#BB86FC',
  },
  selectButton: {
    backgroundColor: '#3700B3',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 250,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 8,
    minWidth: 200,
  },
  closeButton: {
    marginLeft: 8,
  },
});

export default HomeScreen;

