// styles/GlobalStyles.js
import { StyleSheet } from 'react-native';

const GlobalStyles = {

    
  // -------------------------
  // NewEntryScreen / Shared
  // -------------------------
  base: StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 8,
    },
    titleInput: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      marginBottom: 10,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      minHeight: 100,
      textAlignVertical: 'top',
      fontSize: 16,
    },
    addButton: {
      backgroundColor: '#eee',
      height: 100,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
      padding: 14,
      borderRadius: 10,
      marginTop: 30,
      justifyContent: 'center',
    },
    saveButtonText: {
      color: 'white',
      fontSize: 18,
      marginLeft: 10,
    },
  }),

  // -------------------------
  // AudioSheet Component
  // -------------------------
  audioSheet: StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContentRow: {
      backgroundColor: '#fff',
      marginHorizontal: 40,
      paddingVertical: 20,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    modalOption: {
      alignItems: 'center',
      marginHorizontal: 10,
    },
    optionText: {
      marginTop: 4,
      fontSize: 14,
    },
    sheetOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheetContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      minHeight: '50%',
    },
    sheetTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    audioControls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    controlButton: {
      backgroundColor: '#2196F3',
      padding: 12,
      borderRadius: 8,
    },
    controlText: {
      color: 'white',
      fontSize: 16,
    },
  }),

  // -------------------------
  // UserScreen
  // -------------------------
  user: StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: '#fff',
      flex: 1,
      alignItems: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      backgroundColor: '#ccc',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 12,
    },
    text: {
      fontSize: 16,
      color: '#333',
    },
    logoutButton: {
      marginTop: 40,
      backgroundColor: '#e53935',
      padding: 12,
      borderRadius: 8,
      width: '80%',
      alignItems: 'center',
    },
    logoutText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  }),

  // -------------------------
  // LoginScreen
  // -------------------------
  login: StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 32,
      color: '#666',
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 16,
    },
    loginButton: {
      backgroundColor: '#4CAF50',
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
    },
    loginText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  }),

  // -------------------------
  // HomeScreen
  // -------------------------
  home: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    list: {
      padding: 16,
    },
    entryItem: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      elevation: 2,
    },
    entryDate: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    entryPreview: {
      fontSize: 16,
      color: '#333',
      marginTop: 4,
    },
    floatingButton: {
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
    },
  }),

  // -------------------------
  // EntryDetailsScreen
  // -------------------------
  entry: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    date: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    location: {
      marginTop: 4,
      fontSize: 14,
      color: '#666',
    },
    weather: {
      fontSize: 14,
      color: '#666',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 4,
    },
    content: {
      fontSize: 16,
      lineHeight: 22,
      color: '#333',
    },
    mediaBlock: {
      marginTop: 16,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      marginTop: 8,
    },
    audioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
    },
    audioButtonText: {
      color: 'white',
      marginLeft: 10,
      fontSize: 16,
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e53935',
      padding: 12,
      borderRadius: 8,
      marginTop: 32,
      justifyContent: 'center',
    },
    deleteButtonText: {
      color: 'white',
      marginLeft: 10,
      fontSize: 16,
    },
  }),
   // -------------------------
  // Modal Styles
  // -------------------------
  modalCenteredContainer: StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    contentBox: {
      backgroundColor: '#fff',
      width: '80%',
      padding: 20,
      borderRadius: 12,
      alignItems: 'center',
    },
    input: {
      width: '100%',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      fontSize: 16,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      flex: 1,
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    confirmButton: {
      backgroundColor: '#4CAF50',
      marginLeft: 10,
    },
    cancelButton: {
      backgroundColor: '#ccc',
      marginRight: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  }),

  mediaGrid: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 16,
    },
    thumbnail: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    addButton: {
      width: 100,
      height: 100,
      backgroundColor: '#eee',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
  },
  
};

export default GlobalStyles;
