import { NonSensitiveDiaryEntry } from '../types';

interface DiaryEntryProps {
  entry: NonSensitiveDiaryEntry;
}

const DiaryEntry = ({ entry }: DiaryEntryProps) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <h3>{entry.date}</h3>
      <p><strong>Weather:</strong> {entry.weather}</p>
      <p><strong>Visibility:</strong> {entry.visibility}</p>
    </div>
  );
};

export default DiaryEntry; 