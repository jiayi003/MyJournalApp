// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, onValue } from 'firebase/database';

import { db, auth } from '../components/FirebaseConfig';
import GlobalStyles from '../styles/GlobalStyles';

export default function HomeScreen({ navigation }) {

  // state variables
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  //run once on mount
  useEffect(() => {

    // get current user
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    // set up reference to firebase db
    const userRef = ref(db, `users/${userId}/entries`);

    //Firebase's onValue() subscribes to changes at specific db location, returns a function 
    // that you can call to stop listening for those updates
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      // parse and sort data
      if (data) {
        const parsedEntries = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })).sort((a, b) => b.timestamp - a.timestamp);
        setEntries(parsedEntries);
      } else {
        setEntries([]); // no data is found, sets entries to an empty array
      }
      setLoading(false);
    });


    // cleanup
    return () => unsubscribe();
  }, []);


  // gets date
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });


/*    Render List Items     */
const renderItem = ({ item }) => {
    const dateObj = new Date(item.timestamp);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' }); 
  
    //date, title, preview
    return (
      <TouchableOpacity
        style={styles.entryItem}
        onPress={() => navigation.navigate('EntryDetails', { entry: item })}
      >
        <View style={styles.entryRow}>
          <View style={styles.dateIcon}>
            <Text style={styles.day}>{day}</Text>
            <Text style={styles.month}>{month}</Text>
          </View>
  
          <View style={{ flex: 1 }}>
            <Text style={styles.entryTitle}>{item.title}</Text>
            <Text style={styles.entryPreview} numberOfLines={2}>
              {item.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  

// render background container and add button
  return (
    <View style={styles.container} backgroundColor="#f5f5f5">
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('NewEntry', { today })}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

//extra styling

const styles = GlobalStyles.base;

styles.list = {
  padding: 16,
};

styles.entryItem = {
  backgroundColor: '#fff',
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  elevation: 2,
};

styles.entryTitle = {
  fontSize: 16,
  fontWeight: 'bold',
};

styles.entryPreview = {
  fontSize: 14,
  color: '#333',
  marginTop: 4,
};

styles.floatingButton = {
  position: 'absolute',
  right: 24,
  bottom: 24,
  backgroundColor: '#4CAF50',
  width: 56,
  height: 56,
  borderRadius: 28,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5,
};

styles.entryRow = {
    flexDirection: 'row',
    alignItems: 'center',
  };
  
  styles.dateIcon = {
    width: 48,
    height: 48,
    marginRight: 12,
    //backgroundColor: '#ededed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  styles.day = {
    fontSize: 16,
    fontWeight: 'bold',
  };
  
  styles.month = {
    fontSize: 12,
    color: '#555',
  };
  
