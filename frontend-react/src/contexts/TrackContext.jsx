import { createContext, useContext, useState } from 'react';

const TrackContext = createContext();

export function TrackProvider({ children }) {
  const [currentDisorder, setCurrentDisorder] = useState(null);

  return (
    <TrackContext.Provider value={{ currentDisorder, setCurrentDisorder }}>
      {children}
    </TrackContext.Provider>
  );
}

export function useTrack() {
  const context = useContext(TrackContext);
  if (!context) throw new Error('useTrack must be used within TrackProvider');
  return context;
}
