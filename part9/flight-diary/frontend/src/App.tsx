import { useState, useEffect } from 'react';
import axios from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import DiaryEntry from './components/DiaryEntry';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const data = await getAllDiaries();
      setDiaries(data);
    } catch (error) {
      console.error('Error fetching diaries:', error);
      setNotification({ message: 'Failed to fetch diaries', type: 'error' });
    }
  };

  const handleSubmit = async (newEntry: NewDiaryEntry) => {
    try {
      await createDiary(newEntry);
      setNotification({ message: 'Diary entry added successfully!', type: 'success' });
      // Refresh the diary list
      await fetchDiaries();
    } catch (error) {
      let errorMessage = 'Failed to add diary entry';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data;
      }
      setNotification({ message: errorMessage, type: 'error' });
    }
  };

  const handleError = (message: string) => {
    setNotification({ message, type: 'error' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Flight Diary</h1>
      
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
        />
      )}

      <DiaryForm onSubmit={handleSubmit} onError={handleError} />

      <h2>Diary entries</h2>
      {diaries.map(entry => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default App; 