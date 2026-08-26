import React, { createContext, useContext, useState, useCallback } from 'react';

const CelebrationContext = createContext({
  triggerCelebration: () => {},
  isCelebrating: false,
  celebrationId: 0,
});

export const CelebrationProvider = ({ children }) => {
  const [celebrationId, setCelebrationId] = useState(0);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const triggerCelebration = useCallback(() => {
    setCelebrationId((prev) => prev + 1);
    setIsCelebrating(true);

    // Auto reset celebrating state after 7 seconds
    setTimeout(() => {
      setIsCelebrating(false);
    }, 7000);
  }, []);

  return (
    <CelebrationContext.Provider value={{ triggerCelebration, isCelebrating, celebrationId }}>
      {children}
    </CelebrationContext.Provider>
  );
};

export const useCelebrationContext = () => useContext(CelebrationContext);
