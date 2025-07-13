import React from 'react';
import { useState } from 'react';
import { NewDiaryEntry, Weather, Visibility } from '../types';

interface DiaryFormProps {
  onSubmit: (entry: NewDiaryEntry) => void;
  onError: (message: string) => void;
}

const DiaryForm = ({ onSubmit, onError }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!date || !comment.trim()) {
      onError('Please fill in all fields');
      return;
    }

    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment: comment.trim()
    };

    onSubmit(newEntry);
    
    // Reset form
    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '5px' }}>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="date">Date: </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Weather: </label>
          <div>
            {Object.values(Weather).map(w => (
              <label key={w} style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  name="weather"
                  value={w}
                  checked={weather === w}
                  onChange={() => setWeather(w)}
                />
                {w}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Visibility: </label>
          <div>
            {Object.values(Visibility).map(v => (
              <label key={v} style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  name="visibility"
                  value={v}
                  checked={visibility === v}
                  onChange={() => setVisibility(v)}
                />
                {v}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="comment">Comment: </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={3}
            style={{ width: '100%' }}
          />
        </div>

        <button type="submit">Add entry</button>
      </form>
    </div>
  );
};

export default DiaryForm; 