MyJournal

Purpose: A multimedia journaling app built with React Native and Expo.
MyJournal lets users log daily thoughts alongside photos and voice recordings. 
Each journal entry saves location-based weather info and supports basic profile management.

Author: Jiayi Feng

APIs & Libraries Used: 
Expo APIs
- `expo-image-picker`: for selecting profile images and journal photos
- `expo-av`: to record and play back voice recordings
- `expo-location`: to fetch current location
- `expo-file-system`: to store photos and audio files locally
Firebase
- `firebase/auth`: for login/register/logout and user profile
- `firebase/database`: to save/load user journal entries (using Realtime Database)

---

Features
- Email + password registration/login
- Create daily entries with:
  - Title and body text
  - Location + weather
  - Up to 9 photos
  - One audio recording
- Local media file saving with persistent access
- Profile screen to view/edit name and profile picture
- Smooth navigation with header customization
- Realtime playback progress bar (non-slidable)

---

Known Risks / Challenges
- Limited audio support: only one recording per entry
- Android’s image-picker lacks multi-select support (handled manually)
- Time constraints limited features like cloud media sync, entry editing, and sorting

